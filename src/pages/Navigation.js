import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import { useAuth0 } from '@auth0/auth0-react';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Navigation = () => {
	// const {isAuthenticated, user} = useAuth0();
	// const isUser = isAuthenticated && user;

    // return isUser ? null : <Navbar/>;
    return <Navbar/>;
};

export default Navigation;