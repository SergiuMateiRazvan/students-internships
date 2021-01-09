import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Sort.css';
import Select from 'react-select';

const sortOptions = [
  {value: 'title', label: 'Title'},
  {value: 'start_date', label: 'Date'},
  {value: 'location', label: 'Location'},
];

export const Sort = ({onSort}) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('ascending');

  useEffect(() => {
    onSort(sortField, sortDirection);
  }, [sortField, sortDirection]);

  return (
    <div className={'sortDiv'}>
      <span className={'sortTitle'}>Sort By</span>
      <Select options={sortOptions} onChange={(v) => setSortField(v.value)} />
      <div className={'sortDirection'}>
        <div>
          <input
            type={'radio'}
            name={'sortDirection'}
            value={'ascending'}
            id={'sort-direction-ascending'}
            defaultChecked={true}
            onChange={(e) => setSortDirection(e.target.value)}
          />
          <label htmlFor={'sort-direction-ascending'}>
        Ascending
          </label>
        </div>
        <div>
          <input
            type={'radio'}
            name={'sortDirection'}
            value={'descending'}
            id={'sort-direction-descending'}
            onChange={(e) => setSortDirection(e.target.value)}
          />
          <label htmlFor={'sort-direction-descending'}>
        Descending
          </label>
        </div>
      </div>
    </div>
  );
};

Sort.propTypes = {
  onSort: PropTypes.func,
};
