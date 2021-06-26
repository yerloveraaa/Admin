import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


import {firebase} from '../components/firebase/firebaseConfig'

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';


import Defaultlogin from '../components/pages/Defaultlogin';
import Dashboard from '../components/pages/Dashboard';
import UpdateProduct from '../components/pages/UpdateProduct';
import Accordions from '../components/pages/Accordions';
import Addproduct from '../components/pages/Addproduct';
import AddRestaurants from '../components/pages/AddRestaurants';
import Alerts from '../components/pages/Alerts';
import Animations from '../components/pages/Animations';
import Badges from '../components/pages/Badges';
import Basictables from '../components/pages/Basictables';
import Breadcrumbs from '../components/pages/Breadcrumbs';
import Buttons from '../components/pages/Buttons';
import Cards from '../components/pages/Cards';
import Chartjs from '../components/pages/Chartjs';
import Chat from '../components/pages/Chat';
import Cropper from '../components/pages/Cropper';
import Customerlist from '../components/pages/Customerlist';
import Customerreview from '../components/pages/Customerreview';
import Datatables from '../components/pages/Datatables';
import Draggables from '../components/pages/Draggables';
import Email from '../components/pages/Email';
import Flaticons from '../components/pages/Flaticons';
import Fontawesome from '../components/pages/Fontawesome';
import Formelements from '../components/pages/Formelements';
import Formlayouts from '../components/pages/Formlayouts';
import Formvalidation from '../components/pages/Formvalidation';
import Formwizard from '../components/pages/Formwizard';
import Googlemaps from '../components/pages/Googlemaps';
import Invoicedetail from '../components/pages/Invoicedetail';
import Invoicelist from '../components/pages/Invoicelist';
import Materialize from '../components/pages/Materialize';
import Menucatalogue from '../components/pages/Menucatalogue';
import Menugrid from '../components/pages/Menugrid';
import Menulist from '../components/pages/Menulist';
import Modals from '../components/pages/Modals';
import Googlechart from '../components/pages/Googlechart';
import Orders from '../components/pages/Orders';
import Pagination from '../components/pages/Pagination';
import Preloaders from '../components/pages/Preloaders';
import Productdetail from '../components/pages/Productdetail';
import Progressbars from '../components/pages/Progressbars';
import Rangeslider from '../components/pages/Rangeslider';
import Rating from '../components/pages/Rating';
import Restaurantlist from '../components/pages/Restaurantlist';
import Sales from '../components/pages/Sales';
import Sliders from '../components/pages/Sliders';
import Socialactivity from '../components/pages/Socialactivity';
import Sweetalerts from '../components/pages/Sweetalerts';
import Tabs from '../components/pages/Tabs';
import Toast from '../components/pages/Toast';
import Todolist from '../components/pages/Todolist';
import Tour from '../components/pages/Tour';
import Typography from '../components/pages/Typography';
import Vectormaps from '../components/pages/Vectormaps';
import Widgets from '../components/pages/Widgets';
import Clientmanagement from '../components/pages/Clientmanagement';
import Comingsoon from '../components/pages/Comingsoon';
import Defaultregister from '../components/pages/Defaultregister';
import Error from '../components/pages/Error';
import Faq from '../components/pages/Faq';
import Invoice from '../components/pages/Invoice';
import Lockscreen from '../components/pages/Lockscreen';
import Modallogin from '../components/pages/Modallogin';
import Modalregister from '../components/pages/Modalregister';
import Portfolio from '../components/pages/Portfolio';
import Stockmanagement from '../components/pages/Stockmanagement';
import Userprofile from '../components/pages/Userprofile';
import Webanalytics from '../components/pages/Webanalytics';





