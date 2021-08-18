import React from "react";
import { useSelector, useDispatch } from "react-redux";


import ProductsGrids from "./ProductsGrids";

const Gridcontent = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  return (
    <div className="ms-content-wrapper">
      <div className="row">
    <div className="col-md-12">
       
    <div className="row">
     {products.map((product) => (
            <ProductsGrids  key={product.id} {...product} />
          ))}
  </div>
  </div>
  </div>
  </div>
       
     
  );
};

export default Gridcontent;
