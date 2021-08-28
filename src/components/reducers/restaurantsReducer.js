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
  restaurants: [],
  active: null,
};

export const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

      case types.restaurantActive:
        return {
          ...state,
          active: {
            ...action.payload,
          },
        };

    case types.productAddNew:
      return {
        ...state,
        restaurants: [...action.payload, ...state.restaurants],
      };

    case types.restaurantsLoad:
      return {
        ...state,
        restaurants: [...action.payload],
      };

      case types.restaurantLoad:
        return {
          ...state,
         restaurants : [...action.payload],
        };

    case types.restaurantsUpdated:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload.restaurant : restaurant
        ),
      };



    case types.restaurantsDelete:
      return {
        ...state,
        active: null,
        restaurants: state.restaurants.filter(
          (product) => product.id !== action.payload
        ),
      };

      case types.restaurantDelete:
        return {
          ...state,
          active: null,
          restaurants: state.restaurants.filter(
            (restaurant) => restaurant.id !== action.payload
          ),
        };

    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
       restaurants: [],
      };

    default:
      return state;
  }
};
