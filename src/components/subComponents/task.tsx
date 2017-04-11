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

        if (this.props.value.isDone === false) {
            this.state = { taskStyle: activeUnactive.Active };
        } else {
            this.state = { taskStyle: activeUnactive.Unactive };
        }



        let borderStyle: any = {};

        let days = moment(this.props.value.expirationDate).diff(moment(), 'days' as any);
        if (days < 1) {
            borderStyle = {color: 'red'};
        }



        return (
            <li style= {borderStyle} className={this.state.taskStyle}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button onClick={() => this.props.onTaskClick(this.props.value)}
                        style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
                        <div>{this.props.value.name}</div>
                        <div style={{ marginLeft: 'auto' }}>Expiration date: {moment(this.props.value.expirationDate).format('MM-DD-YY h:mm A').toString()}</div>

                    </button>
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
}