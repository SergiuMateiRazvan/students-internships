import React from 'react';
import {Profile} from './Profile';
import {isUserAuthenticated} from '../../common';
import {Redirect} from 'react-router-dom';

const ProfilePage = () => (
  isUserAuthenticated() ? <Profile /> : <Redirect to={'/login'} />
);

export default ProfilePage;
