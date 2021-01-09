import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {InternshipDescription} from '../common';
import './IntershipList.css';

const Internship = ({internship}) => {
  return (
    <li className={'listItem'}>
      <Card>
        <Card.Header className={'internshipHeader'}>
          {internship.title}
        </Card.Header>
        <Card.Body>
          <InternshipDescription
            description={internship.description}
            expanded={false}
          />
          <div className={'locationBlock'}>
            <span className={'location'}>{internship.location}</span>
          </div>
          <div className={'companyBlock'}>
            <span className={'company'}>{internship.company.name}</span>
          </div>
          <Button className={'seeMoreBtn'} variant={'primary'}>
            See more information</Button>
        </Card.Body>
      </Card>
    </li>
  );
};

export const InternshipList = ({internships}) => {
  return (
    <ul className={'internshipList'}>
      {internships && internships.length && internships.map((internship) =>
        <Internship internship={internship} key={internship.id}/>,
      )}
    </ul>
  );
};

InternshipList.propTypes = {
  internships: PropTypes.array,
};

Internship.propTypes = {
  internship: PropTypes.object,
};

