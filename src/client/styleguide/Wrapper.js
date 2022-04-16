import React from 'react';
import { ApolloProvider } from '@apollo/client/react';

import client from '../apollo';

const Wrapper = ({ children }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider >
    );
}

export default Wrapper;
