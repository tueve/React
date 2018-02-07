import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const TodoStatus = styled.span`
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-left: auto;
`;

const TodoItemWrapper = styled.div`
  display: block;
  padding: 20px;
  border: 1px solid #00B7C2;
  color: ${(props) => props.status === 'doing' ? '#FFFDBB' : '#211572'};
  border-radius: 5px;
  background-color:
    ${(props) => {
      switch (props.status) {
        case 'todo':
          return '#FFFDBB';
        case 'doing':
          return '#211572';
        default :
          return '#A2EF44';
      }
    }};

  &:hover {
    background-color: #128494;
    color: ${(props) => !props.status === 'doing' ? '#FFFDBB' : '#211572'};
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 5px 10px 10px black;
  }
`;

const TodoHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
`;

const TodoTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  display: block;
`;

const ItemActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  padding: 15px 0;
`;

const TodoDescription = styled.div`
  padding: 15px 0;
  font-size: 1rem;
`;

const newStatus = (status) => {
  switch (status) {
    case 'todo':
      return 'doing';
    case 'doing':
      return 'done';
    default:
      return 'todo';
  }
};

const TodoItem = ({ id, name, description, status, onAction, onEdit }) => (
  <div className="col-12 col-sm-12 col-md-6 p-2">
    <TodoItemWrapper status={status}>
      <TodoHeader>
        <TodoTitle>{name}</TodoTitle>
        <TodoStatus>{status}</TodoStatus>
      </TodoHeader>
      <TodoDescription>
        {description}
      </TodoDescription>
      <ItemActionWrapper>
        <div className="row col-12">
          <div className="col-4">
            <Button color="primary" size="sm" onClick={() => onEdit({ id, name, description, status })}>Edit</Button>
          </div>
          <div className="col-4">
            <Button color="danger" size="sm" onClick={() => onAction.onDeleteTodo(id, 'delete')}>Delete</Button>
          </div>
          <div className="col-4">
            <Button color="success" size="sm" onClick={() => onAction.onHandleTodo(id, status)}>{newStatus(status)}</Button>
          </div>
        </div>
      </ItemActionWrapper>
    </TodoItemWrapper>
  </div>
);

TodoItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  onAction: PropTypes.object,
  onEdit: PropTypes.func,
};

export default TodoItem;
