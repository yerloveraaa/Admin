import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Addproductcontent from '../sections/Addproduct/Addproductcontent'



class Addproduct extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Addproductcontent/>
                   
                </main>
            </div>
        );
    }
}

export default Addproduct;