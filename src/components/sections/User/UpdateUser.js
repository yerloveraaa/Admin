import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import * as geofirex from "geofirex";

import "react-datepicker/dist/react-datepicker.css";

import "./index.css";
import { activeUser, startSaveUsers } from "../../action/users";

import Swal from "sweetalert2";
import { finishLoading } from "../../action/ui";
import { timestamp } from "rxjs/operators";





function UpdateUser() {
    let history = useHistory();
    const dispatch = useDispatch();
    const geo = geofirex.init(firebase);

    const [loading, setLoding] = useState(false);

    const { uid } = useSelector((state) => state.auth);

    const { active: Users } = useSelector((state) => state.users);
    const { restaurants } = useSelector((state) => state.restaurants)


    const [profilePictureURL, setProfilePictureURL] = useState(Users.profilePictureURL);




    const [formValues, handleInputChange, reset] = useForm(Users);

    let {
        firstName,
        lastName,
        id,
        email,
        role,
        vendorID,
        badgeCount,
        isOnline,
        createdAt,
        lastOnlineTimestamp,
        signUpLocation,
        userID

    } = formValues;



    const reviewTime = new Date(createdAt?.seconds * 1000);
    const DATE_OPTIONS = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };





  

    // console.log(
    //     firstName,
    //     lastName,
    //     id,
    //     email,
    //     role,
    //     vendorID,
    //     createdAt,
    //     badgeCount,
    //     isOnline,
    //     profilePictureURL,
    //     lastOnlineTimestamp,
    //     pushKitToken,
    //     pushToken,
    //     signUpLocation,
    //     userID
    // )

    const activeId = useRef(Users.id);

    useEffect(() => {
        if (Users.id !== activeId.current) {
            reset(Users);
            activeId.current = Users.id;
        }
    }, [Users, setProfilePictureURL, reset]);


    useEffect(() => {
        dispatch(activeUser(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);


    const handleUploadSuccess = async (filename) => {
        let downloadURL = await storage
            .ref("productos")
            .child(filename)
            .getDownloadURL();
        setProfilePictureURL(downloadURL);
    };





    const handledSave = (e) => {
        e.preventDefault();
        const users = { ...Users, role: "vendor", profilePictureURL }
        console.log(users)
        dispatch(startSaveUsers(users));
        return  history.push("/user-list")
    };





    return (
        <div className="ms-content-wrapper">
            <div className="rowCenter">
                <div className="col-md-8">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Update Customer </h6>
                        </div>
                        <div className="ms-panel-body">
                            <form onSubmit={handledSave}>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="product">First Name</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Marcos"
                                                name="firstName"
                                                value={firstName}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">First Name</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="product">Last Name</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Martinez santos"
                                                name="lastName"
                                                value={lastName}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">Last Name</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price">E-mail</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="marcos@gmail.com"
                                                name="email"
                                                value={email}
                                                disabled

                                            />
                                            <div className="invalid-feedback">Email</div>
                                        </div>
                                    </div>







                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="product">Date </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="date"
                                                name="Date"
                                                value={reviewTime.toLocaleDateString( DATE_OPTIONS)}
                                                onChange={handleInputChange}
                                                disabled

                                            />
                                            <div className="valid-feedback">Phone Number</div>
                                        </div>
                                    </div>


                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="validationCustom22">Restaurant Name</label>
                                        <div className="input-group">
                                            <select
                                                className="form-control"
                                                id="vendorID"
                                                value={vendorID}
                                                name="vendorID"
                                                onChange={handleInputChange}
                                                required>






                                                {
                                                    restaurants.map((restaurant) => (

                                                        <option

                                                            key={restaurant.id}
                                                            value={restaurant.id}
                                                        >{restaurant.title} </option>
                                                    ))
                                                }



                                            </select>
                                            <div className="invalid-feedback">
                                                Please select a Restaurant.
                                            </div>
                                        </div>
                                    </div>



                                    <div className="col-md-12 mb-3 ">
                                        <label htmlFor="photo">Profile Photo</label>
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
                                            <label className="JMcustom-file-label" htmlFor="photo">
                                                Upload Images...
                                            </label>
                                            <div className="invalid-feedback">
                                                Example invalid custom file feedback
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {profilePictureURL?.length > 0 && (
                                            <div className="d-block mb-4 h-100">
                                                <img
                                                    className="img-fluid img-thumbnail"
                                                    src={profilePictureURL}
                                                    width="304"
                                                    height="236"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    

                                    <button className="btn btn-block btn-info" type="submit">
                                        {loading ? (
                                            <a>
                                                <i
                                                    className="fa fa-refresh fa-spin"
                                                    style={{ marginRight: "5px" }}
                                                />{" "}
                                                Create New Customer
                                            </a>
                                        ) : (
                                            "Update Customer"
                                        )}
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

export default UpdateUser;
