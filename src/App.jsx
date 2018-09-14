import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Login } from './login/Login';
import { TodoApp } from './TodoApp';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

class App extends Component {

	constructor(props) {
		super(props);

		localStorage.setItem('default_user', 'user');
		localStorage.setItem('default_pass', 'password');
		const logged = localStorage.getItem('isLoggedIn');

		this.state = { user: '', password: '', isLoggedIn: Object.is(logged, undefined) ? false : logged };

		this.handleLogin = this.handleLogin.bind(this);
		this.correctCredentials = this.correctCredentials.bind(this);
	}

	handleLogin() {
		if (this.correctCredentials()) {
			console.log('Correct credentials');
			this.setState({ isLoggedIn: true });
			localStorage.setItem('isLoggedIn', true);
		} else {
			console.log('Incorrect credentials');
			this.setState({ isLoggedIn: false });
			localStorage.setItem('isLoggedIn', false);
		}
	}

	correctCredentials() {
		let condition = this.state.user == localStorage.getItem('default_user');
		condition = condition && this.state.password == localStorage.getItem('default_pass');

		console.log('Actual', this.state.user, this.state.password);

		return condition
	}

	isLoggedIn() {
		return localStorage.getItem('isLoggedIn') == true;
	}

	handleUserChange = (event) => {
		event.preventDefault();
		// console.log('user', event.target.value);
		this.setState({ user: event.target.value });
	}

	handlePasswordChange = (event) => {
		event.preventDefault();
		// console.log('password', event.target.value);
		this.setState({ password: event.target.value });
	}

	LoginView = () => (
		<Login
			onUserChange={this.handleUserChange}
			onPasswordChange={this.handlePasswordChange}
			onLogin={this.handleLogin}
			isLoggedIn={this.state.isLoggedIn}
		/>
	);

	TodoView = () => (
		<TodoApp
			isLoggedIn={this.state.isLoggedIn}
		/>
	);

	ConditionalLogin = () => {
		if (!this.state.isLoggedIn) {
			return this.LoginView();
		} else {
			return <Redirect to='/todo'></Redirect>;
		}
	}

	ConditionalRoute = () => {
		if (this.state.isLoggedIn) {
			return this.TodoView();
		} else {
			return <Redirect to='/'></Redirect>;
		}
	}

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">TODO React App</h1>
					</header>

					<br />
					<br />

					<ul>
						{!this.state.isLoggedIn && <li><Link to="/">Login</Link></li>}
						{this.state.isLoggedIn && <li><Link to="/todo">Todo</Link></li>}
					</ul>

					<div>
						<Route exact path="/" component={this.ConditionalLogin} />
						<Route path="/todo" component={this.ConditionalRoute} />
						{/* <Route path="/todo" component={this.state.isLoggedIn ? {TodoView} : {LoginView}}/> */}
					</div>
				</div>
			</Router>
		);
	}

}

export default App;
