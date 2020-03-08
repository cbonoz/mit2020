import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import 'bulma/css/bulma.css';
import Home from './components/Home';
import Header from './components/Header';
import Landing from './components/Landing';
import Send from './components/Send';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/start">
						<Home />
					</Route>
					<Route path="/send">
						<Send />
					</Route>
					<Route path="/">
						<Landing />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
