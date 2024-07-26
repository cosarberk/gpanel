import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import history from './history';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history} >
         {localStorage.setItem('chakra-ui-color-mode', 'dark')}
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={"dark"} />
            <App />
        </ChakraProvider>
    </BrowserRouter>

);

