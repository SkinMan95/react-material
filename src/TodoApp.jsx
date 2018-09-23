import React from 'react';
import DatePicker from 'react-datepicker';
import moment from "moment";
import { TodoList } from "./TodoList";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './TodoApp.css';
import { Get } from 'react-axios';

export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '', priority: 0, dueDate: moment() };
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.todoList = this.todoList.bind(this);
	}



	todoList() {
		this.props.axios.get('/todo')
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
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
								id="due-date"
								selected={this.state.dueDate}
								placeholderText="Due date"
								onChange={this.handleDateChange}>
							</DatePicker>
							<br />
							<Button variant="outlined">
								Add #{this.state.items.length + 1}
							</Button>
						</form>
						<br />
						<br />
						{this.props.axios && <Get url="/todo" instance={this.props.axios}>
							{(error, response, isLoading, onReload) => {
								if (error) {
									console.log(error);
									return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button></div>)
								}
								else if (isLoading) {
									return (<div>Loading...</div>)
								}
								else if (response !== null) {
									console.log(response.data);
									return (<TodoList todoList={response.data}></TodoList>)
								}
								return (<div>Default message before request is made.</div>)
							}}
						</Get>}
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
