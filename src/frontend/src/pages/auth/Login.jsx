import React from 'react';
import {login} from '../../service';
import {useHistory} from 'react-router-dom';
import {setUserAuthenticated} from '../../common';
import './auth.css';

export const Login = () => {
  const history = useHistory();

  const onLogin = (ev) => {
    ev.preventDefault();
    const user = {
      mail: ev.target[0].value,
      password: ev.target[1].value,
    };
    login(user).then((response) => {
      if (response.status !== 200) {
        response.json().then((response) => {
          alert(response.detail);
        });
      } else {
        setUserAuthenticated(user.mail);
        history.push('/');
      }
    });
  };

  return (
    <div className={'formWrapper'}>
      <form className={'authBody'} onSubmit={onLogin}>
        <h3>Login</h3>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control"
            placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control"
            placeholder="Enter password" />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
        </button>
        <p className="forgot-password text-right">
        Forgot <a href="#">password</a> ?
        </p>

        <p className="forgot-password text-right">
          Don&apos;t have an account yet? Register <a href="/register">here</a>.
        </p>
      </form>
    </div>
  );
};

