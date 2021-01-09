import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {InternshipDescription} from '../common';
import './Internship.css';
import {getInternshipViews} from '../../service';

const CompanyDetails = ({company}) => (
  <div className={'companyDetailsBlock'}>
    {company.description &&
      <div className={'companyDescription'}>
        {company.description}
      </div>}
    {company.phone &&
      <div>
        You can call us at
        <span className={'companyContact'}>{company.phone}</span>
      </div>
    }
    <div>
      You can write us at
      <span className={'companyContact'}>{company.user_mail}</span>
    </div>
  </div>
);

export const Internship = ({history}) => {
  const internship = history.location.state.internship;
  const [internshipViews, setInternshipViews] = useState(0);

  useEffect(() => {
    getInternshipViews(internship.internship_id).then((count) => {
      console.log(count);
      setInternshipViews(count);
    });
  }, []);

  return (
    <div className={'outerWrapper'}>
      <div className={'internshipWrapper'}>
        <div className={'internshipTitle'}>
          <h1>{internship.title}</h1>
        </div>
        <div className={'companyName'}>
        Promoted by
          <h3>
            {internship.company.user_details &&
          internship.company.user_details.name}
          </h3>
        </div>
        <InternshipDescription description={internship.description} />
        <div className={'locationBlock'}>
        We are located in
          <span className={'location'}>{internship.location}</span>
        </div>
        {internship.company.user_details &&
      <CompanyDetails company={internship.company.user_details} />
        }
        {internshipViews &&
        <div className={'internshipViewsCount'}>
          This internship has been viewed by {internshipViews} student
          {internshipViews > 1 && 's'}
        </div>
        }
      </div>
    </div>
  );
};


Internship.propTypes = {
  history: PropTypes.object,
};

CompanyDetails.propTypes = {
  company: PropTypes.object,
};
