import { db } from "../firebase/firebaseConfig"
import { types } from "../types/types"




export const startNewProduct = () => {
    return async (distpatch, getState) => {
        const {uid} = getState().auth
        const newProduct = {
            title: '',
            body: '',
            date: new Date().getDate()
        }
     const doc = await db.collection(`${uid}/journal/products`).add(newProduct)
     distpatch(activeProduct(doc.id, newProduct))
    }
   
}



export const activeProduct = ( id, product ) => ({
    type: types.productActive,
    payload: {
        id,
        ...product
    }
});