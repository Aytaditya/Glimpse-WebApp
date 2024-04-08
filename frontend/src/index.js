import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 import { Contextprovider } from './SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Contextprovider>
    <App />
    </Contextprovider>
  </React.StrictMode>
);


reportWebVitals();
