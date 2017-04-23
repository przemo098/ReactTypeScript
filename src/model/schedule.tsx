export class Schedule {
    todo: Todo[];
    selected: Todo;
}

export class Todo {
    name: string;
    expiration: Date;
    priority: number;    
}