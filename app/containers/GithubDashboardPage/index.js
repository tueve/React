/*
 * FeaturePage
 *
 * List all the features
 */
import  React                     from 'react'       ;
import {Helmet                  } from 'react-helmet';
import {connect                 } from 'react-redux' ;
import {compose                 } from 'redux'       ;
import {createStructuredSelector} from 'reselect'    ;

import  injectReducer                                                      from 'utils/injectReducer'       ;
import  injectSaga                                                         from 'utils/injectSaga'          ;
import  PropTypes                                                          from 'prop-types'                ;
import {makeSelectLoading , makeSelectError}                               from 'containers/App/selectors'  ;
import {loadRepos         }                                                from '../App/actions'            ;
import {changeCategory    }                                                from './actions'                 ;
import {makeSelectCategory, makeSelectSelectedCategory, makeSelectGitData} from './selectors'               ;
import  reducer                                                            from './reducers'                ;
import  saga                                                               from './saga'                    ;
import  ReposList                                                          from '../../components/ReposList';
import  RepoItem                                                           from './RepoItem'                ;
import  LanguageBar                                                        from './LanguageBar'             ;

export class GithubApp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetData();
  }

  selectLanguageHandle = (category) => {
    this.props.onChangeCategory(category);
    this.props.onGetData();
  }

  render() {
    const GetListItem = ReposList(RepoItem);
    const { error, loading, data: { items: repos } } = this.props;

    const repoListProps = { error, loading, repos };

    return (
      <div>
        <Helmet>
          <title>Feature Page</title>
          <meta name="description" content="Github dashboard page" />
        </Helmet>
        <div className="col-12">
          <h2>GITHUB DASHBOARD</h2>
        </div>
        <div className="col-12">
          <LanguageBar
            languages        = {this.props.category}
            selectedLanguage = {this.props.selectedCategory}
            selectLanguage   = {this.selectLanguageHandle}
          />
        </div>
        <div>
          <GetListItem {...repoListProps} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeCategory: (category) => dispatch(changeCategory(category)),
  onGetData       : () => dispatch(loadRepos()),
});

const mapStateToProps = createStructuredSelector({
  data            : makeSelectGitData(),
  loading         : makeSelectLoading(),
  error           : makeSelectError(),
  category        : makeSelectCategory(),
  selectedCategory: makeSelectSelectedCategory(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'github-dashboard', reducer });
const withSaga    = injectSaga({ key: 'github-dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GithubApp);
