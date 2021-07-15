import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Detailcontent from '../sections/Productsdetail/Detailcontent'


class Productdetail extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Detailcontent/>
                </main>
           
            </div>
        );
    }
}

export default Productdetail;