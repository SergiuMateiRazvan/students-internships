import React from 'react';
import {useState, useEffect} from 'react';
import {InternshipList} from './InternshipList';
import {getInternships} from '../../service';

export const Home = () => {
  const [internshipsList, setInternshipList] = useState([]);


  useEffect(() => {
    getInternships().then((response) => {
      setInternshipList(response);
    });
  }, []);

  return (
    <div>
      <InternshipList internships={internshipsList}/>
    </div>
  );
};
