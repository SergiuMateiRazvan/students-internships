import React from 'react';
import {Home} from './Home';
import {Register} from '../auth';
import {isUserAuthenticated} from '../../common';

const HomePage = () => (
  isUserAuthenticated() ? <Home/> : <Register />
);

export default HomePage;
