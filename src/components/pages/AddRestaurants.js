import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Quickbar from '../layouts/Quickbar';
import AddRestaurant from '../sections/Restaurant/AddRestaurant';
import { useSelector } from 'react-redux';


function AddRestaurants()  {
  const {active} = useSelector(state => state.products)

        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                  <AddRestaurant />
                </main>
            </div>
        );
    }


export default AddRestaurants