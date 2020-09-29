import React, {Component, useState} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FaAlignRight } from "react-icons/fa";
import { GithubContext } from '../context/context';

const Navbar = () => {
	const {
		isAuthenticated, 
		loginWithRedirect, 
		logout, 
		user, 
		isLoading
	} = useAuth0();

	const isUser = isAuthenticated && user;
	//const {isOpen} = React.useContext(GithubContext);
	//const isOpen = true;
	const [isOpen, setClick] = useState(false);
	const handleClick = () => setClick(!isOpen);

	return (
		<Wrapper>
			<div className="nav-center section-center">
				<div className="nav-header">
					<div className="nav-avatar">
						{isUser && user.picture && <img src={user.picture} alt={user.name} />}
						{isUser && user.name && (
							<h4><strong>{user.name.toUpperCase()}</strong></h4>
						)}
					</div>

					<button
						type="button"
						className="nav-btn"
						onClick={handleClick}
					>
						<FaAlignRight className="nav-icon" />
					</button>
				</div>

				<ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
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

			</div>
		</Wrapper>
	  );
};

const Wrapper = styled.nav`
	width: 100%;
	padding: 1rem 0;
	background: var(--clr-white);
	h4 {
		margin-bottom: 0;
		font-weight: 400;
	}
	img {
		width: 50px !important;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}
	.nav-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nav-avatar {
		display: flex;
		align-items: center;
		width: 280px;
		justify-content: space-between;
	}
	.nav-links {
		height: 0;
		overflow: hidden;
		transition: var(--mainTransition);
		list-style-type: none;

	}
	button, a {
		background: transparent;
		border: transparent;
		font-size: 1rem;
		text-transform: capitalize;
		-webkit-letter-spacing: var(--spacing);
		-moz-letter-spacing: var(--spacing);
		-ms-letter-spacing: var(--spacing);
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
		font-weight: 600;
	}
	.nav-links li {
		display: block;
		text-decoration: none;
		padding: 1rem 0;
		color: var(--mainBlack);
		transition: var(--mainTransition);
		text-align: center;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: var(--mainSpacing);
	}
	.nav-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		outline: none;
		font-size: 2rem;
	}
	.nav-center{
		justify-content: space-between;
	}
	.show-nav {
		height: 170px;
	}
	@media screen and (min-width: 768px) {
		.nav-btn {
			display: none;
		}
		.nav-center {
			//width: 95vw;
			max-width: 1170px;
			margin: 0 auto;
			display: flex;
		}
		.nav-links {
			height: auto;
			display: flex;
			margin-left: 4rem;
		}
		.nav-links a {
			margin: 0 1rem;
			padding: 0.5rem 0;
		}
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
// 							<button>logout</button>		
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
// 	//grid-template-columns: auto auto 100px;
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
