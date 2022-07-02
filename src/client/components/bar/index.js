import React from 'react';

import UserBar from './user';
import { UserConsumer } from '../context/user';
import SearchBar from './search';
import Logout from './logout';
import Home from './home';

const Bar = ({ changeLoginState }) => {
    return (
        <div className="topbar">
            <div className="inner">
                <SearchBar />
                <UserConsumer>
                    <UserBar />
                </UserConsumer>
            </div>
            <div className="buttons">
                <Home />
                <Logout changeLoginState={changeLoginState}/>
            </div>
        </div>
    );
}

export default Bar;
