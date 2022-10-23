//Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
//Components
import { ToastContainer } from 'react-toastify';
import Router from './Routes/Router';
//Css
import "./styles/globalStyle.css";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router />
  </React.StrictMode>
);
