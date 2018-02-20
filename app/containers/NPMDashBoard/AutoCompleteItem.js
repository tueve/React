import React from 'react';
import styled from 'styled-components';

const AutoCompleteItemWrapper = styled.div`
  &:hover {
    background-color: #FFFDBB;
    cursor: pointer;
  }
`;

const ItemTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 10px;
`;

const ItemDescription = styled.span`
  font-size: .9rem;
  font-weight: 400;
`;

const handleClick = (onAddPackage, removeAutocompletePackage, title) => {
  onAddPackage(title);
  removeAutocompletePackage();
};

const AutoCompleteItem = ({ title, description, onAddPackage, removeAutocompletePackage }) => (
  <div>
    <AutoCompleteItemWrapper className="col-12 pl-2 pr-2 pt-2" onClick={() => handleClick(onAddPackage, removeAutocompletePackage, title)} >
      <ItemTitle>{ title }</ItemTitle>
      <ItemDescription>{ description }</ItemDescription>
    </AutoCompleteItemWrapper>
  </div>
);

export default AutoCompleteItem;
