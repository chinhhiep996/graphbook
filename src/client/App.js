import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withApollo } from '@apollo/client/react/hoc';
import 'cropperjs/dist/cropper.css';

import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';
import Loading from './components/loading';
import LoginRegisterForm from './components/loginregister';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import Error from './components/error';

import './components/fontawesome';
import '../../assets/css/style.css';

const App = ({ client }) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const { data, error, loading, refetch } = useCurrentUserQuery();

    const handleLogin = (status) => {
        refetch().then(() => {
            setLoggedIn(status);
        }).catch(() => {
            setLoggedIn(status);
        });
    }

    useEffect(() => {
        const unsubscribe = client.onClearStore(
            () => {
                if (loggedIn) {
                    setLoggedIn(false)
                }
            }
        );

        return () => {
            unsubscribe();
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <Helmet>
                <title>Graphbook - Feed</title>
                <meta name="description" content="Newsfeed of all your friends on Graphbook" />
            </Helmet>

            {loggedIn && (
                <div>
                    <Bar changeLoginState={handleLogin} />
                    <Feed />
                    <Chats />
                </div>
            )}
            {!loggedIn && <LoginRegisterForm changeLoginState={setLoggedIn} />}
            {!loggedIn && error && <Error><p>{error.message}</p></Error>}
        </div>
    );
}

export default withApollo(App);
