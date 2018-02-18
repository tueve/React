import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 3em;
  display: flex;
  padding: 15px;
  align-items: center;
  position: relative;
  border-top: 1px solid #eee;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;
