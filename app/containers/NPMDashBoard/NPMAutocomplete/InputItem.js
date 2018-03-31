import React, { Component } from 'react';

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  onChangeHandle = (evt) => {
    const { onChangeHandle, hasInput } = this.props;
    this.setState({ inputText: evt.target.value }, onChangeHandle(evt));

  };

  componentWillReceiveProps(nextProps) {
    !this.props.hasInput && this.setState({ inputText: '' });
  }

  render() {
    return (
      <div className="col-12">
        <input
          className   = "form-control"
          value       = {this.state.inputText}
          placeholder = "input npm package"
          onChange    = {(evt) => this.onChangeHandle(evt)}
          onFocus     = {(evt) => this.onChangeHandle(evt)}
        />
      </div>
    );
  }
}

export default InputComponent;
