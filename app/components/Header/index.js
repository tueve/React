import React from 'react';
import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';

import { makeSelectUserInfo } from '../../containers/App/selectors';
import { logout } from '../../containers/App/actions';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Feature from '../../containers/FeaturePage';

import Banner from './banner.png';
import messages from './messages';
import Login from '../../containers/Login';
import PrivateRoute from '../PrivateRoute';
import AuthButton from '../AuthButton';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      googleKey: Math.random(),
      facebookKey: Math.random(),
    };
  }
  logoutHandle = () => this.props.onLogout();
  onLoginFailure = () => {
    this.setState({
      googleKey: Math.random(),
      facebookKey: Math.random(),
    });
  }
  render() {
    return (
      <div>
        <A href="https://twitter.com/tue_vu71">
          {/* <Img src={Banner} alt="react-boilerplate - Logo" /> */}
        </A>
        <NavBar>
          <HeaderLink to="/">
            Home
          </HeaderLink>
          <HeaderLink to="/features">
            Features
          </HeaderLink>
          <AuthButton />
        </NavBar>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Header);
