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
  active: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.productAddNew:
      return {
        ...state,
        products: [...action.payload, ...state.products],
      };

    case types.productsLoad:
      return {
        ...state,
        products: [...action.payload],
      };
    case types.productsUpdated:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload.product : product
        ),
      };
    case types.productsDelete:
      return {
        ...state,
        active: null,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
       products: [],
      };

    default:
      return state;
  }
};
