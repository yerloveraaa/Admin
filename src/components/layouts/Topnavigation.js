import React, {  useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import $ from 'jquery';
import { Dropdown, NavLink } from 'react-bootstrap';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import costiclogo from '../../assets/img/costic/costic-logo-84x41.png'
import { useDispatch, useSelector } from 'react-redux';
import { login, startLogout } from '../action/auth';

import {firebase} from '../firebase/firebaseConfig'
import Preloader from './Preloader';

const Topnavigation = () => {

    const dispatch = useDispatch();
 
    
  



    const addsidenavigation = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }

    const topbaropen = () => {
        $('#ms-nav-options').toggleClass('ms-slide-down');
    }


    const handleLogout = () => {
        dispatch(startLogout())
    }
   
 


    return (
        <nav className="navbar ms-navbar">
                    <div className="ms-aside-toggler ms-toggler pl-0" onClick={addsidenavigation}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>
                <div className="logo-sn logo-sm ms-d-block-sm">
                    <Link className="pl-0 ml-0 text-center navbar-brand mr-0" to="/"><img src={costiclogo} alt="logo" /> </Link>
                </div>
                <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">  
                    <li className="ms-nav-item ms-nav-user dropdown">
                        <Dropdown className="custom-dropdown">
                            <Dropdown.Toggle as={NavLink} id="userDropdown" className="p-0">
                                <img className="ms-user-img ms-img-round" src="assets/img/costic/customer-6.jpg" alt="people" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                                <div className="dropdown-menu-header">
                                    <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, Anny Farisha</span></h6>
                                </div>
                                <div className="dropdown-divider" />
                                <div className="ms-dropdown-list">
                                    <Link className="media fs-14 p-2" to="/user-profiles"> <span><i className="flaticon-user mr-2" /> Profile</span>
                                    </Link>
                                    <Link className="media fs-14 p-2" to="/email"> <span><i className="flaticon-mail mr-2" /> Inbox</span> <span className="badge badge-pill badge-info">3</span>
                                    </Link>
                                    <Link className="media fs-14 p-2" to="/user-profiles"> <span><i className="flaticon-gear mr-2" /> Account Settings</span>
                                    </Link>
                                </div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-menu-footer">
                                    <Link className="media fs-14 p-2" to="/lockscreen"> <span><i className="flaticon-security mr-2" /> Lock</span>
                                    </Link>
                                </div>
                                <div
                                 className="dropdown-menu-footer"
                                 onClick={handleLogout}
                                >
                                    <div
                                   
                                    className="media fs-14 p-2" 
                                   > <span><i className="flaticon-shut-down mr-2" /> 
                                    Logout</span>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler"  onClick={topbaropen}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>
            </nav >
    )
}

export default Topnavigation;