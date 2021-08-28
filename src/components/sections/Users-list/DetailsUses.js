import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { activeUser, deletingUsers } from '../../action/users'

export const DetailsUses = ({ 
    firstName,
    lastName,
    id,
    email,
    role,
    vendorID,
    createdAt,
    badgeCount,
    isOnline,
    profilePictureURL,
    lastOnlineTimestamp,
    signUpLocation,
    userID
     }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleActiveUser = () => {
        dispatch(activeUser(id, {
            firstName,
            lastName,
            id,
            email,
            role,
            vendorID,
            createdAt,
            badgeCount,
            isOnline,
            profilePictureURL,
            lastOnlineTimestamp,
            signUpLocation,
            userID
        }))
        history.push('/users-update')
    }

    const deleteUser = () => {
        dispatch(deletingUsers(id))
    }

    return (
        <tr key={id}>
            <th scope="row">{firstName}</th>
            <td>{email}</td>
            <td>change form</td>

            <td className="ms-table-f-w"> <img src={profilePictureURL} />
            </td>

            <td>829-794-3562</td>
            {/* <td>{country}</td> */}
            <td>
                {/* <span><i className="fas fa-paper-plane text-secondary text-success" /></span> */}
                <span
                    onClick={handleActiveUser}
                >

                    <i className="fas fa-pencil-alt JMS-Text" /></span>
                <span
                    onClick={deleteUser}
                ><i className="far fa-trash-alt ms-text-danger" /></span>
            </td>
        </tr>
    )
}
