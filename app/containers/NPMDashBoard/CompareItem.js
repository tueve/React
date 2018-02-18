import React from 'react';
import styled from 'styled-components';

const CompareName = styled.p`
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 5px;
  display: inline-block;
  background-color:#00B7C2;
  color: white;
`;

const CompareItem = ({ name, onRemovePackage }) => (
  <div className="d-inline-block mr-2">
    <CompareName>
      {name}
      <button
        className="close ml-3"
        aria-label="Close"
      >
        <span aria-hidden="true" onClick={() => onRemovePackage(name)}>&times;</span>
      </button>
    </CompareName>
  </div>
);

export default CompareItem;
