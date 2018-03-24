import React, { Component } from 'react';
import { Radio, Icon } from 'antd';
import styled from 'styled-components';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FilterWrapper = styled.div`
  margin: 10px 0;
`;

const ChartWrapper = styled.div`
  @media (min-width: 690px) {
    text-align: end;
  }
`;

class NPMFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFilter: '',
      chartType: '',
    };
  }

  onChangeDuration = (evt) => {
    this.props.filterHandle(evt.target.value);
  }

  onChangeChartType = (evt) => {
    this.props.changeChartTypeHandle(evt.target.value);
  }

  render() {
    return (
      <FilterWrapper className="row">
        <div className="col-12 col-sm-9 mt-2">
          <RadioGroup onChange={this.onChangeDuration} defaultValue={this.props.defaultDuration}>
            <RadioButton value="1" >1 Month</RadioButton>
            <RadioButton value="3">3 Months</RadioButton>
            <RadioButton value="6">6 Months</RadioButton>
            <RadioButton value="12">1 Year</RadioButton>
          </RadioGroup>
        </div>
        <ChartWrapper className="col-12 col-sm-3 mt-2">
          <RadioGroup onChange={this.onChangeChartType} defaultValue={this.props.defaultChartype}>
            <RadioButton value="line" ><Icon type="area-chart" /></RadioButton>
            <RadioButton value="bar"><Icon type="bar-chart" /></RadioButton>
          </RadioGroup>
        </ChartWrapper>

      </FilterWrapper>
    )
  }

}

export default NPMFilter;
