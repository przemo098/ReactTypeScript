export class TodoItem {
    name: string;
    expirationDate: Date;

    constructor(name: string, expirationDate: Date){
        this.name = name;
        this.expirationDate = expirationDate;
    }
}