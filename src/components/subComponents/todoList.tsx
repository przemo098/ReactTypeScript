import * as React from 'react';
import { TodoItem } from './listEntity'
import { List } from 'linqts';
import * as moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import * as Datetime from 'react-datetime';
import * as ReactDOM from 'react-dom';
import Task from './task';

interface ITodoListComponenProps {
    data: List<TodoItem>;
    name: string;
    addItem(task: string, date: Date): void;
    onDelete(item: TodoItem);
    onTaskClick(isActive: TodoItem);
    onPriorityChange(task: TodoItem, priority: number): void;
    style: any;
}

interface ITodoListComponenState {
    newTask: string;
    tasks: List<TodoItem>;
    selectedDateTime: Date;
}


export default class TodoListComponent extends React.Component<ITodoListComponenProps, ITodoListComponenState> {
    constructor(props: any) {
        super(props);

        this.updateDateTime = this.updateDateTime.bind(this);
        this.newElement = this.newElement.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.taskExpiration(this.props.data.First().expirationDate);

        this.state = { newTask: "Sample task", tasks: this.props.data, selectedDateTime: new Date() }
    }


    render() {
        let TooLate = <div />;

        if (this.props.data.Where(x => this.taskExpiration(x.expirationDate) < 0).Any()) {
            TooLate = <div>
                <div>Too late..</div>

                <ul id="myUL" style={{padding: 0}}>
                    {this.props.data.Where(x => this.taskExpiration(x.expirationDate) < 0).ToArray().map((item: TodoItem, index: number) =>
                        <Task value={item} key={index}
                            onTaskClick={(task: TodoItem) => this.props.onTaskClick(task)}
                            onDeletion={(task: TodoItem) => this.props.onDelete(task)}
                            updatePriority={(task: TodoItem, priority: number) => this.props.onPriorityChange(task, priority)}
                            onActivationChage={(item: TodoItem) => this.props.onTaskClick(item)} />)}
                </ul>
            </div>
        }

        return (
            <div style={this.props.style}>
                <div id="myDIV" className="header">

                    <h2>{this.props.name}</h2>
                    <input style={{ color: 'black' }} value={this.state.newTask} type="text" id="myInput" placeholder="Title..."
                        onChange={event => this.setState({ newTask: event.target.value })} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Datetime value={this.state.selectedDateTime as any} onChange={this.updateDateTime as any} />
                        <button onClick={() => this.newElement()} className="btn">Add new task</button>
                    </div>
                </div>
                {TooLate}
                <div>
                    Todo:
                    <ul className="list-group" id="myUL">
                        {this.props.data.Where(x => this.taskExpiration(x.expirationDate) >= 0).ToArray().map((item: TodoItem, index: number) =>
                            <Task value={item} key={index}
                                onTaskClick={(task: TodoItem) => this.props.onTaskClick(task)}
                                onDeletion={(task: TodoItem) => this.props.onDelete(task)}
                                updatePriority={(task: TodoItem, priority: number) => this.props.onPriorityChange(task, priority)}
                                onActivationChage={(item: TodoItem) => this.props.onTaskClick(item)} />)}
                    </ul>
                </div>
            </div>)
    }


    addButton: any;

    newElement() {
        console.log(this.props.addItem)
        this.props.addItem(this.state.newTask, this.state.selectedDateTime);
    }

    handleDateChange(newDate: Date) {
        this.setState({ selectedDateTime: newDate })
    }

    handleTimeChange(newTime: any) {
        console.log(newTime);
    }

    updateDateTime(date: Date) {
        this.setState({ selectedDateTime: date });
    }

    renderTask(key: number, value: TodoItem) {
        return <li key={key}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>{value.name}</div>
                <div style={{ margin: 'auto' }}>Expiration date:{moment(value.expirationDate).format('MM-dd-YY h:mm A').toString()}</div>
                <button className="glyphicon glyphicon-remove" style={{ marginLeft: 'auto' }}></button>
            </div>
        </li>
    }

    taskExpiration(date: Date): number {
        return moment(date).diff(moment(), 'days' as any);
    }
}
