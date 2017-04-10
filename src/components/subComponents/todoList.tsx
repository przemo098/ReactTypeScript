import * as React from 'react';
import { TodoItem } from './listEntity'
import { List } from 'linqts';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import 'rc-time-picker/assets/index.css';
import * as Datetime from 'react-datetime';
import * as ReactDOM from 'react-dom';

export default class TodoListComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.updateDateTime = this.updateDateTime.bind(this);
        this.newElement = this.newElement.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);


        let mockList1 = new List<TodoItem>();
        mockList1.Add(new TodoItem("Todo1", new Date()));
        mockList1.Add(new TodoItem("Hit the gym", new Date()));
        mockList1.Add(new TodoItem("Meet George", new Date()));
        mockList1.Add(new TodoItem("Organize office", new Date()));

        this.state = { newTask: "Sample task", tasks: mockList1, selectedDateTime: new Date() }
    }

    addButton: any;

    newElement() {
        console.log(this.props.addItem)
        this.props.addItem(this.state.newTask, this.state.selectedDateTime);
    }

    handleDateChange(newDate: any) {
        this.setState({ date: newDate })
    }

    handleTimeChange(newTime: any) {
        console.log(newTime);
    }

    updateDateTime(date: Date) {
        this.setState({ selectedDateTime: date });
    }

    render() {
        return (
            <div style={this.props.style}>
                <div id="myDIV" className="header">

                    <h2>{this.props.name}</h2>
                    <input style={{ color: 'black' }} value={this.state.newTask} type="text" id="myInput" placeholder="Title..."
                        onChange={event => this.setState({ newTask: event.target.value })} />


                    <div></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <Datetime value={this.state.selectedDateTime} onChange={this.updateDateTime} />

                        <div onClick={() => this.newElement()} className="addBtn">Add new task</div>
                    </div>
                </div>
                <ul id="myUL">
                    {this.props.data.map((item: TodoItem, index: number) => <li key={index}>{item.name} {moment(item.expirationDate).format('MM-dd-YY h:mm A').toString()} </li>)}
                </ul>
            </div>)
    }
}
