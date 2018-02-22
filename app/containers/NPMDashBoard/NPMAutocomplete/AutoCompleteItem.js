import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Button } from 'antd';

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

const ActionWrapper = styled.div`
  display: none;

  ${AutoCompleteItemWrapper}:hover & {
    display: flex;
  }
`;

const ItemDescription = styled.span`
  font-size: .9rem;
  font-weight: 400;
`;

const handleAddEvt = (onAddPackage, removeAutocompletePackage, title) => {
  onAddPackage(title);
  removeAutocompletePackage();
};

const AutoCompleteItem = ({ title, description, onAddPackage, removeAutocompletePackage, onGetInfo }) => (
  <div>
    <AutoCompleteItemWrapper className="col-12 pl-2 pr-2 pt-2" >
      <ItemTitle>{ title }</ItemTitle>
      <ItemDescription>{ description }</ItemDescription>
      <ActionWrapper className="justify-content-center">
        <Link
          to={{
            hash: `#${title}`,
          }}
        >
          <Button type="primary" className="m-2" size="small" onClick={() => handleAddEvt(onGetInfo, removeAutocompletePackage, title)} >
            Get package info<Icon type="right" />
          </Button>
        </Link>
        <Button
          type="primary"
          className="m-2"
          size="small"
          onClick={() => handleAddEvt(onAddPackage, removeAutocompletePackage, title)}
        >
          Add to compare list<Icon type="right" />
        </Button>
      </ActionWrapper>
    </AutoCompleteItemWrapper>
  </div>
);

export default AutoCompleteItem;
