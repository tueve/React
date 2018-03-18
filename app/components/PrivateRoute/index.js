import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUserInfo } from 'containers/App/selectors';


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
