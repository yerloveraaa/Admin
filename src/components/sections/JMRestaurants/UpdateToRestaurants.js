


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

    const { uid } = useSelector((state) => state.auth);
    const { active: Restaurant } = useSelector(state => state.restaurants)

    const activeId = useRef(Restaurant.id)

    const [photo, setphoto] = useState(Restaurant.photo);
    const [photos, setphotos] = useState(Restaurant.photos);
    const [filters, setfilters] = useState(Restaurant.filters);
    const [createdAtTime, setCreatedAt] = useState(Restaurant.createdAt);
    // const date = createdAtTime.toDate().toLocaleString('en-US')
    // const [createdAt, setStartDate] = useState();


    const [location, setlocation] = useState(Restaurant.location);
    const {_lat, _long} = location.geopoint;
    const [latitud, setLatitud] =  useState(_lat)
    const [longitud, setLongitud] =  useState(_long)

    


    const [formValues, handleInputChange, reset] = useForm(Restaurant);

    let {
        description,
        price,
       title,
       authorName,  
       author
    } = formValues;


    useEffect(() => {
        if (Restaurant.id !== activeId.current) {
            reset(Restaurant);
            activeId.current = Restaurant.id;
        }
    }, [Restaurant, photo, reset]);


    useEffect(() => {
        dispatch(activeRestaurant(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDateChange = (date) => {

        // setStartDate(date)
    }


    const handleChange = filters => {
        setfilters( filters );
      
    };
    const handleChangeGeolong = e => {
        setLongitud(e.target.value)
    
    }
    const handleChangeGeolat = e => {
        setLatitud(e.target.value)
    
    }

    const handleUploadSuccessMultiple = async (filename) => {
        let downloadURL = await storage
          .ref("productos")
          .child(filename)
          .getDownloadURL();
        setphotos(( photos) => [... photos, downloadURL]);
      };


    const handleUploadSuccess = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setphoto(downloadURL );

    };
    const handledSave = () => {
        const restaurant = {...Restaurant, photo, photos, filters, location: geo.point(latitud, longitud)}
        dispatch(startSaveRestaurant(restaurant))
        return history.push('/restaurant')
    };


    const deleteImgFirebase = (photo) => {
        let fileRef = storage.refFromURL(photo);
        fileRef.delete().then(function () {
          setphoto('')
        }).catch(function (error) {
        });
        dispatch(startRemoveImg(photo,  Restaurant ))
      };
    
      const deleteImgMultiple = (index) => {
        let fileRef = storage.refFromURL(index);
        fileRef.delete().then(function () {
          console.log("File Deleted")
        }).catch(function (error) {
    
        });
        dispatch(startRemoveMultiple(photos, index, Restaurant))   
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
                                            id="title"
                                            placeholder="Restaurants title"
                                            name="title"
                                            value={title}
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
                                                className="w-100"        
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
                                        {/* {photo.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                {photo.map((downloadURL, i) => {
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
                                        )} */}

                                        {
                                            photo?.length > 0 && (
                                                <div className="d-block mb-4 h-100">
                                                <img
                                                className="img-fluid img-thumbnail"
                                                 src={photo}
                                                 width="304"
                                                 height="236"
                                                 onClick={() => deleteImgFirebase(photo)}
                                                />
                                                </div>
                                            )
                                        }
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
                                                multiple

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
                                                            onClick={() => deleteImgMultiple(downloadURL)}

                                                        />
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>


                                    {/* <div className="col-md-6 mb-3">

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
                                    </div> */}


                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="Author">Author</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Author"
                                                placeholder='Author'
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
