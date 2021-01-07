import React from 'react';
import {useHistory} from 'react-router-dom';
import {register} from '../../service';
import './auth.css';

export const Register = () => {
  const history = useHistory();
  const onRegister = (ev) => {
    ev.preventDefault();
    const userType = ev.target[2].checked ?
      ev.target[2].value : ev.target[3].value;
    const user = {
      mail: ev.target[0].value,
      password: ev.target[1].value,
      user_type: userType,
    };
    register(user).then((result) => {
      if (result.status !== 200) {
        result.json().then((response) => {
          alert(response.detail);
        });
      } else {
        setTimeout(() => history.push('/login'), 1500);
        alert('You have created your account');
      }
    });
  };


  return (
    <div className={'formWrapper'}>
      <form className={'authBody'} onSubmit={onRegister}>
        <h3>Register</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email" className="form-control" placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password" className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <input
            type="radio" id="user-type-student" name={'userType'}
            value={'student'} defaultChecked
          />
          <label htmlFor="user-type-student" id={'user-type-student-label'}>
            I am a student
          </label>
          <br/>
          <input
            type='radio' id='user-type-company' name={'userType'}
            value={'company'}
          />
          <label htmlFor='user-type-company' id={'user-type-company-label'}>
            I am a company
          </label>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">
        Register
        </button>

        <p className="forgot-password text-right">
          Already registered <a href="/login">log in</a>?
        </p>
      </form>
    </div>
  );
};
