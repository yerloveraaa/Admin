import React, { useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'

import { useHistory } from "react-router-dom";
import {  startLoadingRestaurants } from "../../action/restaurants";
import { useForm } from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import * as geofirex from 'geofirex';


import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import "./index.css"
import { style } from "../../helpers/styles";
import { helpOptions } from "../../helpers/helpOptions";


function AddRestaurant() {
    let history = useHistory();
    const dispatch = useDispatch();
    const geo = geofirex.init(firebase);


    const { uid, name } = useSelector((state) => state.auth);
    const [productImage, setProductImage] = useState([]);
    const [multipleImagen, setMultipleImagen] = useState([]);
    const [createdAt, setStartDate] = useState(new Date());
    const [filters, setfilters] = useState([])

    const [formValues, handleInputChange, reset] = useForm({
        category: "",
        description: "",
        price: "",
        product: "",
        lat: "",
        longitud: "",
        latitud: "",
        city: ""
    });

    const {  description, price, product, longitud, latitud} = formValues;


    const handleUploadSuccess = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setProductImage((productImage) => [...productImage, downloadURL]);

    };

    const handleUploadSuccessMultiple = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setMultipleImagen((multipleImagen) => [...multipleImagen, downloadURL]);
    };

    const handleDateChange = (date) => {
        setStartDate(date)
    }

    const handleChange = filters => {
        setfilters( filters );
      
    };
    // ${uid}/journal/restaurants
    const handledSave = async (e) => {
        e.preventDefault();
        const doc = await db.collection('vendors').add({ name,createdAt,description, price, product, productImage,multipleImagen, filters, position: geo.point(latitud, longitud)  });
        dispatch(startLoadingRestaurants(uid));
        return history.push("/restaurant");
    };


     

  
    return (
        <div className="ms-content-wrapper">
            <div className="rowCenter">
                <div className="col-md-8">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Create New Restaurants </h6>
                        </div>
                        <div className="ms-panel-body">
                            <form onSubmit={handledSave}>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="product">Restaurants Name</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="product"
                                                placeholder="Restaurants Name"
                                                name="product"
                                                value={product}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category">Select Catagory</label>
                                        <div className="input-group">
                                            <Select
                                                className="w-100 "                                                
                                                isMulti
                                                value={filters.value}
                                                options={helpOptions}
                                                onChange={handleChange}
                                                styles={style}
                                            />
                                            <div className="invalid-feedback">
                                                Please select a Catagory.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price">Price</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                placeholder="$10"
                                                name="price"
                                                value={price}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="invalid-feedback">Price</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="description">Description</label>
                                        <div className="input-group">
                                            <textarea
                                                rows={5}
                                                id="description"
                                                className="form-control"
                                                placeholder="Message"
                                                name="description"
                                                onChange={handleInputChange}
                                                value={description}
                                                required

                                            />
                                            <div className="invalid-feedback">
                                                Please provide a message.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3 ">
                                        <label htmlFor="productImage">Cover Photo</label>
                                        <div className="custom-file">
                                            <FileUploader
                                                accept="image/*"
                                                id="productImage"
                                                name="productImage"
                                                className="custom-file-input"
                                                randomizeFilename
                                                storageRef={storage.ref("productos")}
                                                onUploadSuccess={handleUploadSuccess}
                                            />
                                            <label
                                                className="JMcustom-file-label"
                                                htmlFor="productImage"
                                            >
                                                Upload Images...
                                            </label>
                                            <div className="invalid-feedback">
                                                Example invalid custom file feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {productImage.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                {productImage.map((downloadURL, i) => {
                                                    return (
                                                        <img
                                                            className="img-fluid img-thumbnail"
                                                            key={i}
                                                            src={downloadURL}
                                                            width="304"
                                                            height="236"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="multipleImagen">Photos</label>
                                        <div className="custom-file">
                                            <FileUploader
                                                accept="image/*"
                                                id="multipleImagen"
                                                name="multipleImagen"
                                                randomizeFilename
                                                storageRef={storage.ref("productos")}
                                                onUploadSuccess={handleUploadSuccessMultiple}

                                            />
                                            <label
                                                className="JMcustom-file-label"
                                                htmlFor="multipleImagen"
                                            >
                                                Upload Images...
                                            </label>
                                            <div className="invalid-feedback">
                                                Example invalid custom file feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {multipleImagen.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                {multipleImagen.map((downloadURL, i) => {
                                                    return (
                                                        <img
                                                            className="img-fluid img-thumbnail"
                                                            key={i}
                                                            src={downloadURL}
                                                            width="304"
                                                            height="236"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Date</label>
                                        <div className="input-group">
                                            <DatePicker
                                                type="text"
                                                selected={createdAt}
                                                onChange={handleDateChange}
                                                className="form-control "
                                                // showTimeSelect
                                                dateFormat="Pp"
                                            />
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="Author">Author</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Author"
                                                placeholder={name}
                                                value={name}
                                                name="Author"
                                                onChange={handleDateChange}
                                                disabled
                                                required

                                            />
                                            <div className="invalid-feedback">Author</div>
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="longitud">Longitud</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="longitud"
                                            placeholder=" -70.66733836883432"
                                            name="longitud"
                                            value={longitud}
                                            onChange={handleInputChange}
                                            required

                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="latitud">Latitud</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                placeholder="19.424041154954804,"
                                                name="latitud"
                                                value={latitud}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="invalid-feedback">Latitud</div>
                                        </div>
                                    </div>

                                    {/* <div className="col-md-6 mb-3">
                                        <label htmlFor="city">City</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                placeholder="$10"
                                                name="city"
                                                value={city}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="invalid-feedback">Price</div>
                                        </div>
                                    </div> */}

                                    <button
                                        className="btn btn-block btn-info"
                                        type="submit"
                                    >
                                        Create Restaurant
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRestaurant;
