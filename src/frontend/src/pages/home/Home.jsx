import React from 'react';
import {useState, useEffect} from 'react';
import {InternshipList} from './InternshipList';
import {getInternships} from '../../service';
import {SearchBar} from './SearchBar';
import {HeaderNav} from '../common/HeaderNav';

export const Home = () => {
  const [internshipsList, setInternshipList] = useState([]);


  useEffect(() => {
    getInternships().then((response) => {
      setInternshipList(response);
    });
  }, []);

  const onSearch = (searchText) => {
    getInternships({title: searchText}).then((response) => {
      setInternshipList(response);
    });
  };

  return (
    <div className={'outerWrapper'}>
      <HeaderNav />
      <SearchBar onSearch={onSearch} />
      <InternshipList internships={internshipsList}/>
    </div>
  );
};
