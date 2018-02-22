import React from 'react';
import styled from 'styled-components';
import SocialLogin from 'react-social-login';

const SocialButton = styled.button`
  box-sizing: border-box;
  position: relative;
  width: 13em;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }
`;

const Button = ({ children, triggerLogin, ...props }) => (
  <SocialButton onClick={triggerLogin} {...props}>
    { children }
  </SocialButton>
);

export default SocialLogin(Button);
