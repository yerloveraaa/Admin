import { db } from "../firebase/firebaseConfig"
import { types } from "../types/types"

import {  loadRestaurants } from '../helpers/loadProducts';



export const startLoadingRestaurants = (uid) => {
    return async( dispatch ) => {
        const restaurants = await  loadRestaurants(uid);
        dispatch( setRestaurants( restaurants ) );
    }
}

export const setRestaurants = ( restaurants ) => ({
    type: types.restaurantLoad,
    payload: restaurants
});



export const startDeletingRestaurant = ( id ) => {
    return async( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/restaurants/${ id }`).delete();
        dispatch( deleteRestaurants(id) );
    }
}





export const deleteRestaurants= (id) => ({
    type: types.restaurantDelete,
    payload: id
});



export const activeRestaurant = ( id, restaurant ) => ({
    type: types.restaurantActive,
    payload: {
        id,
        ...restaurant
    }
});


export const startSaveRestaurant = (restaurant) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        if(!restaurant.productImage){
            delete restaurant.productImage
        }if(!restaurant.multipleImagen){
            delete restaurant.multipleImagen;
        }


        const restaurantToFirestore = {...restaurant}
        delete restaurantToFirestore.id;

        await db.doc(`${uid}/journal/restaurants/${restaurant.id}`).update(restaurantToFirestore);
        dispatch( refreshRestaurant(restaurant.id, restaurantToFirestore ))
    }

}








export const startRemoveImg = (productImage, index, restaurant) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        productImage.splice(index, 1)
        console.log(productImage)
        const restaurantToFirestore = {...restaurant}
        await db.doc(`${uid}/journal/restaurants/${restaurant.id}`).update(restaurantToFirestore);
        dispatch(refreshRestaurant(restaurant.id, restaurantToFirestore))
    }

}

export const  startRemoveMultiple = (multipleImagen, index, restaurant) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        multipleImagen.splice(index, 1)
        console.log(multipleImagen)
        const restaurantToFirestore = {...restaurant}
        await db.doc(`${ uid }/journal/restaurants/${ restaurant.id }`).update(restaurantToFirestore);
        dispatch(refreshRestaurant(restaurant.id,restaurantToFirestore))
    }

}



export const refreshRestaurant = ( id, restaurant ) => ({
    type: types.restaurantsUpdated,
    payload: {
        id,
        restaurant: {
            id,
            ...restaurant
        }
    }
});