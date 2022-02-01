import React, {useEffect, useState} from 'react';
import {deleteDescription, getStudents} from '../../service';
import {StudentsList} from './StudentsList';
import './Home.css';

export const Home = () => {

  const [students, setStudents] = useState();

  useEffect(() => {
    getStudents().then(response => setStudents(response));
  }, [])

  const onDeleteDescription = (studentMail, description) => {
    const confirmation = window.confirm("You're about to delete this description. Are you sure?")
    if (confirmation) {
      deleteDescription(studentMail, description).then(response => {
        getStudents().then(response => setStudents(response));
        console.log(response);
      });
    }
  }

  return (
    <div className={'container'}>
      <header className={'homeHeader'}>
        Moderation
      </header>
      <StudentsList
        studentsList={students}
        onDeleteDescription={onDeleteDescription}
      />
    </div>
  )
};
