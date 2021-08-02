


import React, { useState, useRef, useEffect } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'

import { useHistory } from "react-router-dom";
import { activeRestaurant, startLoadingRestaurants, startRemoveImg, startRemoveMultiple, startSaveRestaurant } from "../../action/restaurants";
import { useForm } from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import * as geofirex from 'geofirex';


import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'

import "./index.css"
import { helpOptions } from "../../helpers/helpOptions";
import { style } from "../../helpers/styles";
import { data } from "jquery";


function UpdateToRestaurants() {
    const dispatch = useDispatch();
    let history = useHistory();
    const geo = geofirex.init(firebase);

    const { uid, name } = useSelector((state) => state.auth);
    const { active: Restaurant } = useSelector(state => state.restaurants)

    const activeId = useRef(Restaurant.id)

    const [productImage, setProductImage] = useState(Restaurant.productImage);
    const [multipleImagen, setMultipleImagen] = useState(Restaurant.multipleImagen);
    const [filters, setfilters] = useState(Restaurant.filters);
    const [createdAtTime, setCreatedAt] = useState(Restaurant.createdAt);
    const date = createdAtTime.toDate().toLocaleString('en-US')
    const [createdAt, setStartDate] = useState();


    const [position, setPosition] = useState(Restaurant.position);
    const {_lat, _long} = position.geopoint;
    const [latitud, setLatitud] =  useState(_lat)
    const [longitud, setLongitud] =  useState(_long)

    


    const [formValues, handleInputChange, reset] = useForm(Restaurant);

    let {
        description,
        price,
        product,
    } = formValues;


    useEffect(() => {
        if (Restaurant.id !== activeId.current) {
            reset(Restaurant);
            activeId.current = Restaurant.id;
        }
    }, [Restaurant, productImage, reset]);


    useEffect(() => {
        dispatch(activeRestaurant(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDateChange = (date) => {

        setStartDate(date)
    }


    const handleChange = filters => {
        setfilters( filters );
      
    };
    const handleChangeGeolong = e => {
        console.log(e.target.value)
        setLongitud(e.target.value)
    
    }
    const handleChangeGeolat = e => {
        console.log(e.target.value)
        setLatitud(e.target.value)
    
    }

    const handleUploadSuccessMultiple = async (filename) => {
        let downloadURL = await storage
          .ref("productos")
          .child(filename)
          .getDownloadURL();
        setMultipleImagen(( multipleImagen) => [... multipleImagen, downloadURL]);
      };


    const handleUploadSuccess = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setProductImage((productImage) => [...productImage, downloadURL]);

    };
    const handledSave = () => {
        const restaurant = { ...Restaurant,productImage, multipleImagen, filters, position: geo.point(latitud, longitud)  }
        dispatch(startSaveRestaurant(restaurant))
        return history.push('/restaurant')
    };


    const deleteImgFirebase = (index) => {
        let fileRef = storage.refFromURL(index);
        fileRef.delete().then(function () {
          console.log("File Deleted")
        }).catch(function (error) {
        });
        dispatch(startRemoveImg(productImage, index, Restaurant ))
      };
    
      const deleteImgMultiple = (index) => {
        let fileRef = storage.refFromURL(index);
        fileRef.delete().then(function () {
          console.log("File Deleted")
        }).catch(function (error) {
    
        });
        dispatch(startRemoveMultiple(multipleImagen, index, Restaurant))   
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
                                                value={filters}
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
                                        {productImage?.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                {productImage?.map((downloadURL, i) => {
                                                    return (
                                                        <img
                                                            className="img-fluid img-thumbnail"
                                                            key={i}
                                                            src={downloadURL}
                                                            width="304"
                                                            height="236"
                                                            onClick={() => deleteImgFirebase(downloadURL)}
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
                                                            onClick={() => deleteImgMultiple(downloadURL)}

                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Date</label>
                                        <div className="input-group">
                                        <input
                                                type="text"
                                                className="form-control"
                                                id="Author"
                                                placeholder={name}
                                                value={date}
                                                name="Author"
                                                onChange={handleChange}
                                                disabled
                                                required

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
                                            onChange={handleChangeGeolong}
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
                                                onChange={ handleChangeGeolat}
                                                required

                                            />
                                            <div className="invalid-feedback">Latitud</div>
                                        </div>
                                    </div>



                                <button
                                    className="btn btn-block btn-info"
                                    onClick={handledSave}
                                >
                                    Update Restaurant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateToRestaurants;
