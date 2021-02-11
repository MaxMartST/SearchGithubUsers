import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error, Recruitmen, Navigation } from './pages';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<AuthWrapper>
		<Router>
		  <Switch>
			<PrivateRoute path='/' exact={true}>
			  <Dashboard></Dashboard>
			</PrivateRoute>
			<Route path='/login'>
			  <Login></Login>
			</Route>
			<Route path='*'>
			  <Error></Error>
			</Route>
		  </Switch>
		</Router>
	  </AuthWrapper>
	);
}

export default App;
