import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = createRoot(document.body);
rootElement.render(<App />);
