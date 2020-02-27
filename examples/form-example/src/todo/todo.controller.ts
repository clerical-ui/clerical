import { ITodo } from './todo.model';
import { ClericalState } from '../../../../clerical-core';

export class TodoController {

    constructor(private state: ClericalState) { }

    addTodo(event: KeyboardEvent) {
        const target = event.target as HTMLInputElement;
        const text = target.value;
        if (event.code === 'Enter' && text) {
            const todos: ITodo[] = this.state.getValue('localStorage.todos') || [];
            this.state.updateValue('localStorage.todos', [...todos, {
                createdDate: new Date(),
                text
            }]);
            this.state.updateValue('sessionStorage.todo', '');
        }
    }

    removeTodo(event: Event) {
        const target = event.target as any;
        const index = target.ctx.todoIndex;
        const todos: ITodo[] = this.state.getValue('localStorage.todos') || [];
        todos.splice(index, 1);

        // New array reference required to update state appropriately
        this.state.updateValue('localStorage.todos', todos.map(t => t));
    }
}
