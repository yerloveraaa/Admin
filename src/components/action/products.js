import { db } from "../firebase/firebaseConfig"
import { types } from "../types/types"

import { loadProducts, loadRestaurants } from '../helpers/loadProducts'

export const startNewProducts = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newProduct = {
            descriptio: "",
            multipleImagen: "",
            price: "",
            product: "",
            productImag: "",
            categor: "",
        }

        const doc = await db.collection(`${ uid }/journal/products`).add( newProduct );
        dispatch( activeProduct( doc.id, newProduct ) );
        dispatch( addNewProduct( doc.id, newProduct ) );
    }
}



export const addNewProduct = ( id, note ) => ({
    type: types.productAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingProducts = ( uid ) => {
    return async( dispatch ) => {
        const products = await  loadProducts( uid );
        dispatch( setProducts( products ) );
    }
}

export const setProducts = ( products ) => ({
    type: types.productsLoad,
    payload: products
});


export const startLoadingRestaurants = () => {
    return async( dispatch ) => {
        const restaurants = await  loadRestaurants();
        dispatch( setRestaurants( restaurants ) );
    }
}

export const setRestaurants = ( restaurants ) => ({
    type: types.restaurantLoad,
    payload: restaurants
});


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/products/${ id }`).delete();
        dispatch( deleteProducts(id) );
    }
}

export const startDeletingRestaurant = ( id ) => {
    return async( dispatch, getState ) => {
        await db.doc(`restaurants/${id}`).delete();
        dispatch( deleteRestaurants(id) );
    }
}



export const activeProduct = ( id, product ) => ({
    type: types.productActive,
    payload: {
        id,
        ...product
    }
});

export const activeRestaurant = ( id, restaurant ) => ({
    type: types.restaurantActive,
    payload: {
        id,
        ...restaurant
    }
});


export const startSaveProduct = (product) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        // if(!product.productImage){
        //     delete product.productImage
        // }if(!product.multipleImagen){
        //     delete product.multipleImagen;
        // }
        const productToFirestore = {...product}
        delete productToFirestore.id;

        await db.doc(`${ uid }/journal/products/${ product.id }`).update( productToFirestore );
        dispatch(refreshProduct(product.id, productToFirestore))
    }

}


export const startRemoveImg = (productImage, index, product) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        productImage.splice(index, 1)
        console.log(productImage)
        const productToFirestore = {...product}
        await db.doc(`${uid}/journal/products/${product.id}`).update(productToFirestore);
        dispatch(refreshProduct(product.id, productToFirestore))
    }

}

export const  startRemoveMultiple = (multipleImagen, index, product) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        multipleImagen.splice(index, 1)
        console.log(multipleImagen)
        const productToFirestore = {...product}
        await db.doc(`${ uid }/journal/products/${ product.id }`).update(productToFirestore);
        dispatch(refreshProduct(product.id, productToFirestore))
    }

}




export const refreshProduct= ( id, product ) => ({
    type: types.productsUpdated,
    payload: {
        id,
        product: {
            id,
            ...product
        }
    }
});




export const deleteProducts= (id) => ({
    type: types.productsDelete,
    payload: id
});

export const deleteRestaurants= (id) => ({
    type: types.restaurantDelete,
    payload: id
});
