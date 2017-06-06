export class Schedule {
    todo: Todo[];
    selected: Todo;
    name: string;
}

export class Todo {
    name: string;
    expiration: Date;
    priority: number;    
}