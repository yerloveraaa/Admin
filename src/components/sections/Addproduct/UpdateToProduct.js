import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";



import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";

import { useHistory } from "react-router-dom";
import { activeProduct, startDeleting, startRemoveImg,  startRemoveMultiple, startSaveProduct } from "../../action/products";

function UpdateToProduct() {

  let history = useHistory();

  const dispatch = useDispatch();
  const { active: Product } = useSelector((state) => state.products);


  const [productImage, setProductImage] = useState(Product.productImage);
  const [multipleImagen, setMultipleImagen] = useState(Product.multipleImagen);


  const [formValues, handleInputChange, reset] = useForm(Product);

  let {
    id,
    description,
    price,
    product,
    category,
  } = formValues;

  const activeId = useRef(Product.id);

  useEffect(() => {
    if (Product.id !== activeId.current) {
      reset(Product);
      activeId.current = Product.id;
    }
  }, [Product, productImage, reset]);


  useEffect(() => {
    dispatch(activeProduct(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);


  const handleUploadSuccess = async (filename) => {
    let downloadURL = await storage
    .ref("productos")
    .child(filename)
    .getDownloadURL();
    setProductImage(( multipleImagen) => [... multipleImagen, downloadURL]);

    // const url = await storage.ref("productos").child(nombre).getDownloadURL();
    // setProductImage(url);
  };

  const handleUploadSuccessMultiple = async (filename) => {
    let downloadURL = await storage
      .ref("productos")
      .child(filename)
      .getDownloadURL();
    setMultipleImagen(( multipleImagen) => [... multipleImagen, downloadURL]);
  };

  const handledSave = () => {
    const producto = {...Product, productImage,  multipleImagen}
    dispatch(startSaveProduct(producto));
    return history.push("/menu-grid");
  };


  const deleteImgFirebase = (index) => {
    let fileRef = storage.refFromURL(index);
    fileRef.delete().then(function () {
      console.log("File Deleted")
    }).catch(function (error) {
    });
    dispatch(startRemoveImg(productImage, index, Product ))
  };

  const deleteImgMultiple = (index) => {
    let fileRef = storage.refFromURL(index);
    fileRef.delete().then(function () {
      console.log("File Deleted")
    }).catch(function (error) {

    });
    dispatch(startRemoveMultiple(multipleImagen, index, Product))   
  };

  return (
    <div className="ms-content-wrapper">
      <div className="row">
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
                {productImage.length > 0 && (
                    <div className="d-block mb-4 h-100">
                      {productImage.map((downloadURL, index) => {
                        return (
                          <img
                            className="img-fluid img-thumbnail"
                            key={index}
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
                      {multipleImagen.map((downloadURL, index) => {
                        return (
                          <img
                            className="img-fluid img-thumbnail"
                            key={index}
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
