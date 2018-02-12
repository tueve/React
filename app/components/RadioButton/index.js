import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  margin: 0 10px;
`;

const RadioButton = ({ value, selectedOption, onChangeHandle }) => (
  <RadioWrapper>
    <label>
      <input
        type="radio"
        value={value}
        checked={selectedOption === value}
        onChange={onChangeHandle}
      />
      {value}
    </label>
  </RadioWrapper>
);

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
};

export default RadioButton;
