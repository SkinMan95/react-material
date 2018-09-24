import React from 'react';
import DatePicker from 'react-datepicker';
import moment from "moment";
import { TodoList } from "./TodoList";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './TodoApp.css';
import { Get } from 'react-axios';
import axios from 'axios';

export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '', priority: 0, dueDate: moment(), gotItems: false };
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.askForItems = this.askForItems.bind(this);
	}

	componentDidMount() {
		if(this.props.axios !== null) {
			this.askForItems();
		} else {
			console.log(this.props.axios);
		}
	}

	askForItems() {
		const _this = this;

		if(this.props.axios === null) return;

		this.props.axios.get('/todo')
			.then((response) => {
				console.log(response);
				_this.setState({
					items: response.data,
					gotItems: true
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		if (this.props.axios !== null && this.state.gotItems === false) {
			this.askForItems();
		}

		return (
			<div>
				{this.props.isLoggedIn &&
					<div>
						<form onSubmit={this.handleSubmit} className="todo-form">
							<h3>New TODO</h3>
							<Input
								id="text"
								onChange={this.handleTextChange}
								value={this.state.text}
								placeholder="Text">
							</Input>
							<br />
							<br />

							<label htmlFor="priority" className="right-margin">
								Priority:
                			</label>

							<Input
								id="priority"
								type="number"
								onChange={this.handlePriorityChange}
								value={this.state.priority}>
							</Input>
							<br />
							<br />

							<DatePicker
								dateFormat="YYYY-MM-DD"
								id="due-date"
								selected={this.state.dueDate}
								placeholderText="Due date"
								onChange={this.handleDateChange}>
							</DatePicker>
							<br />
							<Button variant="outlined" type="submit">
								Add TODO
							</Button>
						</form>
						<br />
						<br />
						<TodoList todoList={this.state.items}></TodoList>
					</div>}
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
		const _this = this;

		e.preventDefault();
		
		console.log('dueDate:', this.state.dueDate.toISOString(), Object.getOwnPropertyNames(this.state.dueDate));

		if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
			return;

		const newItem = {
			text: this.state.text,
			priority: this.state.priority,
			dueDate: this.state.dueDate.toISOString()
		};

		if (this.props.axios !== null) {
			this.props.axios.post('/todo', newItem)
				.then((response) => {
					console.log('sucessfully added todo item');
					_this.askForItems();
				})
				.catch((error) => {
					console.log('Error adding todo item', error.message);
				});
		}

		this.setState(prevState => ({
			text: '',
			priority: '',
			dueDate: moment()
		}));
	}

}
