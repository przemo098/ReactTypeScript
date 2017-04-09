export class TodoList {
    name: string;
    todos: Array<TodoItem> = new Array<TodoItem>();
}



export class TodoItem {
    name: string;

    constructor(name: string){
        this.name = name;
    }
}