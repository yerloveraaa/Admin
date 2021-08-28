import React, { useState, useEffect } from "react";
import { db, storage, message } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';


import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import DatePicker from "react-datepicker";
import * as geofirex from 'geofirex';


import "react-datepicker/dist/react-datepicker.css";


import "./index.css"
import { loadUsers } from "../../helpers/loadProducts";
import { startLondingUsers } from "../../action/users";

import Swal from 'sweetalert2';
import { finishLoading } from "../../action/ui";




function AddUser() {
    let history = useHistory();
    const dispatch = useDispatch();
    const geo = geofirex.init(firebase);

    const [loading, setLoding] = useState(false);




    const { uid } = useSelector((state) => state.auth);



    const [photo, setphoto] = useState();
    const [photos, setphotos] = useState([]);
    const [createdAt, setStartDate] = useState(new Date());
    const [filters, setfilters] = useState([])

    const [formValues, handleInputChange, reset] = useForm({

        description: "",
        firstName: "",
        lastName: '',
        email: "",
        country: "",
        phone: "",
        password: "",
        confirmPassword: "",

    });

    const { description, firstName, lastName, email, country, phone, password, confirmPassword } = formValues;

    const ref = firebase.firestore().collection("Users");

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
        setfilters(filters);

    };

    const handledSave = async (e) => {
        e.preventDefault();
        const newData = { firstName, lastName, email, password, confirmPassword,  role: 'vendor', vendorID: 'add restaurant id', id: uuidv4() }


        setLoding(true)
        axios
            .post('/signup', newData)
            .then((response) => {
                setLoding(false)
                console.log(response)
                if (response.data.token) {
                    dispatch(finishLoading())
                    dispatch(startLondingUsers(uid))
                    return history.push("/user-list")
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.email)
                    setLoding(false)
                    Swal.fire('Error', err.response.data.email, 'error');
                    dispatch(finishLoading())
                }
            })

    };


    return (
        <div className="ms-content-wrapper">
            <div className="rowCenter">
                <div className="col-md-8">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Create New Customer </h6>
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
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="invalid-feedback">Email</div>
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Phone Number </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="1829-794-3562"
                                                name="phone"
                                                value={phone}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">Phone Number</div>
                                        </div>
                                    </div>



                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Password</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="password"
                                                placeholder="1829-794-3562"
                                                name="password"
                                                value={password}
                                                onChange={handleInputChange}
                                                required

                                            />

                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Confirm Password </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="confirmPassword"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={handleInputChange}
                                                required

                                            />
                                            <div className="valid-feedback">Confirm Password</div>
                                        </div>
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
                                            <div className="valid-feedback">Date </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label htmlFor="product">Country</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                placeholder="Panama"
                                                name="country"
                                                value={country}
                                                onChange={handleInputChange}
                                                required

                                            />

                                            <div className="valid-feedback">Country</div>
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
                                        <label htmlFor="photos">Dating Photos</label>
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


                                  


                                    <button
                                        className="btn btn-block btn-info"
                                        type="submit"
                                    >

                                        {
                                            loading ?
                                                <a><i className="fa fa-refresh fa-spin"
                                                    style={{ marginRight: "5px" }}
                                                /> Create New Customer</a> : "Create Customer"
                                        }
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

export default AddUser;
