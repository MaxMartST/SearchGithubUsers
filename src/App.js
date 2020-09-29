import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error, Recruitmen, Navigation } from './pages';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<AuthWrapper>
			<Router>
				<PrivateRoute path='/'>
					<Navigation/>
					<Redirect from='/' to='/dashboard'></Redirect>
				</PrivateRoute>
				<Switch>
					<Route path='/dashboard' component={Dashboard}/>
					<Route path='/recruitmen' component={Recruitmen}/>
					<Route path='/login' component={Login}/>
					<Route path='*' component={Error}/>
				</Switch>
			</Router>
		</AuthWrapper>
	);
}

export default App;
