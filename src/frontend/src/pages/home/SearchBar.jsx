import React from 'react';
import PropTypes from 'prop-types';
import SearchField from 'react-search-field';
import './SearchBar.css';

export const SearchBar = ({onSearch}) => {
  return (
    <div className={'searchBar'}>
      <SearchField
        classNames={'searchBarInput'}
        value={''}
        placeholder={'Search internships'}
        onEnter={(text) =>onSearch(text)}
        onSearchClick={(text) =>onSearch(text)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
