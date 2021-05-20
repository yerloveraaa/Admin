
import { firebase } from "../firebase/firebaseConfig"
import { types } from "../types/types"

import Swal from 'sweetalert2';
import { finishLoading, startLoading } from "./ui";
import { useSelector } from "react-redux";





export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading())
        })
        .catch(e => {
        
            Swal.fire('Error', e.message, 'error');
            dispatch(finishLoading())
        })
   
    }
    
}


export const startRegisterEmailPassword = (email, password, name) => {
    return (distpach) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
           await user.updateProfile({ displayName: name})
           distpach(login(user.uid, user.displayName))
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
            console.log(e)
        })
    }

}

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }
}



export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const logout = () => ({
    type: types.logout
})