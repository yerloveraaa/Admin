import { db } from "../firebase/firebaseConfig"
import { loadUsers } from "../helpers/loadProducts"
import { types } from "../types/types"




export const startLondingUsers = (uid) => {
    return async (dispatch) => {
        const users = await loadUsers(uid)
        dispatch(setUsers(users))
    }
}

export const setUsers = ( users ) => ({
    type: types.usersLoad,
    payload: users
});

export const activeUser = ( id, user ) => ({
    type: types.usersActive,
    payload: {
        id,
        ...user
    }
});





export const deleteUsers= (id) => ({
    type: types.usersDelete,
    payload: id
})

export const deletingUsers = ( id ) => {
    return async( dispatch) => {
        await db.doc(`users/${ id }`).delete();
        dispatch( deleteUsers(id) );
    }
}



export const startSaveUsers = (user) => {
    return async (dispatch) => {

        if(!user.productImage){
            delete user.productImage
        }if(!user.multipleImagen){
            delete user.multipleImagen
        }if(!user.name){
            delete user.name
        }

        const userToFirestore = {...user}
        delete userToFirestore.id;

        await db.doc(`users/${user.id}`).update(userToFirestore);
        dispatch( refreshUser(user.id, userToFirestore))
    }

}


export const refreshUser = ( id, user) => ({
    type: types.usersUpdated,
    payload: {
        id,
        user: {
            id,
            ...user
        }
    }
});