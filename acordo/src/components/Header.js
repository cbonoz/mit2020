import React, { Component } from 'react';

import logo from './../assets/acordo_logo.png';

export default class Header extends Component {
	render() {
		return (
			<div>
				<nav className="navbar is-light" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<a className="navbar-item" href="https://bulma.io">
							<img src={logo} width="112" height="28" />
						</a>

						<a
							role="button"
							className="navbar-burger burger"
							aria-label="menu"
							aria-expanded="false"
							data-target="navbarBasicExample"
						>
							<span aria-hidden="true" />
							<span aria-hidden="true" />
							<span aria-hidden="true" />
						</a>
					</div>

					<div id="navbarBasicExample" className="navbar-menu">
						<div className="navbar-start">
							<a className="navbar-item">Home</a>

							<a className="navbar-item">About</a>

							<div className="navbar-item has-dropdown is-hoverable">
								<a className="navbar-link">More</a>

								<div className="navbar-dropdown">
									<a className="navbar-item">Jobs</a>
									<a className="navbar-item">Contact</a>
									<hr className="navbar-divider" />
									<a className="navbar-item">Report an issue</a>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}
