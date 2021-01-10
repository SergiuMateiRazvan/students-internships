import React from 'react';
import './InternshipForm.css';
import {HeaderNav} from '../common/HeaderNav';
import {getUserEmail} from '../../common';
import {postInternship} from '../../service';
import {useHistory} from 'react-router-dom';

export const InternshipForm = () => {
  const history = useHistory();

  const onPostInternship = (ev) => {
    ev.preventDefault();

    const internshipPost = {
      title: ev.target[0].value,
      start_date: ev.target[1].value,
      location: ev.target[2].value,
      description: {
        skills: ev.target[3].value.split(','),
        benefits: ev.target[4].value.split(','),
        details: ev.target[5].value,
      },
      company_mail: getUserEmail(),
    };

    postInternship(internshipPost).then((response) => {
      if (response.status === 200) {
        setTimeout(() => history.push('/'), 1500);
        alert('Internship added!');
      } else {
        alert('Error adding internship');
      }
    });
  };

  return (
    <div className={'formWrapper'}>
      <HeaderNav />
      <form className={'formBody'} onSubmit={onPostInternship}>
        <h3>Post an internship</h3>

        <div className="form-group">
          <label>Internship Title</label>
          <input
            type="text" className="form-control" placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date" className="form-control"
            placeholder="Enter start date"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text" className="form-control"
            placeholder="Enter location"
          />
        </div>

        <div className="form-group">
          <label>Required skills</label>
          <textarea
            className="form-control"
            placeholder="Add the required skills separated by a comma"
          />
        </div>

        <div className="form-group">
          <label>Benefits offered</label>
          <textarea
            className="form-control"
            placeholder="Add the offered benefits separated by a comma"
          />
        </div>

        <div className="form-group">
          <label>Details</label>
          <textarea
            className="form-control"
            placeholder="Add a description about the internship"
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">
          Submit internship
        </button>
      </form>
    </div>
  );
};
