import React from 'react';
import _ from 'lodash';

import AutoCompleteItem from './AutoCompleteItem';

const DropdownBox = ({ listItem, onAddPackage, removeAutocompletePackage }) => (
  <div
    className="row flex-column m-1 pb-2 border border-top-0 border-dark"
  >
    {
      listItem.map((item) =>
        (<AutoCompleteItem
          key={item.payload.id}
          title={item.text}
          description={_.truncate(item.payload.description, { length: 150 })}
          onAddPackage={onAddPackage}
          removeAutocompletePackage={removeAutocompletePackage}
        />)
        )
    }
  </div>
);

export default DropdownBox;

