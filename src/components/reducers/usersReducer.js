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
    users: [],
    active: null,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.usersActive:
            return {
                ...state,
                active: {
                    ...action.payload,
                },
            };

        case types.usersAddNew:
            return {
                ...state,
                users: [...action.payload, ...state.users],
            };

        case types.usersLoad:
            return {
                ...state,
                users: [...action.payload],
            };

        case types.usersUpdated:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload.user : user
                ),
            };



        case types.usersDelete:
            return {
                ...state,
                active: null,
                users: state.users.filter(
                    (user) => user.id !== action.payload
                ),
            };


        default:
            return state;
    }
};
