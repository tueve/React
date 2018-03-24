/*
 * FeaturePage
 *
 * List all the features
 */
import  React                             from 'react'                   ;
import {Helmet                  }         from 'react-helmet'            ;
import {connect                 }         from 'react-redux'             ;
import {compose                 }         from 'redux'                   ;
import {makeSelectError         }         from 'containers/App/selectors';
import {createStructuredSelector}         from 'reselect'                ;
import {Link                    }         from 'react-router-dom'        ;
import {push                    }         from 'react-router-redux'      ;
import {Spin                    , Button} from 'antd'                    ;
import  PropTypes                         from 'prop-types'              ;

import  injectReducer  from 'utils/injectReducer';
import  injectSaga     from 'utils/injectSaga'   ;
import {loadRepos    } from '../App/actions'     ;
import
  {
    makeSelectPackageInput,
    makeSelectAutoCompleteResult,
    makeSelectPackageList,
    makeSelectLoading,
    makeSelectPackageInfo,
    makeSelectCompareMode,
  } from './selectors';
import {
  getInputPackage,
  removeAutocompletePackage,
  addPackage,
  removePackage,
  clearPackageInfo,
  filterPackageInfo,
  selectPackage,
  toggleCompareMode,
 } from './action';
import reducer     from './reducers'   ;
import saga        from './saga'       ;
import dataConvert from './dataConvert';

import NPMCompare      from './NPMChart/NPMCompare'       ;
import SearchComponent from './NPMAutocomplete/SearchComp';
import CompareList     from './NPMCompareList/CompareList';
import NPMFilter       from './NPMFilter'                 ;
import NPMDetail       from './NPMDetail'                 ;
// import NPMCompare from './NPMCompare';

export class NPMDashBoard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      chartType      : 'line',
      defaultDuration: '6'   ,
      mode           : ''    ,
      data           : []    ,
    };
  }

  componentDidMount() {
    const { location: { hash, search } } = this.props;
    if (search) {
      if(!hash) {
        this.props.selectPackage(search.replace('?', ''))
      } else {
        this.props.toggleCompare();
        search.replace('?', '').split('&').map(item => this.onAddHandle(item));
      }
    }
  }

  componentWillUnmount() {
    this.props.clearPackageInfo();
  }

  onChangeHandle = (evt) => {
    console.log(evt.target.value, 'value');
    this.props.onGetInputPackage(evt.target.value);
    this.props.onSearchPackage();
  };

  onHandleUrl = (packageItem) => {
    const { match, location: { search } } = this.props;
    if (this.props.compareMode) {
      const newCompareList = search.replace('?', '').split('&').filter(item => item !== packageItem);
      const newUrl         = { pathname: `${match.path}`, search: `${newCompareList.join('&')}`, hash: '#compare' };
      this.props.onChangeUrl(newUrl);
    }
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

  getUrlList = (list) => list.map((item) => item.name).join('&');

  getLink = (item) => ({
    search: this.props.compareMode ? `${this.props.location.search}&${item}` : `?${item}`,
    hash  : this.props.compareMode ? '#compare' : '',
  })

  onCompareHandle = () => {
    this.props.toggleCompare();
  }

  render() {
    const { compareList, loading, data } = this.props;
    console.log(this.props, 'props');
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
              onChangeHandle            = {this.onChangeHandle}
              removeAutocompletePackage = {this.props.removeAutocompletePackage}
              autoCompleteResult        = {this.props.autoCompleteResult}
              onAddPackage              = {this.onAddHandle}
              onGetInfo                 = {this.props.selectPackage}
              getLink                   = {this.getLink}
            />
          </div>
          {
            data.name &&
            <div className="col-12">
              <NPMFilter
                filterHandle          = {this.onFilterHandle}
                changeChartTypeHandle = {this.onChangeChartType}
                defaultDuration       = {this.state.defaultDuration}
                defaultChartype       = {this.state.chartType}
              />
            </div>
          }
          {
            compareList.length !== 0 &&
            <div className="col-12">
              <CompareList
                compareList     = {compareList}
                onRemovePackage = {this.onRemoveHandle}
              />
            </div>
          }
          {
            compareList.length > 1 &&
            <Link
                to={{
                  search: `${this.getUrlList(compareList)}`,
                  hash  : '#compare',
                }}
              >
                <div className="col-12">
                  <Button onClick={this.onCompareHandle} className="col-12">COMPARE</Button>
                </div>
              </Link>
          }
          {
            !loading && data.name &&
            <div className="col-12">
              <NPMCompare
                compareData = {!this.props.compareMode ? [data] : compareList}
                filter      = {data.filter}
                type        = {this.state.chartType}
              />
              <NPMDetail
                {...dataConvert([data])}
                onAddPackage={this.props.onAddPackage}
              />
            </div>
          }
          {
            loading &&
            <div
              className="row col-12 justify-content-center"
            >
              <Spin size="large" className="m-5 p-5" />
            </div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  packageInput      : makeSelectPackageInput(),
  autoCompleteResult: makeSelectAutoCompleteResult(),
  error             : makeSelectError(),
  loading           : makeSelectLoading(),
  compareList       : makeSelectPackageList(),
  data              : makeSelectPackageInfo(),
  compareMode       : makeSelectCompareMode(),
});

const mapDispatchToProps = (dispatch) => ({
  onGetInputPackage        : (input) => dispatch(getInputPackage(input)),
  onSearchPackage          : () => dispatch(loadRepos()),
  removeAutocompletePackage: () => dispatch(removeAutocompletePackage()),
  onAddPackage             : (packageItem) => dispatch(addPackage(packageItem)),
  onRemovePackage          : (packageItem) => dispatch(removePackage(packageItem)),
  onChangeUrl              : (url) => dispatch(push(url)),
  clearPackageInfo         : () => dispatch(clearPackageInfo()),
  onFilter                 : (filter) => dispatch(filterPackageInfo(filter)),
  selectPackage            : (packageName) => dispatch(selectPackage(packageName)),
  toggleCompare            : () => dispatch(toggleCompareMode()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'npm-dashboard', reducer });
const withSaga    = injectSaga({ key: 'npm-dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NPMDashBoard);
