import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Quickbar from '../layouts/Quickbar';
import UpdateToProduct from '../sections/Addproduct/UpdateToProduct';
import Addproductcontent from '../sections/Addproduct/Addproductcontent';
import { useSelector } from 'react-redux';


function UpdateProduct()  {
  const {active} = useSelector(state => state.products)

        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                   {
                      ( active)
                        ? ( <UpdateToProduct />) :( <Addproductcontent/>)
                   }
                   {/* <UpdateToProduct /> */}
                   
                </main>
            </div>
        );
    }


export default UpdateProduct