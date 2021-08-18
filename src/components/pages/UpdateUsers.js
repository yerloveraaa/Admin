import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';

import { useSelector } from 'react-redux';
import UpdateUser from '../sections/User/UpdateUser';


function UpdateUsers()  {
  const {active} = useSelector(state => state.products)

        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                 <UpdateUser />
                </main>
            </div>
        );
    }


export default UpdateUsers