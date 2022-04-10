import React from 'react';

import UserBar from './user';
import { UserConsumer } from '../context/user';
import SearchBar from './search';

const Bar = () => {
    return (
        <div className="topbar">
            <div className="inner">
                <SearchBar />
                <UserConsumer>
                    <UserBar />
                </UserConsumer>
            </div>
        </div>
    );
}

export default Bar;
