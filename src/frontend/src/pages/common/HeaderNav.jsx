import React from 'react';
import {Navbar} from 'react-bootstrap';
import {getUserEmail} from '../../common';

export const HeaderNav = () => {
  return (
    <Navbar fixed={'top'} variant={'dark'} bg={'primary'}>
      <Navbar.Brand href="/home">Internship App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="/profile">{getUserEmail()}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};
