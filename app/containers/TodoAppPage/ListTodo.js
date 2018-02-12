import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const ListWrapper = styled.div`
  font-family: Georgia, Times, 'Times New Roman', serif;
  display: flex;
  flex-wrap: wrap;
`;

const List = ({ listTodo = [], onAction, onEditHandle }) => (
  <ListWrapper>
    {
      listTodo.sort((todoA, todoB) => todoA.id > todoB.id).map(
        (item) =>
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            status={item.status}
            onAction={onAction}
            onEdit={onEditHandle}
          />)
    }
  </ListWrapper>
);

List.propTypes = {
  listTodo: PropTypes.array,
  onAction: PropTypes.object,
  onEditHandle: PropTypes.func,
};

export default List;
