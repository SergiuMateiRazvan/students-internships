import React from 'react';
import PropTypes, {string} from 'prop-types';
import './InternshipDescription.css';

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

const Benefits = ({benefits}) => (
  <div className={'benefitsWrapper'}>
    <h5 className={'benefitsTitle'}>Benefits</h5>
    <ul className={'benefitsList'}>
      {benefits && benefits.length && benefits.map((benefit) => (
        <li key={benefit}>{benefit}</li>
      ))}
    </ul>
  </div>
);

const Details = ({details}) => (
  <div className={'detailsWrapper'}>
    <pre>
      {details}
    </pre>
  </div>
);

export const InternshipDescription = ({description, expanded}) => {
  return (
    <div className={'internshipDescriptionWrapper'}>
      <Skills skills={description.skills} />
      {expanded && <Benefits benefits={description.benefits}/>}
      {expanded && <Details details={description.details} />}
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

Details.propTypes = {
  details: string,
};


