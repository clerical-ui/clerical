// Shims
import '@webcomponents/webcomponentsjs';

import { ClericalApp } from '../../../clerical-core';
import { TodoController } from './todo/todo.controller';
import { appConfig } from './app.config';

// Import Web Components
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';

// Create the application with the defined configuration
const app = new ClericalApp(document.body, appConfig);

// Attach additional event handlers
const todoController = new TodoController(app.state);
app.eventRegistry.set('add-todo', (event) => todoController.addTodo(event));
app.eventRegistry.set('remove-todo', (event) => todoController.removeTodo(event));

// Start the router
app.router.start();
