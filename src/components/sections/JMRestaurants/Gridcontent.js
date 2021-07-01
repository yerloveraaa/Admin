import React from "react";
import { useSelector } from "react-redux";

import Breadcrumb from "./Breadcrumb";
import RestaurantGrids from "./RestaurantGrids";

const Gridcontent = () => {
  const {restaurants} = useSelector((state) => state.products);
  if(restaurants === undefined){
    return <h1>hola mundo </h1>
  }
  return (
    <div className="ms-content-wrapper">
      <div className="row">
    <div className="col-md-12">
        <Breadcrumb />
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

export default Gridcontent;
