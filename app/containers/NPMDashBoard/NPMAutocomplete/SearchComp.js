/** @format */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import InputItem from './InputItem';
import DropdownAutocomplete from './DropdownAutocomplete';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInput: true,
    };
  }

  componentWillMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = e => {
    // this is the key part - ReactDOM.findDOMNode(this) gives you a reference
    // to your CalendarPopup component;
    // e.target is the element which was clicked upon.
    // check whether the element clicked upon is in your component - if not,
    // then call the close logic
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside your component, so handle closing here
      this.props.removeAutocompletePackage();
    }
  };

  onAddPackage = evtHandle => packageInput => {
    this.setState({ hasInput: false });
    evtHandle(packageInput);
  };

  onChangeHandle = evt => {
    this.props.onChangeHandle(evt);
    this.setState({ hasInput: true });
  };

  render() {
    const {
      removeAutocompletePackage,
      autoCompleteResult,
      hasInput,
      getLink,
      toggleDetail,
    } = this.props;
    return (
      <div>
        <InputItem
          onChangeHandle={this.onChangeHandle}
          hasInput={this.state.hasInput}
        />
        {autoCompleteResult.length > 0 && (
          <DropdownAutocomplete
            listItem={autoCompleteResult}
            onAddPackage={this.onAddPackage(this.props.onAddPackage)}
            removeAutocompletePackage={removeAutocompletePackage}
            onGetInfo={this.onAddPackage(this.props.onGetInfo)}
            getLink={getLink}
            toggleDetail={toggleDetail}
          />
        )}
      </div>
    );
  }
}

export default SearchComponent;
