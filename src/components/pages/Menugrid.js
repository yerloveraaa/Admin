import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Gridcontent from '../sections/Menugrid/Gridcontent'


class Menugrid extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Gridcontent/>
                </main>
                
            </div>
        );
    }
}

export default Menugrid;