import { useFormik } from "formik";
import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import * as Yup from "yup";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase'

import { useHistory } from "react-router-dom";
import { startLoadingProducts, startSaveProduct } from "../../action/products";
import { useForm } from "../../hooks/useForm";




function Addproductcontent() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [photo, setphoto] = useState();
  const [photos, setphotos] = useState([]);

  const { uid } = useSelector((state) => state.auth);



  const [formValues, handleInputChange, reset] = useForm({
    category: "",
    name: "",
    price: "",
    product: "",
  });

  const { category, name, price, product, } = formValues;


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





  const handledSave = async (e) => {
    e.preventDefault();
    const data = { category, name, price, product, photo, photos };
    const doc = await db.collection('vendor_products').add(data);
    dispatch(startLoadingProducts(uid));
    return history.push("/menu-grid");
  };



  return (
    <div className="ms-content-wrapper">
      <div className="rowCenter">
        <div className="col-md-8">
          <div className="ms-panel ms-panel-fh">
            <div className="ms-panel-header">
              <h6>Create New Product </h6>
            </div>
            <div className="ms-panel-body">
              <form onSubmit={handledSave}>
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="product">Product Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="product"
                        placeholder="Product Name"
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
                      <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleInputChange}
                        required

                      >
                        <option value="">-- Seleccione --</option>
                        <option value="desayuno">Desayuno</option>
                        <option value="comida">Comida</option>
                        <option value="cena">Cena</option>
                        <option value="bebida">Bebidas</option>
                        <option value="postre">Postre</option>
                        <option value="ensalada">Ensalada</option>
                      </select>
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
                    <label htmlFor="name">Description</label>
                    <div className="input-group">
                      <textarea
                        rows={5}
                        id="name"
                        className="form-control"
                        placeholder="Message"
                        name="name"
                        onChange={handleInputChange}
                        value={name}
                        required

                      />
                      <div className="invalid-feedback">
                        Please provide a message.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
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
                        className="custom-file-label"
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
                        multiple

                      />
                      <label
                        className="custom-file-label"
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
                    Create Product
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

export default Addproductcontent;
