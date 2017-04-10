import * as React from 'react';
import { TodoItem } from './listEntity'
import { List } from 'linqts';
import * as DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';


export default class TodoListComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.newElement = this.newElement.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);


        let mockList1 = new List<TodoItem>();
        mockList1.Add(new TodoItem("Todo1", moment()));
        mockList1.Add(new TodoItem("Hit the gym", moment()));
        mockList1.Add(new TodoItem("Meet George", moment()));
        mockList1.Add(new TodoItem("Organize office", moment()));

        this.state = { newTask: "Sample task", tasks: mockList1, date: moment() }
    }


    newElement() {
        console.log(this.props.addItem)
        this.props.addItem(this.state.newTask);
    }

    handleDateChange(newDate: any) {
        this.setState({ date: newDate })
    }

    handleTimeChange(newTime: any) {
        console.log(newTime);
    }

    render() {
        return (
            <div style={this.props.style}>
                <div id="myDIV" className="header">

                    <h2>{this.props.name}</h2>
                    <input style={{ color: 'black' }} value={this.state.newTask} type="text" id="myInput" placeholder="Title..."
                        onChange={event => this.setState({ newTask: event.target.value })} />
                    <div onClick={() => this.newElement()} className="addBtn">Add new task</div>

                    <div>
                        Date: <DatePicker selected={this.state.date} onChange={this.handleDateChange} />
                    </div>
                    <div>
                        Time: <TimePicker onChange={this.handleTimeChange} />
                    </div>
                </div>
                <ul id="myUL">
                    {this.props.data.map((item: TodoItem, index: number) => <li key={index}>{item.name} {item.expirationDate.toString()} </li>)}
                </ul>
            </div>)
    }
}
