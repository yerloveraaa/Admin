import React from 'react'
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import UpdateToRestaurants from '../sections/JMRestaurants/UpdateToRestaurants';

function UpdateRestaurants() {

    return (
        <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
            <Sidenavigation />
            <main className="body-content">
                <Topnavigation />
               {/* {
                  ( active)
                    ? ( <UpdateToProduct />) :( <Addproductcontent/>)
               }
            */}
            <UpdateToRestaurants />
               
            </main>
        </div>
    );
}

export default UpdateRestaurants
