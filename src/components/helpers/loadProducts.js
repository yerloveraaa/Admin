import { db } from '../firebase/firebaseConfig';




export const loadProducts = async ( uid ) => {
    const productsSnap = await db.collection("vendor_products").get();
    const products = [];
 productsSnap.forEach( snapChildren => {
        products.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    });
    return products;
}

export const loadRestaurants = async (uid) => {
    const restaurantsSnap = await db.collection("vendors").get();
    const restaurants = [];
    restaurantsSnap.forEach( snapChildren => {
        restaurants.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    });
    return restaurants;
}


export const loadUsers = async () => {
    const userSnap  =  await db.collection('users').get()
    const users = [];
    userSnap.forEach(snapChildren => {
        users.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    })

    return users;

}



