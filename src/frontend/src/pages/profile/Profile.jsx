import React, {useEffect, useState} from 'react';
import {getUserEmail} from '../../common';
import {addUserDetails, getUserDetails} from '../../service/Profile';
import {HeaderNav} from '../common/HeaderNav';

const initialDetails = {
  user_mail: getUserEmail(),
  phone: '',
  education: {},
  name: '',
  description: '',
};

export const Profile = () => {
  const [userDetails, setUserDetails] = useState(initialDetails);
  const userMail = getUserEmail();
  const updateUserDetails = () => {
    getUserDetails(userMail).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          setUserDetails(result);
        });
      }
    });
  };

  useEffect(() => {
    console.log(userDetails);
    updateUserDetails();
  }, []);

  const onUpdateInfo = (ev) => {
    ev.preventDefault();
    const education = {};
    const educationItems = ev.target[2].value.split(',');
    for (let i=0; i<educationItems.length; i++) {
      if (educationItems[i].length > 0) {
        const items = educationItems[i].split(':');
        education[items[0]] = items[1];
      }
    }
    const updateInfo = {
      user_mail: userDetails.user_mail,
      name: ev.target[0].value.length > 0 ?
        ev.target[0].value : userDetails.name,
      description: ev.target[1].value.length > 0 ?
        ev.target[1].value : userDetails.description,
      education: Object.keys(education).length > 0 ?
        education : userDetails.education,
      phone: ev.target[3].value.length > 0 ?
        ev.target[3].value : userDetails.phone,
    };

    addUserDetails(updateInfo).then((response)=> {
      alert('Details updated');
      updateUserDetails();
    });
  };

  return (
    <div className={'formWrapper'}>
      <HeaderNav />
      <form className={'authBody'} onSubmit={onUpdateInfo}>
        <h3>Profile</h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            defaultValue={userDetails.name}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={3}
            className="form-control"
            placeholder="Enter something about you"
            defaultValue={userDetails.description}
          />
        </div>

        <div className="form-group">
          <label>Education</label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Enter you education
            in this format: education_type: institution_name
            separated by commas"
          />
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <input
            type="text"
            className="form-control"
            maxLength='10'
            minLength='10'
            placeholder="Enter phone number"
            defaultValue={userDetails.phone}
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">
          Update
        </button>
      </form>
    </div>
  );
};

