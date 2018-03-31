import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

const CompareName = styled.p`
  border          : 1px solid black;
  border-radius   : 5px;
  padding         : 0 5px;
  display         : inline-block;
  background-color: ${(props) => props.color};
  color           : white;
`;

const IconWrapper = styled(Icon)`
  display: inline-block;
  margin: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const CompareItem = ({ name, onRemovePackage, color }) => (
  <div className="d-inline-block mr-2">
    <CompareName color={color}>
      {name}
      <IconWrapper
        type="close"
        style={
        { fontSize: 16,
          color: '#fff',
        }}
        onClick={() => onRemovePackage(name)}
      />
    </CompareName>
  </div>
);

export default CompareItem;
