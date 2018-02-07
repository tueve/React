import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RadioBtn from '../../components/RadioButton';

const FilterWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: base-line;
`;

const FilterLabel = styled.h5`
  font-size: 1rem;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'All',
    };
  }

  onSelectFilter = (changeEvt) => {
    this.setState({ selectedOption: changeEvt.target.value }, () => {
      this.props.onChangeHandle(this.state.selectedOption);
    });
  }

  render() {
    return (
      <FilterWrapper>
        <FilterLabel>Filter</FilterLabel>
        <RadioBtn
          value="ALL"
          selectedOption={this.state.selectedOption}
          onChangeHandle={this.onSelectFilter}
        />
        <RadioBtn
          value="TODO"
          selectedOption={this.state.selectedOption}
          onChangeHandle={this.onSelectFilter}
        />
        <RadioBtn
          value="DOING"
          selectedOption={this.state.selectedOption}
          onChangeHandle={this.onSelectFilter}
        />
        <RadioBtn
          value="DONE"
          selectedOption={this.state.selectedOption}
          onChangeHandle={this.onSelectFilter}
        />
      </FilterWrapper>
    );
  }
}

Filter.propTypes = {
  onChangeHandle: PropTypes.func.isRequired,
}

export default Filter;
