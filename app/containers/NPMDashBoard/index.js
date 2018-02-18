/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectPackageInput, makeSelectAutoCompleteResult, makeSelectPackageList } from './selectors';
import { getInputPackage, removeAutocompletePackage, addPackage, removePackage } from './action';
import reducer from './reducers';
import saga from './saga';

import InputItem from './InputItem';
import DropdownAutocomplete from './DropdownAutocomplete';
import SearchComponent from './SearchComp';
import CompareList from './CompareList';

export class NPMDashBoard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onChangeHandle = (evt) => {
    this.props.onGetInputPackage(evt.target.value);
    this.props.onSearchPackage();
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet>
          <title>NPM Trends Page</title>
          <meta name="description" content="NPM trend to compare and get information of npm package" />
        </Helmet>
        <div className="col-12">
          <h2>NPM DASHBOARD</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <SearchComponent
              onChangeHandle={this.onChangeHandle}
              removeAutocompletePackage={this.props.removeAutocompletePackage}
              autoCompleteResult={this.props.autoCompleteResult}
              onAddPackage={this.props.onAddPackage}
            />
          </div>
          <div className="col-12">
            <CompareList
              compareList={this.props.compareList}
              onRemovePackage={this.props.onRemovePackage}
            />
          </div>
          <div className="col-12">
            <Link
              to={
              {
                pathname: `${match.url}/compare`,
              }
              }
            >Compare </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  packageInput: makeSelectPackageInput(),
  autoCompleteResult: makeSelectAutoCompleteResult(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
  compareList: makeSelectPackageList(),
});

const mapDispatchToProps = (dispatch) => ({
  onGetInputPackage: (input) => dispatch(getInputPackage(input)),
  onSearchPackage: () => dispatch(loadRepos()),
  removeAutocompletePackage: () => dispatch(removeAutocompletePackage()),
  onAddPackage: (packageItem) => dispatch(addPackage(packageItem)),
  onRemovePackage: (packageItem) => dispatch(removePackage(packageItem)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'npm-dashboard', reducer });
const withSaga = injectSaga({ key: 'npm-dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NPMDashBoard);
