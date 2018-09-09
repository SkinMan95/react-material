import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { Login } from './login/Login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment()};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {

        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">TODO React App</h1>
              </header>

              <br/>
              <br/>
              <form onSubmit={this.handleSubmit} className="todo-form">
                <h3>New TODO</h3>
                <label htmlFor="text" className="right-margin">
                  Text:
                </label>

                <input
                  id="text"
                  onChange={this.handleTextChange}
                  value={this.state.text}>
                </input>

                <br/>
                <br/>
                <label htmlFor="priority" className="right-margin">
                  Priority:
                </label>

                <input
                  id="priority"
                  type="number"
                  onChange={this.handlePriorityChange}
                  value={this.state.priority}>
                </input>
                <br/>
                <br/>

                <DatePicker
                  id="due-date"
                  selected={this.state.dueDate}
                  placeholderText="Due date"
                  onChange={this.handleDateChange}>
                </DatePicker>
                <br/>
                <button>
                  Add #{this.state.items.length + 1}
                </button>
              </form>
              <br/>
              <br/>
              <TodoList todoList={this.state.items}/>
            </div>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }

}

export default App;
