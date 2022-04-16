import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import JWT from 'jsonwebtoken';

import Resolvers from './resolvers';
import Schema from './schema';
import authDirective from './auth';
const { JWT_SECRET } = process.env;

export default (utils) => {
    const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth');
    let executableSchema = makeExecutableSchema({
        typeDefs: [authDirectiveTypeDefs, Schema],
        resolvers: Resolvers.call(utils),
    });
    executableSchema = authDirectiveTransformer(executableSchema);

    const server = new ApolloServer({
        schema: executableSchema,
        resolvers: Resolvers.call(utils),
        context: async ({ req }) => {
            const authorization = req.headers.authorization;
            if (typeof authorization !== typeof undefined) {
                const search = "Bearer";
                const regEx = new RegExp(search, "ig");
                const token = authorization.replace(regEx, '').trim();

                return JWT.verify(token, JWT_SECRET, function(err, result) {
                    if (err) {
                        return req;
                    } else {
                        return utils.db.models.User.findByPk(result.id).then((user) => {
                            return Object.assign({}, req, { user });
                        });
                    }
                });
            } else {
                return req;
            }
        }
    });

    return server;
};
