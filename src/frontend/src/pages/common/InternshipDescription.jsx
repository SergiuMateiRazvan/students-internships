import React from 'react';
import PropTypes from 'prop-types';
import './InternshipList.css';

const Skills = ({skills}) => (
  <div className={'skillsListWrapper'}>
    <h5 className={'skillsListTitle'}>
      Required skills
    </h5>
    <ul className={'skillsList'}>
      {skills && skills.length && skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </div>
);

const Benefits = ({benefits}) => {
  return (
    <></>
  );
};

export const InternshipDescription = ({description, expanded}) => {
  return (
    <div className={'internshipDescriptionWrapper'}>
      <Skills skills={description.skills} />
      {expanded && <Benefits benefits={description.benefits}/>}
    </div>
  );
};

InternshipDescription.propTypes = {
  description: PropTypes.object,
  expanded: PropTypes.bool,
};

InternshipDescription.defaultProps = {
  expanded: true,
};


Skills.propTypes = {
  skills: PropTypes.array,
};

Benefits.propTypes = {
  benefits: PropTypes.array,
};
