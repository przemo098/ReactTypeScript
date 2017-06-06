import {Schedule} from './model/schedule';

export default class AppState {
    constructor(){
        this.counter = 0;
    }
    scheduler: Scheduler;
    counter: number;
}


export class Scheduler {
    schedules: Schedule[];
    selected: Schedule;
}