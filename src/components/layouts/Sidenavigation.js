import React from 'react';
import { Link } from 'react-router-dom'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import logo from '../../assets/img/costic/costic-logo-216x62.png';

const  Sidenavigation = () => {
    return(
        <div>
            
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        <li className="menu-item">
                            <h4 className="text-center"> Admin Dashboard </h4>
                            <ul id="product" className="" aria-labelledby="product" data-parent="#side-nav-accordion">
                            <li><Link to="/restaurant" >Restaurants</Link></li>
                            <li><Link to="/menu-grid" >Products</Link></li>
                            <li><Link to="/user-list" > User</Link></li >    

                            <li><Link to="/add-product" >Add Products</Link></li >
                            <li><Link to="/add-restaurants" >Add Restaurants</Link></li >
                            <li><Link to="/user" >Add User</Link></li >    
                            </ul >
                        </li >
                        
                    </ul >
                </Scrollbar >
            </div>
           
    )
    
}

export default Sidenavigation;