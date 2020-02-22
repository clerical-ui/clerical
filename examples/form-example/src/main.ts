import { TodoController } from './todo/todo.controller';
import { Clerical } from '../../../clerical-core/src/clerical-core';
import { appConfig } from './app.config';

// Import Web Components
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';

// Start the application with the defined configuration
const app = Clerical.startRouter(document.body, appConfig);

// Attach additional event handlers
const todoController = new TodoController(app.state);
app.eventRegistry.set('add-todo', (event) => todoController.addTodo(event));
