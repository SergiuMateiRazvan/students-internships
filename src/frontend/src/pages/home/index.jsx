import React from 'react';
import {Home} from './Home';
import {isUserAuthenticated} from '../../common';
import {Redirect} from 'react-router-dom';

const HomePage = () => (
  isUserAuthenticated() ? <Home/> : <Redirect to={'/register'}/>
);

export default HomePage;
