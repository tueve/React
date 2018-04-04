import _ from 'lodash';
import { chartOption } from './chartOption';
/* eslint-disable item need to be filtered */
const filterData = (duration) => (data = []) => data.filter((item, index) => {
  let timeSkip;
  switch (duration) {
    case '1': timeSkip = 1; break;
    case '3': timeSkip = 4; break;
    case '6': timeSkip = 7; break;
    default: timeSkip = 15;
  }
  if (index % timeSkip === 0) {
    return item;
  }
});
/* eslint-enable item need to be filtered */


const getData = (key) => (data) => _.get(data, key);

const getValue = (key) => (dataSet) => dataSet.map(getData(key));

const getDataSet = (key) =>
                      (dataSet) =>
                        (duration) =>
                          _.flow(
                              getData('downloads'),
                              filterData(duration),
                              getValue(key))(dataSet);

const getDataChart = (dataSet, duration, type) => dataSet.reduce(
  (acc, item) => {
    const color = item.color;
    const downloadData = getDataSet('downloads')(item.downloadInfo)(duration);
    const labelData = getDataSet('day')(item.downloadInfo)(duration);
    return {
      labels: labelData,
      datasets: [
        ...acc.datasets,
        {
          ...chartOption,
          backgroundColor          : color,
          borderColor              : color,
          borderWidth              : 1,
          hoverBackgroundColor     : color,
          hoverBorderColor         : color,
          label                    : item.name,
          pointBorderColor         : color,
          pointHoverBackgroundColor: color,
          data                     : downloadData,
          fill                     : false,
        },
      ],
    };
  }
, {
  labels: [],
  datasets: [],
});

export default getDataChart;