import  PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { login } from '../components/action/auth';
import Preloader from '../components/layouts/Preloader';
import { startLoadingProducts } from '../components/action/products';






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
                path="/default-login"
                component={Defaultlogin}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute
                path="/accordions" 
                component={Accordions}
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
                path="/alerts"
                component={Alerts} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/animations" 
                component={Animations}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/badges" 
                component={Badges} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/basic-tables" 
                component={Basictables}
                isAuthenticated={ isLoggedIn }
                 />

                <PrivateRoute 
                path="/breadcrumbs" 
                component={Breadcrumbs} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/buttons" 
                component={Buttons} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/cards"
                 component={Cards} 
                 isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/chartjs" 
                component={Chartjs}
                isAuthenticated={ isLoggedIn }
                 />

                <PrivateRoute 
                path="/chat" 
                component={Chat}
                isAuthenticated={ isLoggedIn } 
                />

                <PrivateRoute 
                path="/cropper"
                component={Cropper}
                isAuthenticated={ isLoggedIn }
                 />

                <PrivateRoute 
                path="/customer-list"
                component={Customerlist} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/customer-review"
                component={Customerreview}
                isAuthenticated={ isLoggedIn } 
                />

                <PrivateRoute 
                path="/data-tables" 
                component={Datatables}
                isAuthenticated={ isLoggedIn } 
                />

                <PrivateRoute 
                path="/draggables" 
                component={Draggables} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/email" 
                component={Email} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/flaticons"
                component={Flaticons}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/fontawesome" 
                component={Fontawesome} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/form-elements"
                component={Formelements}
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                path="/form-layouts"
                component={Formlayouts}
                isAuthenticated={ isLoggedIn }

                 />

                <PrivateRoute 
                path="/form-validation" 
                component={Formvalidation}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/form-wizard" 
                component={Formwizard}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/google-maps" 
                component={Googlemaps}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                 path="/invoice-detail"
                 component={Invoicedetail}
                 isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/invoice-list" 
                component={Invoicelist}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/materialize" 
                component={Materialize}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/menu-catalogue" 
                component={Menucatalogue}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/menu-grid" 
                component={Menugrid}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/menu-list" 
                component={Menulist}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                path="/modals" 
                component={Modals}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/google-chart"
                component={Googlechart}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/orders" 
                component={Orders}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                 path="/pagination"
                 component={Pagination}
                 isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/preloaders" 
                component={Preloaders} 
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/product-detail" 
                component={Productdetail}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/progress-bars" 
                component={Progressbars}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/range-slider" 
                component={Rangeslider}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/rating" 
                component={Rating}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/restaurant-list" 
                component={Restaurantlist}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/sales" 
                component={Sales}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/sliders" 
                component={Sliders}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/social-activity" 
                component={Socialactivity}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/sweet-alerts" 
                component={Sweetalerts}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/tabs" 
                component={Tabs}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/toast" 
                component={Toast}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/todo-list" 
                component={Todolist}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/tour" 
                component={Tour} 
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/typography" 
                component={Typography}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/vector-maps" 
                component={Vectormaps}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                path="/widgets" 
                component={Widgets}
                isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                path="/client-management" 
                component={Clientmanagement}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                path="/coming-soon" 
                component={Comingsoon} 
                isAuthenticated={ isLoggedIn }
                />
               
                <PublicRoute 
                path="/default-register" 
                component={Defaultregister}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/error" 
                component={Error}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/faq" 
                component={Faq} 
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/invoice" 
                component={Invoice}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                path="/lock-screen" 
                component={Lockscreen}
                isAuthenticated={ isLoggedIn }
                 />
                <PrivateRoute 
                path="/modal-login" 
                component={Modallogin}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/modal-register" 
                component={Modalregister} 
                isAuthenticated={ isLoggedIn }
               
                />
                <PrivateRoute 
                path="/portfolio" 
                component={Portfolio} 
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/stock-management" 
                component={Stockmanagement}
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/user-profile" 
                component={Userprofile} 
                isAuthenticated={ isLoggedIn }
                />
                <PrivateRoute 
                path="/web-analytics" 
                component={Webanalytics} 
                isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute
                    exact
                    isAuthenticated={ isLoggedIn }
                    path=""
                    component={ Dashboard }
                 />

                <Redirect to="/default-login" />
            </Switch>
        </Router>
      )
  }

  export default AppRouter