import React     from 'react'            ;
import styled    from 'styled-components';
import PropTypes from 'prop-types'       ;

import InputField from './InputField';

const SearchWrapper = styled.div`
  display: block;
  margin-top: 20px;
`;

const Search = (props) => (
  <SearchWrapper>
    <InputField />
  </SearchWrapper>
);

export default Search;
