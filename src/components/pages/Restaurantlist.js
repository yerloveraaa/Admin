import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Restaurentcontent from '../sections/Restaurant-list/Restaurantcontent'


class Restaurantlist extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Restaurentcontent/>
                </main>
              
            </div>
        );
    }
}

export default Restaurantlist;