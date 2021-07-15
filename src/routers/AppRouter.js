import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


import {firebase} from '../components/firebase/firebaseConfig'

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';


import Defaultlogin from '../components/pages/Defaultlogin';
import UpdateProduct from '../components/pages/UpdateProduct';
import Addproduct from '../components/pages/Addproduct';
import AddRestaurants from '../components/pages/AddRestaurants';

import Menugrid from '../components/pages/Menugrid';
import JMRestaurants from '../components/pages/JMRestaurants';
import Menulist from '../components/pages/Menulist';
import Restaurantlist from '../components/pages/Restaurantlist';
import Defaultregister from '../components/pages/Defaultregister';






import  PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { login } from '../components/action/auth';
import Preloader from '../components/layouts/Preloader';
import { startLoadingProducts, startLoadingRestaurants } from '../components/action/products';






 const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);


    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true);

                dispatch(  startLoadingProducts( user.uid ) );
                dispatch(  startLoadingRestaurants() );


            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [  setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <Preloader />
        )
    }

      return(
        <Router>
            <Switch>

                <PublicRoute
                path="/login"
                component={Defaultlogin}
                isAuthenticated={ isLoggedIn }
                />


                <PrivateRoute
                path="/add-product" 
                component={Addproduct} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute
                path="/add-restaurants" 
                component={AddRestaurants} 
                isAuthenticated={ isLoggedIn }
                />

                 <PrivateRoute
                path="/update-product" 
                component={UpdateProduct} 
                isAuthenticated={ isLoggedIn }
                />
                
                <PrivateRoute 
                path="/restaurant" 
                component={JMRestaurants}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/menu-list" 
                component={Menulist}
                isAuthenticated={ isLoggedIn }
                 />
                
                <PrivateRoute 
                path="/restaurant-list" 
                component={Restaurantlist}
                isAuthenticated={ isLoggedIn } 
                />
          
               
                <PublicRoute 
                path="/register" 
                component={Defaultregister}
                isAuthenticated={ isLoggedIn }
                />
            

                <PrivateRoute
                    exact
                    isAuthenticated={ isLoggedIn }
                    path=""
                    component={ Menugrid}
                 />

                <Redirect to="/login" />
            </Switch>
        </Router>
      )
  }

  export default AppRouter