import React, {Component} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FaAlignRight } from "react-icons/fa";

const Navbar = () => {
	const {
		isAuthenticated, 
		loginWithRedirect, 
		logout, 
		user, 
		isLoading
	} = useAuth0();

	const isUser = isAuthenticated && user;

	return (
		<Wrapper>
			{isUser && user.picture && <img src={user.picture} alt={user.name} />}
			{isUser && user.name && (
				<h4>
				Welcome, <strong>{user.name.toUpperCase()}</strong>
				</h4>
			)}
			<ul className="nav-links">
				<li>
					<Link to="/dashboard">Search</Link>
				</li>
				<li>
					<Link to="/recruitmen">Recruitmen</Link>
				</li>
				<li>
					{isUser && <button onClick={() => {logout({returnTo: window.location.origin})}}>logout</button>}
				</li>
			</ul>
		</Wrapper>
	  );
};

const Wrapper = styled.nav`
	padding: 1.5rem;
	margin-bottom: 4rem;
	background: var(--clr-white);
	text-align: center;
	display: grid;
	grid-template-columns: auto auto 100px;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
	h4 {
		margin-bottom: 0;
		font-weight: 400;
	}
	img {
		width: 35px !important;
		height: 35px;
		border-radius: 50%;
		object-fit: cover;
	}
	button {
		background: transparent;
		border: transparent;
		font-size: 1.2rem;
		text-transform: capitalize;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.nav-links {
		display: grid;
	}
	.nav-links a {
		background: transparent;
		border: transparent;
		font-size: 1.2rem;
		text-transform: capitalize;
		-webkit-letter-spacing: var(--spacing);
		-moz-letter-spacing: var(--spacing);
		-ms-letter-spacing: var(--spacing);
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}

`;

export default Navbar;




// export default class Navbar extends Component {
// 	state = {
// 	  isOpen: false
// 	};

// 	handleToggle = () => {
// 	  this.setState({ isOpen: !this.state.isOpen });
// 	};

// 	render() {
// 		return (
// 			<Wrapper>
// 				<div className="nav-center">
// 					<div className="nav-header">
// 						<button
// 							type="button"
// 							className="nav-btn"
// 							onClick={this.handleToggle}
// 						>
// 						<FaAlignRight className="nav-icon" />
// 						</button>
// 					</div>
// 					<ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
// 						<li>
// 							<Link to="/">Search</Link>
// 						</li>
// 						<li>
// 							<Link to="/recruitmen">Recruitmen</Link>
// 						</li>
// 						<li>
// 							<Link to="/rooms">Logout</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</Wrapper>
// 		);
// 	}
// }

// const Wrapper = styled.nav`
// 	padding: 1.5rem;
// 	margin-bottom: 4rem;
// 	background: var(--clr-white);
// 	text-align: center;
// 	display: grid;
// 	grid-template-columns: auto auto 100px;
// 	justify-content: center;
// 	align-items: center;
// 	gap: 1.5rem;
// 	h4 {
// 		margin-bottom: 0;
// 		font-weight: 400;
// 	}
// 	img {
// 		width: 35px !important;
// 		height: 35px;
// 		border-radius: 50%;
// 		object-fit: cover;
// 	}
// 	.nav-header {
// 		display: flex;
// 		justify-content: space-between;
// 	}
// 	.nav-btn {
// 		background: transparent;
// 		border: none;
// 		cursor: pointer;
// 		outline: none;
// 	}
// 	.nav-icon {
// 		font-size: 1.5rem;
// 		color: var(--primaryColor);
// 	}
// 	.nav-links {
// 		height: 0;
// 		overflow: hidden;
// 		transition: var(--mainTransition);
// 		list-style-type: none;
// 	}
// 	.nav-links a {
// 		display: block;
// 		text-decoration: none;
// 		padding: 1rem 0;
// 		color: var(--mainBlack);
// 		transition: var(--mainTransition);
// 		text-align: center;
// 		font-size: 1rem;
// 		font-weight: 600;
// 		letter-spacing: var(--mainSpacing);
// 	}
// 	.nav-links a:hover {
// 		color: var(--primaryColor);
// 	} 
// 	.show-nav {
// 		height: 100px;
// 	}
// 	@media screen and (min-width: 768px) {
// 		.nav-btn {
// 		  display: none;
// 		}
// 		.nav-center {
// 		  max-width: 1170px;
// 		  margin: 0 auto;
// 		  display: flex;
// 		}
// 		.nav-links {
// 		  height: auto;
// 		  display: flex;
// 		  margin-left: 4rem;
// 		}
// 		.nav-links a {
// 		  margin: 0 1rem;
// 		  padding: 0.5rem 0;
// 		}
// 	  }
// `;