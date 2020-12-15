import React from 'react';
import {register} from '../../service';


export const Register = () => {
  const userName = '';

  const onRegister = (ev) => {
    ev.preventDefault();
    console.log(ev.target[0].value);
    register({'name': userName} ).then((result) => {
      console.log(result);
    });
  };

  return (
    <form onSubmit={onRegister}>
      <input type={'text'} />
      <input type={'submit'} value={'Submit'}/>
    </form>
  );
};
