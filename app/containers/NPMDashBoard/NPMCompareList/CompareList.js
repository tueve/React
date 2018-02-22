import React from 'react';
import Utils from '../../../utils/utils';

import CompareItem from './CompareItem';

const CompareList = ({ compareList, onRemovePackage }) => (
  <div className="col-12 mt-4">
    {
      compareList.length && compareList.map((item) =>
        (<CompareItem
          key={Utils.getRandomId()}
          name={item.name}
          color={item.color}
          onRemovePackage={onRemovePackage}
        />)
      )
    }
  </div>
);

export default CompareList;

