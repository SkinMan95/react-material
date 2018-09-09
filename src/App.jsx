import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Login } from './login/Login';
import { TodoApp } from './TodoApp';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const LoginView = () => (
    <Login/>
);

const About = () => (
    <div>
      {/* <NavBar/> */}
      {/* <CoursesList/> */}
    </div>
);

const TodoView = () => (
    <TodoApp/>
);

class App extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const isLoggedIn = false;
        
        return (
            <Router>
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h1 className="App-title">TODO React App</h1>
                </header>

                <br/>
                <br/>

                <ul>
                  <li><Link to="/">Login</Link></li>
                  {isLoggedIn && <li><Link to="/todo">Todo</Link></li>}
                </ul>

                <div>
                  <Route exact path="/" component={LoginView}/>
                  <Route path="/todo" component={isLoggedIn ? {TodoView} : {LoginView}}/>
                </div>
              </div>
            </Router>
        );
    }

}

export default App;
