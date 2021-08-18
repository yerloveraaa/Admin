import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { activeUser } from '../../action/users';
import { DetailsUses } from './DetailsUses';

const UsersList = () => {
    const history = useHistory()
    const { users } = useSelector(state => state.users)


    return (
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="ms-panel">
                                <div className="ms-panel-header">
                                    <h6>Customers</h6>
                                </div>
                                <div className="ms-panel-body">
                                    <div className="table-responsive">
                                        <table className="table  thead-primary">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name </th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Restaurant Name</th>
                                                    <th scope="col">Profile Picture</th>
                                                    <th scope="col">Joining Date</th>
                                                    <th scope="col">Location</th>
                                                    <th scope="col"> Edit / Delete</th>
                                                </tr>
                                            </thead>
                                           
                                            <tbody>
                                                {
                                                    users.map((user) => (
                                                        <DetailsUses key={user.id} {...user} />
                                                    ))
                                                }
                                          
                                          </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default UsersList;