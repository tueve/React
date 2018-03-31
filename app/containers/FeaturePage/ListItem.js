import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListItem = styled(Link)`
  margin : 1em 0;
  border : 1px solid #bc3;
  padding: 20px;

  &:hover {
    background-color: #6cc0e5;
    cursor          : pointer;
    color           : white;
  }
`;

export default ListItem;
