export class TodoItem {
    name: string;
    expirationDate: Date;
    isDone: boolean;
    priority: number;

    constructor(name: string, expirationDate: Date = new Date(), priority: number = 0, isDone: boolean = false) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.isDone = isDone;
        this.priority = priority;
    }
}