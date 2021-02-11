import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    let gitUser, gitRepos, gitFollowers;

    gitUser = localStorageData('user');
    gitRepos = localStorageData('repos');
    gitFollowers = localStorageData('followers');

    const [githubUser, setGithubUser] = useState(gitUser);
    const [repos, setRepos] = useState(gitRepos);
    const [followers, setFollowers] = useState(gitFollowers);

    //request loading
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    //error
    const [error, setError] = useState({show: false, msg: ""});

    const searchGithubUser = async(user) => {
        toggleError();
        setIsLoading(true);
        
        const response = await axios(`${rootUrl}/users/${user}`)
            .catch((err) => console.log(err))

        if (response) {
            setGithubUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            //console.log(githubUser);
            
            const {login, followers_url} = response.data;
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ])
            .then((results) => {
                const [repos, followers] = results;
                const status = 'fulfilled';

                if (repos.status === status) {
                    const reposUser = JSON.stringify(repos.value.data);
                    localStorage.setItem('repos', reposUser);
                    setRepos(repos.value.data);
                }

                if (followers.status === status) {
                    const followersUser = JSON.stringify(followers.value.data);
                    localStorage.setItem('followers', followersUser);
                    setFollowers(followers.value.data);
                }
            });
        } else {
            toggleError(true, 'There is no user with that username!');
        }

        checkRequests();
        setIsLoading(false);
    }

    //check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) => {
            //console.log(data);
            let {rate: {remaining}} = data;
            //remaining = 0;
            setRequests(remaining);
            if(remaining === 0) {
                //throw an error
                toggleError(true, 'sorry, you have exeeded your hourly rate limit!');
            } 
        })
        .catch((err) => console.log(err));
    }

    function toggleError(show = false, msg = '') {
        setError({show, msg});
    } 

    useEffect(checkRequests, []);
    
    return (
        <GithubContext.Provider value={{
            githubUser, 
            repos, 
            followers, 
            requests, 
            error,
            searchGithubUser,
            isLoading
        }}>
            {children}
        </GithubContext.Provider>
    );
}

const localStorageData = (key) => {
    let value;

    if (localStorage.getItem(key)) {
        value = JSON.parse(localStorage.getItem(key));
    } else {
        value = JSON.stringify({});
        localStorage.setItem(key, value);
    }

    return value;
};

const isEmpty = (x) => !Object.keys(x).length;

export {GithubProvider, GithubContext, isEmpty};