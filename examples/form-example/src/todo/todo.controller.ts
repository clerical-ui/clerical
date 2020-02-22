import { ITodo } from './todo.model';
import { ClericalState } from './../../../../clerical-core/src/clerical-state/clerical.state';

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

}
