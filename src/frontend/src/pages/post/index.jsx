import {InternshipForm} from './InternshipForm';
import {isUserAuthenticated} from '../../common';
import {Redirect} from 'react-router-dom';
import React from 'react';


const InternshipFormPost = () => (
  isUserAuthenticated() ? <InternshipForm/> : <Redirect to={'/login'}/>
);

export default InternshipFormPost;
