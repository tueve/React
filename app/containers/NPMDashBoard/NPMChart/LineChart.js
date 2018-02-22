import React from 'react';
import { chartOption } from './chartOption';
import { Bar, Line } from 'react-chartjs-2';
import getDataChart from './chartDataConvert';

const LineExample = ({ compareData, filter, type }) => (
      <div className="col-12">
        { type === 'line' &&
          <Line data={getDataChart(compareData, filter, type)} />}
        { type === 'bar' &&
          <Bar
            data={getDataChart(compareData, filter, type)}
          />}
      </div>
    );
export default LineExample;

