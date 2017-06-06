import * as React from 'react';
import * as moment from 'moment';
import { TodoItem } from './listEntity'

class activeUnactive {
    static Active = "";
    static Unactive = "checked"
}

interface TaskProps {
    value: TodoItem;
    onDeletion(object: TodoItem): void;
    onActivationChage(item: TodoItem): void;
    onTaskClick(task: TodoItem): void;
    updatePriority(task: TodoItem, priority: number): void;
}

class TaskState {
    taskStyle: string = activeUnactive.Active;
}

export default class Task extends React.Component<TaskProps, TaskState> {

    handleDelete() {
        this.props.onDeletion(this.props.value);
    }




    render() {

        let days = moment(this.props.value.expirationDate).diff(moment(), 'days' as any);
        let strikeTrough = this.props.value.isDone == true ? "striketrough" : "";
        let reminderColor: string = this.getColor(this.props.value.expirationDate);

        return (
            <li style={{ padding: 0, color: reminderColor }} className="list-group-item">
                <div className={strikeTrough} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <input type="checkbox" checked={this.props.value.isDone} onClick={() => this.props.onTaskClick(this.props.value)} />
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>{this.props.value.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>Expiration date: {moment(this.props.value.expirationDate).format('MM-DD-YY h:mm A').toString()}</div>
                    <div>
                        Priority: <input type="number" min="1" max="100" value={this.props.value.priority}
                            onChange={(value) => this.props.updatePriority(this.props.value, Number(value.target.value))} />
                    </div>
                    <div style={{ justifyContent: 'flex-end' }}>
                        <button className="glyphicon glyphicon-remove" onClick={() => this.handleDelete()}></button>
                    </div>
                </div>
            </li>
        )
    }

    getColor(expirationDate: Date): string {
        let targetDate = moment(expirationDate);
        let now = moment();
        let differenceInDays = (now.diff(targetDate, 'days'));

        if (differenceInDays < 1) {
            return "red"
        }
        return "";
    }

    add(x: number, y: number): number {
        return x + y;
    }


}