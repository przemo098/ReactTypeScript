import * as React from 'react';
import { TodoItem } from './listEntity'
import { List } from 'linqts';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';




export default class TodoListComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.newElement = this.newElement.bind(this);


        let mockList1 = new List<TodoItem>();
        mockList1.Add(new TodoItem("Todo1"));
        mockList1.Add(new TodoItem("Hit the gym"));
        mockList1.Add(new TodoItem("Meet George"));
        mockList1.Add(new TodoItem("Organize office"));

        console.log(mockList1);

        this.state = { newTask: "Sample task", tasks: mockList1 }
    }


    newElement() {
        console.log(this.props.addItem)
        this.props.addItem(this.state.newTask);
    }

    handleDateChange(date: any){
        moment();
    }

    render() {
        return (
            <div style={this.props.style}>
                <div id="myDIV" className="header">

                    <h2>{this.props.name}</h2>
                    <input style={{ color: 'black' }} value={this.state.newTask} type="text" id="myInput" placeholder="Title..."
                        onChange={event => this.setState({ newTask: event.target.value })} />
                    {/*<DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDateChange} />
                    <span onClick={() => this.newElement()} className="addBtn">Add new task</span>*/}
                </div>
                <ul id="myUL">
                    {this.props.data.map((item: string, index: number) => <li key={index}>{item} </li>)}
                </ul>
            </div>)
    }
}
