import React from 'react';
import DatePicker from 'react-datepicker';
import moment from "moment";
import { TodoList } from "./TodoList";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './TodoApp.css';

export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '', priority: 0, dueDate: moment(), gotItems: false, file: ''};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.askForItems = this.askForItems.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
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
				console.log("Respuesta en 'askForItems'", response);
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
								id="description"
								onChange={this.handleTextChange}
								value={this.state.text}
								placeholder="Description">
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

							<Input
								id="file"
								type="file"
								onChange={this.handleInputChange}
								>
							</Input>

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

	handleInputChange(e) {
		console.log(e.target.files[0]);
		this.setState({
			file: e.target.files[0]
		});                
	}

	handleSubmit(e) {
		const _this = this;

		e.preventDefault();

		const newItem = {
			description: this.state.text,
			priority: this.state.priority,
			dueDate: this.state.dueDate.toISOString(),
			fileUrl: "http://localhost:8080/api/files/" + this.state.file.name // TODO
		};

		const addTodoFunc = function() {
			_this.props.axios.post('/todo', newItem)
				.then((response) => {
					console.log('sucessfully added todo item');
					_this.askForItems();
				})
				.catch((error) => {
					console.log('Error adding todo item', error.message);
				});

				if (!_this.state.text.length || !_this.state.priority.length || !_this.state.dueDate) return;

				_this.setState(prevState => ({
					text: '',
					priority: '',
					dueDate: moment(),
					gotItems: false
				}));
		}

		let data = new FormData();
		data.append('file', this.state.file);

		if (this.props.axios !== null) {
        	this.props.axios.post('/files', data)
        	    .then(function (response) {
					console.log("file uploaded!", data);
					addTodoFunc();
        		})
        		.catch(function (error) {
        		    console.log("failed file upload", error);
				});
		}
		
		console.log('dueDate:', this.state.dueDate.toISOString(), Object.getOwnPropertyNames(this.state.dueDate));

		
	}

}
