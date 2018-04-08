/** @format */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import InputField from './InputField';
import { Button } from 'reactstrap';

const ConfigWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const TodoConfigOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const TodoHeader = styled.div`
  border-bottom: 1px solid black;
  font-size: 16px;
  font-weight: bold;
`;

const TodoConfigWrapper = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50%;
  z-index: 2;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TodoLabel = styled.span`
  margin: 5px 0;
  display: block;
  font-size: 14px;
`;

const TodoContent = styled.div`
  display: block;
`;

const TodoClose = styled.span`
  position: absolute;
  color: white;
  font-size: 2rem;
  top: -25px;
  right: -25px;

  &:hover {
    cursor: pointer;
  }
`;

class TodoConfig extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  componentWillMount() {
    this.setState({
      name: this.props.todo.name || '',
      description: this.props.todo.description || '',
    });
  }

  onChangeName = name => this.setState({ name });
  onChangeDescription = description => this.setState({ description });
  onAdder = () =>
    this.props.onAdder({
      name: this.state.name,
      description: this.state.description,
      id: this.props.todo.id || false,
    });

  render() {
    return (
      <ConfigWrapper>
        <TodoConfigOverlay onClick={() => this.props.onClose()} />
        <TodoConfigWrapper>
          <TodoHeader>TODO CONFIG</TodoHeader>
          <TodoContent>
            <div className="row">
              <div className="col-12">
                <TodoLabel>Todo Title</TodoLabel>
                <InputField
                  onChangeHandle={this.onChangeName}
                  value={this.state.name}
                />
              </div>
              <div className="col-12 mb-3">
                <TodoLabel>Todo description</TodoLabel>
                <InputField
                  onChangeHandle={this.onChangeDescription}
                  value={this.state.description}
                />
              </div>
              <div className="col-12">
                <Button
                  onClick={() =>
                    this.state.name &&
                    this.state.description &&
                    this.onAdder() &&
                    this.props.onClose()
                  }
                >
                  ADD
                </Button>
              </div>
            </div>
          </TodoContent>
          <TodoClose onClick={() => this.props.onClose()}>x</TodoClose>
        </TodoConfigWrapper>
      </ConfigWrapper>
    );
  }
}

TodoConfig.propTypes = {
  onClose: PropTypes.func,
  onAdder: PropTypes.func,
};

export default TodoConfig;
