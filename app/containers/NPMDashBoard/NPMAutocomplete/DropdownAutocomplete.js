import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import AutoCompleteItem from './AutoCompleteItem';

const DropdownWrapper = styled.div`
  position: absolute;
  background-color: white;
  z-index: 2;
  width: 100%;
`;

const DropdownBox = ({ listItem, onAddPackage, removeAutocompletePackage, onGetInfo, getLink, toggleDetail }) => (
  <div className="col-12">
    <div className="position-relative">
      <DropdownWrapper
        className="flex-column pb-2 border border-top-0 border-dark"
      >
        {
          listItem.map((item) =>
            (<AutoCompleteItem
              key                       = {item.payload.id}
              title                     = {item.text}
              description               = {_.truncate(item.payload.description, { length: 150 })}
              onAddPackage              = {onAddPackage}
              removeAutocompletePackage = {removeAutocompletePackage}
              onGetInfo                 = {onGetInfo}
              getLink                   = {getLink}
              toggleDetail              = {toggleDetail}
            />)
            )
        }
      </DropdownWrapper>
    </div>
  </div>
);

export default DropdownBox;

