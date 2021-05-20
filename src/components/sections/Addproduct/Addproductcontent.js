import { useFormik } from "formik";
import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import * as Yup from "yup";
import { db, storage } from "../../firebase/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";
import { useSelector } from "react-redux";

function Addproductcontent() {
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlimagen] = useState('');

  const { uid } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      product: "",
      price: "",
      category: "",
      currency: "",
      quantity: "",
      description: "",
      productImage: "",
    },
    validationSchema: Yup.object({
      product: Yup.string()
        .min(3, "Los Platillos deben tener al menos 3 caracteres")
        .required("El Nombre del platillo es obligatorio"),
      price: Yup.number()
        .min(1, "Debes agregar un número")
        .required("El Precio es obligatorio"),
      currency: Yup.string()
        .min(1, "Debes agregar una moneda")
        .required("La moneda  es obligatorio"),
      quantity: Yup.number()
        .min(1, "Debes agregar un número")
        .required("El Precio es obligatorio"),
      category: Yup.string().required("La categoría es obligatoria"),
      description: Yup.string()
        .min(10, "La descripción debe ser más larga")
        .required("La descripción es obligatoria"),
    }),
    onSubmit: (products) => {
      try {
        products.productImage = urlimagen;
        db.collection(`${uid}/journal/products`).add(products);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Todo sobre las imagenes
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

    // Almacenar la URL de destino
    const url = await storage.ref("productos").child(nombre).getDownloadURL();

    console.log(url);
    guardarUrlimagen(url);
  };
  const handleProgress = (progreso) => {
    guardarProgreso(progreso);

    console.log(progreso);
  };

  return (
    <div className="ms-content-wrapper">
      <div className="row">
        <div className="col-md-12">
          <Breadcrumb />
        </div>
        <div className="col-xl-8 col-md-12">
          <div className="ms-panel ms-panel-fh">
            <div className="ms-panel-header">
              <h6>Create New Product </h6>
            </div>
            <div className="ms-panel-body">
              <form
                className="needs-validation clearfix"
                noValidate
                onSubmit={formik.handleSubmit}
              >
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
                        value={formik.values.product}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    {formik.touched.product && formik.errors.product ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong> {formik.errors.product}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category">Select Catagory</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                    {formik.touched.category && formik.errors.category ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong> {formik.errors.category}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="currency">Currency</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="currency"
                        name="currency"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value>-- Seleccione --</option>
                        <option value="USD">USD</option>
                        <option value="Bitcoins">Bitcoins</option>
                        <option value="EURO">EURO</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a Currency
                      </div>
                    </div>
                    {formik.touched.currency && formik.errors.currency ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong> {formik.errors.currency}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        placeholder="01"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="invalid-feedback">Quantity</div>
                    </div>
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong> {formik.errors.quantity}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price">Price</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="$10"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        name="price"
                        onBlur={formik.handleBlur}
                      />
                      <div className="invalid-feedback">Price</div>
                    </div>
                    {formik.touched.price && formik.errors.price ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong> {formik.errors.price}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="description">Description</label>
                    <div className="input-group">
                      <textarea
                        rows={5}
                        id="description"
                        className="form-control"
                        placeholder="Message"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name="description"
                        onBlur={formik.handleBlur}
                      />
                      <div className="invalid-feedback">
                        Please provide a message.
                      </div>
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>Hubo un error:</strong>{" "}
                        {formik.errors.description}
                      </div>
                    ) : null}
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
                    {urlimagen && (
                      <div
                        className="alert alert-success alert-outline mb-3"
                        role="alert"
                      >
                        La imagen se subió correctamente
                      </div>
                    )}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="productImage">Photos</label>
                    <div className="custom-file">
                      <FileUploader
                        accept="image/*"
                        id="productImage"
                        name="image-uploader-multiple"
                        className="custom-file-input"
                        randomizeFilename
                        storageRef={storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                        multiple
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
                    {urlimagen && (
                      <div
                        className="alert alert-success alert-outline mb-3"
                        role="alert"
                      >
                        La imagen se subió correctamente
                      </div>
                    )}
                  </div>
                  <button className="btn btn-block btn-info" type="submit">
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
