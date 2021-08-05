import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { activeRestaurant, startDeletingRestaurant } from "../../action/restaurants";

export default function RestaurantGrids({
  id,
  description,
  photos,
  price,
  title,
  photo,
  filters,
  location,
  createdAt,
  authorName,  
  author

}) {


  const dispatch = useDispatch()
  let history = useHistory()
  const handledActiveRestaurant = () => {
    dispatch(activeRestaurant(id, {
      description, price, title, photos, photo,  filters, location,  createdAt, authorName,  author}))
    return history.push("/update-restaurant")
  }


  const handledDelete = () => {
    dispatch(startDeletingRestaurant(id))
  }



  return (

    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
      <div className="ms-card">
        <div className="ms-card-img">
          <img src={photo} alt="card_img" />
        </div>
        <div className="ms-card-body">
          <div className="new">
            <h6 className="mb-0">{title} </h6>
            <h6 className="ms-text-primary mb-0">RD$ {price}</h6>
          </div>
          <div className="new meta">
            <p>{description} </p>
          </div>

          <div className="new mb-0">
            <button
              type="button"
              className="btn grid-btn mt-0 btn-sm btn-primary"
              onClick={handledDelete}
            >
              Remove
            </button>
            <button
              type="button"
              className="btn grid-btn mt-0 btn-sm btn-secondary"
              onClick={handledActiveRestaurant}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
