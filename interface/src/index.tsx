//Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
//Components
import { ToastContainer } from 'react-toastify';
import Router from './Routes/Router';
//Css
import "./styles/globalStyle.css";
import 'react-toastify/dist/ReactToastify.css';
//Store
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Router />
    </Provider>
  </React.StrictMode>
);
