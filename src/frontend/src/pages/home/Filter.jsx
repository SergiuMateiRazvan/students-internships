import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Calendar from 'short-react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Filter.css';

const locationOptions = [
  {value: 'Cluj-Napoca', label: 'Cluj-Napoca'},
  {value: 'Oradea', label: 'Oradea'},
  {value: 'Piatra-Neamt', label: 'Piatra-Neamt'},
  {value: 'Brasov', label: 'Brasov'},
];

export const Filter = ({onFilter}) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    onFilter(location, date);
  }, [location, date]);

  return (
    <div className={'filterSection'}>
      <span className={'filterSectionTitle'}>Filter</span>
      <label className={'filterOptionTitle'}>Location</label>
      <Select
        options={locationOptions}
        onChange={(v) => setLocation(v.value)}
      />
      <label className={'filterOptionTitle'}>Date</label>
      <Calendar
        oneWeekCalendar={true}
        onChange={(value, ev) => {
          const selectedDate = new Date(value);
          setDate(selectedDate.toISOString().split('T')[0]);
        }}
      />
    </div>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func,
};
