import   React    , { Component } from 'react'            ;
import   styled                   from 'styled-components';
import   PropTypes                from 'prop-types'       ;
import { Radio     }              from 'antd'             ;

const RadioButton = Radio.Button;
const RadioGroup  = Radio.Group ;

const FilterWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: base-line;
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'ALL',
    };
  }

  onSelectFilter = (changeEvt) => {
    this.setState({ selectedOption: changeEvt.target.value },
      () => this.props.onChangeHandle(this.state.selectedOption)
    );
  }

  render() {
    return (
      <FilterWrapper>
        <RadioGroup onChange={this.onSelectFilter} defaultValue={this.state.selectedOption}>
          <RadioButton value="ALL"  >ALL  </RadioButton>
          <RadioButton value="TODO" >TODO </RadioButton>
          <RadioButton value="DOING">DOING</RadioButton>
          <RadioButton value="DONE" >DONE </RadioButton>
        </RadioGroup>
      </FilterWrapper>
    );
  }
}

Filter.propTypes = {
  onChangeHandle: PropTypes.func.isRequired,
}

export default Filter;
