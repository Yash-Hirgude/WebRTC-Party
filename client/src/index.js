import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './Context';


import './styles.css';
import './videoCall.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
    
);