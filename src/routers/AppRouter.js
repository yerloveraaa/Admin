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

import Defaultregister from '../components/pages/Defaultregister';






import  PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { login } from '../components/action/auth';
import Preloader from '../components/layouts/Preloader';
import { startLoadingProducts } from '../components/action/products';
import UpdateRestaurants from '../components/pages/UpdateRestaurants';
import { startLoadingRestaurants } from '../components/action/restaurants';
import User from '../components/pages/User';
import { startLondingUsers } from '../components/action/users';
import UpdateUsers from '../components/pages/UpdateUsers';
import UserList from '../components/pages/UserList';





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
                dispatch(  startLoadingRestaurants(user.uid) );
                dispatch(startLondingUsers(user.uid))


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
                path="/user" 
                component={User}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/users-update" 
                component={UpdateUsers}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/update-restaurant" 
                component={UpdateRestaurants}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/menu-list" 
                component={Menulist}
                isAuthenticated={ isLoggedIn }
                 />
                
                <PrivateRoute 
                path="/user-list" 
                component={UserList}
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