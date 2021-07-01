import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
 function Breadcrumb ()  {
     const dispatch = useDispatch()
            
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb pl-0">
                    <button type="button" className="btn btn-outline-dark"><Link to="/add-product"><i className="material-icons"></i>Add Products</Link></button>
                </ol>
            </nav>
        );
   
}

export default Breadcrumb;