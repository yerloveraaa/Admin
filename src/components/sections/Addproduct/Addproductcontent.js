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

  const [productImage, setProductImage] = useState([]);
  const [ multipleImagen,  setMultipleImagen] = useState([]);

  const { uid } = useSelector((state) => state.auth);

  

  const [formValues, handleInputChange, reset] = useForm({
    category: "",
    description: "",
    price: "",
    product: "",
  });

  const { category, description, price, product,  } = formValues;

 
  const handleUploadSuccess = async (filename) => {
    let downloadURL = await storage
    .ref("productos")
    .child(filename)
    .getDownloadURL();
    setProductImage(( multipleImagen) => [... multipleImagen, downloadURL]);

  };

  const handleUploadSuccessMultiple = async (filename) => {
    let downloadURL = await storage
      .ref("productos")
      .child(filename)
      .getDownloadURL();
     setMultipleImagen(( multipleImagen) => [... multipleImagen, downloadURL]);
  };



  function handleClick() {
    history.push("/menu-grid");
  }

  const handledSave = async (e) => {
    e.preventDefault();
    const data = { category, description, price, product,  productImage,  multipleImagen };
    const doc = await db.collection(`${uid}/journal/products`).add(data);
    dispatch(  startLoadingProducts( uid ) );
    return handleClick()
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
              <form  onSubmit={handledSave}>
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
                  <div className="col-md-12 mb-3">
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
                        className="custom-file-label"
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
                  { productImage.length > 0 && (
                      <div className="d-block mb-4 h-100">
                        { productImage.map((downloadURL, i) => {
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
                        multiple
                   
                      />
                      <label
                        className="custom-file-label"
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
                    { multipleImagen.length > 0 && (
                      <div className="d-block mb-4 h-100">
                        { multipleImagen.map((downloadURL, i) => {
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
