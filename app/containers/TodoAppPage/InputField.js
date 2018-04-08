/** @format */

import React     from 'react'            ;
import styled    from 'styled-components';
import PropTypes from 'prop-types'       ;

const InputWrapper = styled.div`
  border       : 1px solid black;
  border-radius: 5px;
`;

const Input = styled.input`
  width  : 100%;
  padding: 5px 15px;
  outline: none;
`;

const InputComp = props => (
  <InputWrapper>
    <Input
      type     = "text"
      onChange = {e => props.onChangeHandle(e.target.value)}
      value    = {props.value}
    />
  </InputWrapper>
);

InputComp.propTypes = {
  onChangeHandle: PropTypes.func,
};

export default InputComp;
