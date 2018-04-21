/** @format */

import React, { Component } from 'react';
import LineChart from './LineChart';

const NPMChart = ({ compareData, filter, type }) => (
  <div className="col-12 mt-3">
    <h4>DOWNLOADING COUNT CHART</h4>
    <LineChart compareData={compareData} filter={filter} type={type} />
  </div>
);

export default NPMChart;
