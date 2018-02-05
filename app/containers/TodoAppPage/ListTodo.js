import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  font-family: Georgia, Times, 'Times New Roman', serif;
  display: flex;
  flex-wrap: wrap;
`;

const List = ({ listTodo = [], onAction }) => (
  <ListWrapper>
    {
      listTodo.sort((todoA, todoB) => todoA.id > todoB.id).map(
        (item) =>
          <ListItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            status={item.status}
            onAction={onAction}
          />)
    }
  </ListWrapper>
);

List.propTypes = {
  listTodo: PropTypes.array,
};

export default List;
