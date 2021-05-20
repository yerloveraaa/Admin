/*
    {
        notes: [],
        active: null,
        active: {
            id: 'KASKLDJALKSDJ129387123',
            title: '',
            body: '',
            imageUrl: '',
            date: 12387612387126
        }
    }
*/

import { types } from "../types/types";



const initialState = {
    products: [],
    active:  null
}


export const productReducer = (state=initialState, action) => {
    switch (action.type) {
      
        case types.productActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.productAddNew:
            return{
                ...state,
                products: [...action.payload, ...state.products]
            }            
           
    
        default:
            return state
    }

}