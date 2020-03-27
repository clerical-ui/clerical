// Shims
import '@webcomponents/webcomponentsjs';

import { ClericalApp } from '@clerical/core';
import { appConfig } from './app.config';
import './main.css';

// Import Web Components
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import '@material/mwc-textarea';

// Create the application with the defined configuration
const app = new ClericalApp(document.getElementById('root')!, appConfig);

// Start the router
app.router.start();
