import { db } from '../firebase/firebaseConfig';




export const loadProducts = async ( uid ) => {

    const productsSnap = await db.collection(`${ uid }/journal/products`).get();
    const products = [];

 productsSnap.forEach( snapHijo => {
        products.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    
    return products;
}


