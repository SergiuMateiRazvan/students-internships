import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {InternshipDescription} from '../common';
import './IntershipList.css';
import {useHistory} from 'react-router-dom';
import {addInternshipView} from '../../service';
import {getUserEmail} from '../../common';

const Internship = ({internship, onSeeMore}) => {
  return (
    <li className={'listItem'}>
      <Card>
        <Card.Header className={'internshipHeader'}>
          {internship.title}
        </Card.Header>
        <Card.Body>
          <div className={'startDate'}>
            Starting from <span className={'startDate'}>
              {internship.start_date}
            </span>
          </div>
          <InternshipDescription
            description={internship.description}
            expanded={false}
          />
          <div className={'locationBlock'}>
            <span className={'location'}>{internship.location}</span>
          </div>
          <div className={'companyBlock'}>
            <span className={'company'}>
              {internship.company.user_details.name}
            </span>
          </div>
          <Button
            className={'seeMoreBtn'}
            variant={'primary'}
            onClick={() => onSeeMore(internship)}
          >
            See more information
          </Button>
        </Card.Body>
      </Card>
    </li>
  );
};

export const InternshipList = ({internships}) => {
  const history = useHistory();
  const onNavigateToInternship = (internship) => {
    addInternshipView(internship.internship_id, getUserEmail());
    history.push('/internship', {internship: internship});
  };

  return (
    <ul className={'internshipList'}>
      {internships && internships.map((internship) =>
        <Internship
          internship={internship}
          key={internship.id}
          onSeeMore={onNavigateToInternship}
        />,
      )}
    </ul>
  );
};

InternshipList.propTypes = {
  internships: PropTypes.array,
};

Internship.propTypes = {
  internship: PropTypes.object,
  onSeeMore: PropTypes.func,
};

