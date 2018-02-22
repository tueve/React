/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectError } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import
  {
    makeSelectPackageInput,
    makeSelectAutoCompleteResult,
    makeSelectPackageList,
    makeSelectLoading,
    makeSelectPackageInfo,
  } from './selectors';
import {
  getInputPackage,
  removeAutocompletePackage,
  addPackage,
  removePackage,
  clearPackageInfo,
  filterPackageInfo,
  selectPackage,
 } from './action';
import reducer from './reducers';
import saga from './saga';
import dataConvert from './dataConvert';

import NPMCompare from './NPMChart/NPMCompare';
import SearchComponent from './NPMAutocomplete/SearchComp';
import CompareList from './NPMCompareList/CompareList';
import NPMFilter from './NPMFilter';
import NPMDetail from './NPMDetail';
// import NPMCompare from './NPMCompare';

export class NPMDashBoard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'line',
      defaultDuration: '6',
    };
  }

  componentDidMount() {
    const { location: { hash } } = this.props;
    if (hash) {
      this.props.selectPackage(hash.replace('#', ''));
    }
  }

  componentWillUnmount() {
    this.props.clearPackageInfo();
  }

  onChangeHandle = (evt) => {
    this.props.onGetInputPackage(evt.target.value);
    this.props.onSearchPackage();
  };

  onHandleUrl = (packageItem, nameQuery) => {
    const { match, location } = this.props;
    const packageSearch = location.search.replace('?compareList=', '').split('/').filter(Boolean);
    const newPackage = packageSearch.find((item) => item === packageItem) ?
                        packageSearch.filter((item) => item !== packageItem) :
                        [...packageSearch, packageItem];

    const newUrl = { pathname: `${match.path}`, search: `compareList=${newPackage.join('/')}` };

    this.props.onChangeUrl(newUrl);
  }

  onAddHandle = (packageItem) => {
    this.props.selectPackage(packageItem);
    this.props.onAddPackage(packageItem);
  }

  onChangeChartType = (type) => {
    this.setState({ chartType: type });
  }

  onFilterHandle = (filter) => {
    this.props.onFilter(filter);
    this.props.selectPackage(this.props.data.name);
  }

  onRemoveHandle = (packageItem) => {
    this.props.onRemovePackage(packageItem);
    this.onHandleUrl(packageItem);
  }

  getDataSetOnMount = () => {
    const { location: { search: searchList }, onAddPackage } = this.props;
    const packageList = searchList.replace('?compareList=', '').split('/');
    this.props.clearPackageInfo();
    packageList.filter(Boolean).map((packageItem) => onAddPackage(packageItem));
  }

  render() {
    const { compareList, loading, data } = this.props;
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
              onAddPackage={this.onAddHandle}
              onGetInfo={this.props.selectPackage}
            />
          </div>
          {
            data.name &&
            <div className="col-12">
              <NPMFilter
                filterHandle={this.onFilterHandle}
                changeChartTypeHandle={this.onChangeChartType}
                defaultDuration={this.state.defaultDuration}
                defaultChartype={this.state.chartType}
              />
            </div>
          }
          {
            compareList.length !== 0 &&
            <div className="col-12">
              <CompareList
                compareList={compareList}
                onRemovePackage={this.onRemoveHandle}
              />
            </div>
          }
          {
            !loading && data.name &&
            <div className="col-12">
              <NPMCompare
                compareData={[data]}
                filter={data.filter}
                type={this.state.chartType}
              />
              <NPMDetail
                {...dataConvert([data])}
                onAddPackage={this.props.onAddPackage}
              />
            </div>
          }
          { loading && <div className="row col-12 justify-content-center"><Spin size="large" className="m-5 p-5" /></div> }
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
  data: makeSelectPackageInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  onGetInputPackage: (input) => dispatch(getInputPackage(input)),
  onSearchPackage: () => dispatch(loadRepos()),
  removeAutocompletePackage: () => dispatch(removeAutocompletePackage()),
  onAddPackage: (packageItem) => dispatch(addPackage(packageItem)),
  onRemovePackage: (packageItem) => dispatch(removePackage(packageItem)),
  onChangeUrl: (url) => dispatch(push(url)),
  clearPackageInfo: () => dispatch(clearPackageInfo()),
  onFilter: (filter) => dispatch(filterPackageInfo(filter)),
  selectPackage: (packageName) => dispatch(selectPackage(packageName)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'npm-dashboard', reducer });
const withSaga = injectSaga({ key: 'npm-dashboard', saga });

NPMDashBoard.propTypes = {
  location: PropTypes.object.isRequired,
  onAddPackage: PropTypes.func.isRequired,
  onGetInputPackage: PropTypes.func.isRequired,
  onSearchPackage: PropTypes.func.isRequired,
  removeAutocompletePackage: PropTypes.func.isRequired,
  onRemovePackage: PropTypes.func.isRequired,
  onChangeUrl: PropTypes.func.isRequired,
  clearPackageInfo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  compareList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NPMDashBoard);
