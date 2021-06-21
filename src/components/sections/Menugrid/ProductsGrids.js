import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { activeProduct, startDeleting } from "../../action/products";
import Breadcrumb from "./Breadcrumb";

export default function ProductsGrids({
  id,
  description,
  multipleImagen,
  price,
  product,
  productImage,
  category
}) {


   const dispatch = useDispatch()
   let history =  useHistory()
   const handledActiveProducts = () => {
       dispatch(activeProduct(id, {
           description, multipleImagen, price, product, productImage, category
       }))

       handleClick()
   }

   function handleClick() {
    history.push("/update-product");
  }


   const handledDelete = () => {
    dispatch(startDeleting(id))
}

    
  return (
    
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
    <div className="ms-card">
      <div className="ms-card-img">
        <img src={productImage} alt="card_img" />
      </div>
      <div className="ms-card-body">
        <div className="new">
          <h6 className="mb-0">{product} </h6>
          <h6 className="ms-text-primary mb-0">RD$ {price}</h6>
        </div>
        <div className="new meta">
          <p>{description} </p>
        </div>
        
        <div className="new mb-0">
          <button
            type="button"
            className="btn grid-btn mt-0 btn-sm btn-primary"
            onClick={ handledDelete}
          >
            Remove
          </button>
          <button
            type="button"
            className="btn grid-btn mt-0 btn-sm btn-secondary"
            onClick={handledActiveProducts}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
    </div>
   
  );
}
