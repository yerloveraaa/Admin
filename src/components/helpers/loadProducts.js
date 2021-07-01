import { db } from '../firebase/firebaseConfig';




export const loadProducts = async ( uid ) => {
    const productsSnap = await db.collection(`${ uid }/journal/products`).get();
    const products = [];
 productsSnap.forEach( snapChildren => {
        products.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    });
    return products;
}

export const loadRestaurants = async () => {
    const restaurantsSnap = await db.collection("restaurants").get();
    const restaurants = [];
    restaurantsSnap.forEach( snapChildren => {
        restaurants.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    });
    return restaurants;
}

