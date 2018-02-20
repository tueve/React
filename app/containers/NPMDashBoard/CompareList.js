import React from 'react';
import Utils from '../../utils/utils';

import CompareItem from './CompareItem';

const CompareList = ({compareList, onRemovePackage}) => (
  <div className="container mt-4">
    <span>Compare list: </span>
    {
      compareList.length && compareList.map((item) =>
        (<CompareItem
          key={Utils.getRandomId()}
          name={item}
          onRemovePackage={onRemovePackage}
        />)
      )
    }
  </div>
);

export default CompareList;

