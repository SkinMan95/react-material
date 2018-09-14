import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css';


export class Login extends React.Component {

	constructor(props) {
		super(props);

		this.submitHandle = this.submitHandle.bind(this);
	}

	submitHandle(event) {
		event.preventDefault();
		console.log('evento:', event);
		this.props.onLogin();
	}

	render() {
		const isLogged = this.props.isLoggedIn;
		return (
			<React.Fragment>
				<CssBaseline />
				{!isLogged &&
					<main className="layout">
						<Paper className="paper">
							<Avatar className="avatar">
								<LockIcon />
							</Avatar>
							<Typography variant="headline">Sign in</Typography>
							<form className="form" onSubmit={this.submitHandle}>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="email">Email Address</InputLabel>
									<Input id="email" name="email" autoComplete="email" autoFocus onChange={this.props.onUserChange} />
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input
										name="password"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={this.props.onPasswordChange}
									/>
								</FormControl>
								<Button
									type="submit"
									fullWidth
									variant="raised"
									color="primary"
									className="submit"
								>
									Sign in
                    </Button>
							</form>
						</Paper>
					</main>
				}
			</React.Fragment>
		);
	}

}
