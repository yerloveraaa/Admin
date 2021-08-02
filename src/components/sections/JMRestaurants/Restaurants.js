import React from "react";
import { useSelector } from "react-redux";

import RestaurantGrids from "./RestaurantGrids";
import Preloader from '../../layouts/Preloader'

const Restaurants = () => {
  const {restaurants} = useSelector((state) => state.restaurants);
  if(restaurants === undefined){
    return  <Preloader/>
  }
  return (
    <div className="ms-content-wrapper">
      <div className="row">
    <div className="col-md-12">
    <div className="row">
     {restaurants.map((restaurant) => (
            <RestaurantGrids  key={restaurant.id} {...restaurant} />
          ))}
  </div>
  </div>
  </div>
  </div>
       
     
  );
};

export default Restaurants;
