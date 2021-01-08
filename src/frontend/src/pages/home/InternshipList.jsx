import React from 'react';
import PropTypes from 'prop-types';

const Internship = ({internship}) => {
  return (
    <li>
      {internship.title}
    </li>
  );
};

export const InternshipList = ({internships}) => {
  return (
    <ul>
      {internships && internships.length && internships.map((internship) =>
        <Internship internship={internship} key={internship.id}/>,
      )}
    </ul>
  );
};

InternshipList.propTypes = {
  internships: PropTypes.Array,
};

Internship.propTypes = {
  internship: PropTypes.object,
};

