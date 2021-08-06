import React, { useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'
import { v4 as uuidv4 } from "uuid";


import { useHistory } from "react-router-dom";
import {  startLoadingRestaurants } from "../../action/restaurants";
import { useForm } from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import * as geofirex from 'geofirex';


import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'

import "./index.css"
import { style } from "../../helpers/styles";
import { helpOptions } from "../../helpers/helpOptions";






function AddRestaurant() {
    let history = useHistory();
    const dispatch = useDispatch();
    const geo = geofirex.init(firebase);



    const { uid: author, name: authorName } = useSelector((state) => state.auth);
    const [photo, setphoto] = useState();
    const [photos, setphotos] = useState([]);
    const [createdAt, setStartDate] = useState(new Date());
    const [filters, setfilters] = useState([])

    const [formValues, handleInputChange, reset] = useForm({
        category: "",
        description: "",
        price: "",
        title: "",
        address: "",
        lat: "",
        longitud: "",
        latitud: "",
        city: ""
    });

    const {  description, price, title, longitud, latitud, address} = formValues;

    const ref = firebase.firestore().collection("vendors");

 


    const handleUploadSuccess = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setphoto(downloadURL);

    };




    const handleUploadSuccessMultiple = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setphotos((photos) => [...photos, downloadURL]);
    };

    const handleDateChange = (date) => {
        setStartDate(date)
    }

    const handleChange = filters => {
        setfilters( filters );
      
    };



    const handleSaveToRestaurants = (vendor) => {
        ref
            .doc(vendor.id)
            .set(vendor)
            .catch((err) => {
              console.error(err);
            });
            dispatch(startLoadingRestaurants( author));
            return history.push("/restaurant");
              
          }




  
    return (
        <div className="ms-content-wrapper">
            <div className="rowCenter">
                <div className="col-md-8">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6 >Create New Restaurants </h6>
                        </div>
                        <div className="ms-panel-body">
                        
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="product">Restaurants Name</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                placeholder="Restaurants Name"
                                                name="title"
                                                value={title}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="product">Restaurants Address</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                placeholder="337 Essex St, Lawrence, MA 01840"
                                                name="address"
                                                value={address}
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
                                        <label htmlFor="photo">Cover Photo</label>
                                        <div className="custom-file">
                                            <FileUploader
                                                accept="image/*"
                                                id="photo"
                                                name="photo"
                                                className="custom-file-input"
                                                randomizeFilename
                                                storageRef={storage.ref("productos")}
                                                onUploadSuccess={handleUploadSuccess}
                                            />
                                            <label
                                                className="JMcustom-file-label"
                                                htmlFor="photo"
                                            >
                                                Upload Images...
                                            </label>
                                            <div className="invalid-feedback">
                                                Example invalid custom file feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {photo?.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                              
                                                        <img
                                                            className="img-fluid img-thumbnail"
                                                            src={photo}
                                                            width="304"
                                                            height="236"
                                                        />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="photos">Photos</label>
                                        <div className="custom-file">
                                            <FileUploader
                                                accept="image/*"
                                                id="photos"
                                                name="photos"
                                                randomizeFilename
                                                storageRef={storage.ref("productos")}
                                                onUploadSuccess={handleUploadSuccessMultiple}

                                            />
                                            <label
                                                className="JMcustom-file-label"
                                                htmlFor="photos"
                                            >
                                                Upload Images...
                                            </label>
                                            <div className="invalid-feedback">
                                                Example invalid custom file feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {photos.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                {photos.map((downloadURL, i) => {
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
                                                placeholder="Author Name"
                                                value={authorName}
                                                name="Author"
                                                onChange={handleChange}
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

                                   

                                    <button
                                        className="btn btn-block btn-info"
                                       onClick={() => handleSaveToRestaurants({ id: uuidv4(), address,authorName,  author,createdAt,description, price,title, photo,photos, filters, location: geo.point(latitud, longitud)  })}
                                    >
                                        Create Restaurant
                                    </button>
                                </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRestaurant;
