import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Breadcrumb from "./Breadcrumb";


import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";

import { useHistory } from "react-router-dom";
import { activeProduct, startRemoveImg, startSaveProduct } from "../../action/products";

function UpdateToProduct() {

  let history = useHistory();

  const dispatch = useDispatch();
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlimagen] = useState("");
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [allImages, setImages] = useState([]);

  const { uid } = useSelector((state) => state.auth);

  const { active: Product } = useSelector((state) => state.products);


  const [formValues, handleInputChange, reset] = useForm(Product);

  const {
    id,
    description,
    multipleImagen,
    price,
    product,
    productImage,
    category,
  } = formValues;

  const activeId = useRef(Product.id);

  useEffect(() => {
    if (Product.id !== activeId.current) {
      reset(Product);
      activeId.current = Product.id;
    }
  }, [Product, reset]);


  useEffect(() => {
    dispatch(activeProduct(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);


  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleUploadError = (error) => {
    guardarSubiendo(false);
    console.log(error);
  };

  const handleUploadSuccess = async (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    const url = await storage.ref("productos").child(nombre).getDownloadURL();
    guardarUrlimagen(url);
  };

  const handleUploadSuccessMultiple = async (filename) => {
    let downloadURL = await storage
      .ref("productos")
      .child(filename)
      .getDownloadURL();
    setDownloadURLs((downloadURLs) => [...downloadURLs, downloadURL]);
  };

  const handleProgress = (progreso) => {
    guardarProgreso(progreso);
  };


  const handledSave = () => {
    dispatch(startSaveProduct(Product));
    return history.push("/menu-grid");
  };




  const deleteImgFirebase = async () => {
    let fileUrl =  productImage;
    let fileRef = storage.refFromURL(fileUrl);
    fileRef.delete().then(function () {
      console.log("File Deleted")
    }).catch(function (error) {

    });
    dispatch(startRemoveImg(Product))
    return  history.push("/menu-grid");
  };

  return (
    <div className="ms-content-wrapper">
      <div className="row">
        <div className="col-md-12">
          <Breadcrumb />
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="ms-panel ms-panel-fh">
            <div className="ms-panel-header">
              <h6>Update Product </h6>
            </div>
            <div className="ms-panel-body">

              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="product">Product Name</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="product"
                      placeholder="Product Name"
                      value={product}
                      name="product"
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
                      name="price"
                      value={price}
                      onChange={handleInputChange}
                      placeholder="$10"
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
                      name="description"
                      value={description}
                      placeholder="Message"
                      onChange={handleInputChange}
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
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
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
                  {productImage && (
                    <img
                      className="img-fluid img-thumbnail"
                      src={productImage}
                      width="304"
                      height="236"
                    />

                  )}
                  <button
                    onClick={deleteImgFirebase}
                  >
                    Delete
                  </button>
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
                  {multipleImagen.length > 0 && (
                    <div className="d-block mb-4 h-100">
                      {multipleImagen.map((downloadURL, i) => {
                        console.log(downloadURL)
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
              </div>

              <button className="btn btn-block btn-info" onClick={handledSave}>
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateToProduct;
