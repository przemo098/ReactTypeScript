import {Schedule} from './model/schedule';

export default class AppState {
    constructor(){
        this.counter = 0;
        this.schedules = new Array<Schedule>();
        
    }
    schedules: Schedule[];
    counter: number;
}