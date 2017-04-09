import * as React from 'react';
import { Route, Link } from 'react-router';
import * as Select from 'react-select';
import { List } from 'linqts';
import { TodoItem } from './subComponents/listEntity'


import 'react-select/dist/react-select.css';

import Home from './home';
import Topics from './topics';
import TodoList from './subComponents/todoList';


interface IListValue {
    value: List<TodoItem>;
    label: string;
}

class ScheduleName implements IListValue {
    constructor(value: List<TodoItem>, label: string) {
        this.value = value;
        this.label = label
    }
    value: List<TodoItem>;
    label: string;
}

export default class Scheduler extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.updateValue = this.updateValue.bind(this);
        this.newValue = this.newValue.bind(this);
        this.addNewTask = this.addNewTask.bind(this);



        let taskList = new List<TodoItem>([new TodoItem('Task1'), new TodoItem('Task2')]);
        let taskList2 = new List<TodoItem>([new TodoItem('Task3'), new TodoItem('Task4')]);


        let arr = new List<ScheduleName>();
        arr.Add(new ScheduleName(taskList, "Todo1"));
        arr.Add(new ScheduleName(taskList2, "Todo2"));
        arr.Add(new ScheduleName(new List<TodoItem>(), "Todo3"));
        arr.Add(new ScheduleName(new List<TodoItem>(), "Todo4"));


        this.state = {
            availableLists: arr, currentList: arr.First(), addNewListClass: "btn btn-primary disabled", searchItem: ''
        }
    }

    updateTaskName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ newTask: event.target.value })
    }

    updateCurrentListName(event: React.ChangeEvent<HTMLInputElement>) {
        this.state.currentList.name = event.target.value
        this.setState({ currentList: this.state.currentList })
    }

    options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];

    updateValue(newValue: any) {
        this.setState({
            currentList: newValue
        })
    };

    newValue(value: string) {
        let arr = new List<ScheduleName>(this.state.availableLists.ToArray());
        this.setState({ addNewListClass: "btn btn-primary enabled", searchItem: value })
        if (arr.Any(x => { return x.label === value })) {
            console.log("changign !");
            this.setState({ addNewListClass: "btn btn-primary disabled" })
        }
    }


    addNewList() {
        this.state.availableLists.Add(new ScheduleName(new List<TodoItem>(), this.state.searchItem));
        this.setState({ availableLists: this.state.availableLists });
    }

    addNewTask(task: string) {
        this.state.currentList.value.Add(new TodoItem(task));
        this.setState({ currentList: this.state.currentList })
    }


    render() {

        console.log(this.state.availableLists.ToArray());
        // this.state.currentList.todos.map((item: any) => console.log(item))
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 50 }}>
                    <div style={{ width: 400 }}>
                        <Select
                            name="form-field-name"
                            value={this.state.currentList}
                            options={this.state.availableLists.ToArray()}
                            onInputChange={this.newValue}
                            onChange={this.updateValue}
                        />
                    </div>
                    <button type="button" onClick={() => this.addNewList()} className={this.state.addNewListClass}>Add</button>

                </div>
                <TodoList name={this.state.currentList.label}
                    data={this.state.currentList.value.Select(x => x.name).ToArray()}
                    addItem={(value) => this.addNewTask(value)}
                    style={{ marginTop: 100, width: 800 }} />

            </div>
        )
    }

}