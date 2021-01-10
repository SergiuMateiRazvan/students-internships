import React, {useEffect, useState} from 'react';
import {Button, Navbar} from 'react-bootstrap';
import {getUserEmail, setUserLoggedOut} from '../../common';
import {useHistory} from 'react-router-dom';
import './HeaderNav.css';
import {getUser} from '../../service/Profile';

export const HeaderNav = () => {
  const [isUserCompany, setIsUserCompany] = useState(false);

  useEffect(() => {
    getUser(getUserEmail()).then((response) => {
      setIsUserCompany(response.user_type==='company');
    });
  }, []);

  const history = useHistory();
  const onLogout = () => {
    setUserLoggedOut();
    history.push('/');
  };
  const onAddInternship = () => history.push('/internship-post');

  return (
    <Navbar fixed={'top'} variant={'dark'} bg={'primary'}>
      <Navbar.Brand href="/home">Internship App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {isUserCompany && <Navbar.Text className={'addInternshipBtn'}>
          <Button variant={'light'} onClick={onAddInternship}>
            Add Internship
          </Button>
        </Navbar.Text>}
        <Navbar.Text>
          Signed in as: <a href="/profile">{getUserEmail()}</a>
        </Navbar.Text>
        <Navbar.Text className={'logoutBtn'}>
          <Button variant={'secondary'} onClick={onLogout}>Logout</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};
