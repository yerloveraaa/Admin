import React from 'react';
import {Provider} from 'react-redux'


import Preloader from './components/layouts/Preloader';



import { store } from './components/store/store';
import  AppRouter  from './routers/AppRouter';
import AuthRouter from './routers/AuthRouter';



function App() {
  return (
    <Provider store={store}>
      <Preloader/>
      < AppRouter   />
    </Provider>
  );
}

export default App;
