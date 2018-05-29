/** @format */

import React, { PureComponent } from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';

const CompareItemWrapper = styled.div`
  border: 1px solid black;
  text-align: center;
`;

const CompareItemHeader = styled.div`
  padding: 15px;
  posistion: relative;
`;

const CompareItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
`;

const CompareItemScore = styled.div`
  position: absolute;
`;

const CompareItemBody = styled.div``;

const CompareItemDetail = styled.div`
  border-top: 1px solid black;
  padding: 15px;
`;

const CompareItem = () => (
  <CompareItemWrapper>
  </CompareItemWrapper>
);

export default CompareItem;
