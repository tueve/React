import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'antd';

import { makeSelectUserInfo } from '../../containers/App/selectors';
import { logout } from '../../containers/App/actions';

const AuthButton = ({ history, ...props }) => props.userInfo ? <p>
                                                Welcome {props.userInfo._profile.name}
                                                <Button
                                                  onClick={() => {
                                                    this.props.onLogout();
                                                    history.push('/');
                                                  }}
                                                >
                                                  Sign out
                                                </Button>
                                              </p> :
                                              <Link to="/login">
                                                <Button >Login</Button>
                                              </Link>

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(withConnect)(AuthButton));
