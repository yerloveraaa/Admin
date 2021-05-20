import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Swal from 'sweetalert2';



import { startRegisterEmailPassword } from '../../action/auth';
import { removeError, setError } from '../../action/ui';
import { useForm } from '../../hooks/useForm';

export default function Content() {

    const dispatch = useDispatch()

    const [formValues, handledInputChange] = useForm({
        name: 'Juan Martinez',
        lastName: 'Sanchez',
        email: 'juan@gmail.com',
        password: '123456',
        password2: '123456'

    })

        const {
        name,
        lastName,
        email,
        password,
        password2
        } = formValues;


        const handledRegister = (e) => {
            e.preventDefault();
            if( isFormValid()){
           dispatch( startRegisterEmailPassword(email, password, name))
            }
        }

        const isFormValid = () => {
        
            if ( name.trim().length === 0 ) {
                dispatch( setError('Name is required') )
                Swal.fire('Error', 'Name is required', 'error');
                return false;
            } else if ( !validator.isEmail( email ) ) {
                dispatch( setError('Email is not valid') )
                Swal.fire('Error', 'Email is not valid', 'error');
                return false;
            } else if ( password !== password2 || password.length < 5 ) {
                dispatch( setError('Password should be at least 6 characters and match each other') )
                Swal.fire('Error', 'Password should be at least 6 characters and match each other', 'error');
                return false
            }
            
            dispatch( removeError() );
           return true;
        }


    return (
        <div className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
                <div className="ms-auth-col">
                    <div className="ms-auth-bg" />
                </div>
                <div className="ms-auth-col">
                    <div className="ms-auth-form">
                        <form className="needs-validation" 
                        onSubmit={handledRegister}
                        >
                            <h3>Create Account</h3>
                            <p>Please enter personal information to continue</p>
                            <div className="form-row">
                                <div className="col-md-6 ">
                                    <label htmlFor="validationCustom01">First name</label>
                                    <div className="input-group">
                                        <input type="text" 
                                        className="form-control" 
                                        // id="validationCustom01" 
                                        placeholder="First name" 
                                        name="name"
                                        value={name}
                                        onChange={handledInputChange}
                                        // required 
                                        />
                                        <div className="valid-feedback"> Looks good! </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="validationCustom02">Last name</label>
                                    <div className="input-group">
                                        <input type="text" 
                                        className="form-control"
                                        // id="validationCustom02" 
                                        placeholder="Last name" 
                                        name="lastName"
                                        value={lastName}
                                        onChange={handledInputChange}
                                        // required 
                                        />
                                        <div className="valid-feedback"> Looks good! </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label htmlFor="validationCustom03">Email Address</label>
                                    <div className="input-group">
                                        <input type="email" 
                                        className="form-control" 
                                        // id="validationCustom03" 
                                        placeholder="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={handledInputChange}
                                        // required 
                                        />
                                        <div className="invalid-feedback"> Please provide a valid email. </div>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <label htmlFor="validationCustom04">Password</label>
                                    <div className="input-group">
                                        <input type="password" 
                                        className="form-control" 
                                        // id="validationCustom04" 
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handledInputChange}
                                        // required
                                         />
                                        <div className="invalid-feedback"> Please provide a password.</div>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <label htmlFor="validationCustom04">Password</label>
                                    <div className="input-group">
                                        <input type="password" 
                                        className="form-control" 
                                        // id="validationCustom04" 
                                        placeholder="Password"
                                        name="password2"
                                        value={password2}
                                        onChange={handledInputChange}
                                        // required 
                                        />
                                        <div className="invalid-feedback"> Please provide a password.</div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <div className="form-check pl-0">
                                    <label className="ms-checkbox-wrap">
                                        <input className="form-check-input" type="checkbox" id="invalidCheck" required />
                                        <i className="ms-checkbox-check" />
                                    </label>
                                    <span> Agree to terms and conditions </span>
                                </div>
                            </div> */}
                            <button className="btn btn-primary mt-4 d-block w-100" type="submit">Create Account</button>
                            <p className="mb-0 mt-3 text-center">Already have an account? <Link className="btn-link" to="/default-login">Login</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
