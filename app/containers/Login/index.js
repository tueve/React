import React, { Component } from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';
import { Redirect } from 'react-router-dom';

import { Button } from 'antd';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SocialButton from '../../components/SocialButton';

import {
  login,
  logout,
} from '../App/actions';

import {
  makeSelectUserInfo,
} from '../App/selectors';

const SocialButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoogleLogin = styled(SocialButton)`
  background: #DD4B39;

  &:before {
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  }

  &:hover,
  &:focus {
    background: #E74B37;
    background-image: linear-gradient(#E74B37, #F94B3F);
  }
`;

const FacebookLogin = styled(SocialButton)`
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;

  &:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }

  &:hover,
  &:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }
`;

const onLogError = (error) => console.log(error);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleKey: Math.random(),
      facebookKey: Math.random(),
      redirectToReferrer: false,
    };
  }

  onLoginFailure = () => {
    this.setState({
      googleKey: Math.random(),
      facebookKey: Math.random(),
    });
  }

  onLoginSuccessHandle = (userInfo) => {
    this.props.onLogin(userInfo);
    this.setState({ redirectToReferrer: true }, () => console.log(this.state.redirectToReferrer, 'redirect'));
    console.log('after login')
  }

  onLogoutHandle = () => {
    this.props.onLogout();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (<Redirect to={{ pathname: from.pathname }} />);
    }

    return (
      <div className="row justify-content-center">
        <SocialButtonWrapper>
          <GoogleLogin
            provider='google'
            appId='434517084355-n3vl428kgf62o8vvqf5ohkss5u44h35b.apps.googleusercontent.com'
            onLoginSuccess={this.onLoginSuccessHandle}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.props.onLogoutHandle}
            key={this.state.googleKey}
          >
            Login with Google
          </GoogleLogin>

          <FacebookLogin
            provider='facebook'
            appId='2098615787049312'
            onLoginSuccess={this.onLoginSuccessHandle}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.props.onLogoutHandle}
            key={this.state.facebookKey}
          >
            Login with Facebook
          </FacebookLogin>
        </SocialButtonWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (userInfo) => dispatch(login(userInfo)),
  onLogout: () => dispatch(logout()),
});

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
