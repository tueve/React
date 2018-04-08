/** @format */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RadioBtn from '../../components/RadioButton';

const FilterWrapper = styled.div`
  display       : flex;
  margin-top    : 20px;
  flex-direction: row;
  align-items   : base-line;
`;

const FilterLabel = styled.h5`
  font-size: 1rem;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'ALL',
      status        : ['ALL', 'TODO', 'DOING', 'DONE'],
    };
  }

  onSelectFilter = changeEvt => {
    this.setState({ selectedOption: changeEvt }, () => {
      this.props.onChangeHandle(this.state.selectedOption);
    });
  };

  render() {
    return (
      <FilterWrapper>
        <FilterLabel>Filter</FilterLabel>
        {this.state.status.map(item => (
          <RadioBtn
            value          = {item}
            key            = {item}
            selectedOption = {this.state.selectedOption}
            onChangeHandle = {this.onSelectFilter}
          />
        ))}
      </FilterWrapper>
    );
  }
}

Filter.propTypes = {
  onChangeHandle: PropTypes.func.isRequired,
};

export default Filter;
