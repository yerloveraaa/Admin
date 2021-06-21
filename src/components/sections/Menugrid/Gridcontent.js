import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeProduct, startDeleting } from "../../action/products";
import { useForm } from "../../hooks/useForm";
import Breadcrumb from "./Breadcrumb";

import ProductsGrids from "./ProductsGrids";

const Gridcontent = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  return (
    <div className="ms-content-wrapper">
      <div className="row">
    <div className="col-md-12">
        <Breadcrumb />
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
