/**
 * /*
 * FeaturePage
 *
 * List all the features
 *
 * @format
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactHtmlParser from 'react-html-parser';
import { makeSelectError } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Spin, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { unnest, path, has } from 'lodash/fp';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import {
	makeSelectPackageInput,
	makeSelectAutoCompleteResult,
	makeSelectPackageList,
	makeSelectLoading,
	makeSelectCompareMode,
	makeSelectTimeDuration,
	makeSelectReadme,
	packageViewer
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
	toggleDetailMode,
	setCurrentPackage
} from './action';
import reducer from './reducers';
import saga from './saga';
import dataConvert from './dataConvert';

import NPMChart from './NPMChart';
import SearchComponent from './NPMAutocomplete/SearchComp';
import CompareList from './NPMCompareList/CompareList';
import NPMFilter from './NPMFilter';
import NPMDetail from './NPMDetail';
import NPMCompare from './NPMCompare';

const ReadMe = styled.div`
	margin-top: 10px;

	h1 {
		font-size: 1.6rem;
		font-weight: 600;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	h3 {
		font-size: 1.4rem;
		font-weight: 500;
	}
`;

export class NPMDashBoard extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			chartType: 'line',
			defaultDuration: '6'
		};
	}

	componentDidMount() {
		const { location: { hash, search } } = this.props;
		if (search) {
			if (!hash) {
				this.props.selectPackage(
					search.replace('?', '')
				);
				this.props.setCurrentPackage(
					search.replace('?', '')
				);
			} else {
				this.props.toggleCompare();
				search
					.replace('?', '')
					.split('&')
					.map((item) => this.onAddHandle(item));
			}
		}
	}

	componentWillUnmount() {
		this.props.clearPackageInfo();
	}

	onChangeHandle = (evt) => {
		this.props.onGetInputPackage(evt.target.value);
		this.props.onSearchPackage();
	};

	onHandleUrl = (packageItem) => {
		const { match, location: { search } } = this.props;
		if (this.props.compareMode) {
			const newCompareList = search
				.replace('?', '')
				.split('&')
				.filter((item) => item !== packageItem);
			const newUrl = {
				pathname: `${match.path}`,
				search: `${newCompareList.join('&')}`,
				hash: '#compare'
			};
			this.props.onChangeUrl(newUrl);
		}
	};

	onAddHandle = (packageItem) => {
		this.props.onAddPackage(packageItem);
		this.getInfo(packageItem);
	};

	onChangeChartType = (type) => {
		this.setState({ chartType: type });
	};

	onFilterHandle = (filter) => {
		const { location: { hash, search } } = this.props;
		this.props.onFilter(filter);
	};

	onRemoveHandle = (packageItem) => {
		this.props.onRemovePackage(packageItem);
		this.onHandleUrl(packageItem);
	};

	getDataSetOnMount = () => {
		const {
			location: { search: searchList },
			onAddPackage
		} = this.props;
		const packageList = searchList
			.replace('?compareList=', '')
			.split('/');
		this.props.clearPackageInfo();
		packageList
			.filter(Boolean)
			.map((packageItem) =>
				onAddPackage(packageItem)
			);
	};

	checkPackageInCompareList = (
		packageItem,
		compareList
	) => {
		if (compareList.length === 0) return;
		const getPackage = compareList.find(
			(item) => item.name === packageItem
		);
		return has('downloadInfo')(getPackage);
	};

	getInfo = (packageItem) => {
		this.props.selectPackage(packageItem);
		this.props.setCurrentPackage(packageItem);
	};

	getUrlList = (list) =>
		list.map((item) => item.name).join('&');

	getLink = (item) => ({
		search: this.props.compareMode
			? `${this.props.location.search}&${item}`
			: `?${item}`,
		hash: this.props.compareMode ? '#compare' : ''
	});

	onCompareHandle = () => {
		this.props.toggleCompare();
	};

	render() {
		const {
			compareList,
			currentPackageInfo
		} = this.props.package;
		const {
			loading,
			timeDuration,
			readme
		} = this.props;
		return (
			<div>
				<Helmet>
					<title>NPM Trends Page</title>
					<meta
						name="description"
						content="NPM trend to compare and get information of npm package"
					/>
				</Helmet>
				<div className="col-12">
					<h2>NPM DASHBOARD</h2>
				</div>
				<div className="row">
					<div className="col-12">
						<SearchComponent
							onChangeHandle={
								this.onChangeHandle
							}
							removeAutocompletePackage={
								this.props
									.removeAutocompletePackage
							}
							autoCompleteResult={
								this.props
									.autoCompleteResult
							}
							onAddPackage={this.onAddHandle}
							onGetInfo={this.getInfo}
							getLink={this.getLink}
							toggleDetail={
								this.props.toggleDetail
							}
							clearPackageInfo={
								this.props.clearPackageInfo
							}
						/>
					</div>
					{currentPackageInfo.length !== 0 && (
						<div className="col-12">
							<NPMFilter
								filterHandle={
									this.onFilterHandle
								}
								changeChartTypeHandle={
									this.onChangeChartType
								}
								defaultDuration={
									this.state
										.defaultDuration
								}
								defaultChartype={
									this.state.chartType
								}
							/>
						</div>
					)}
					{compareList.length !== 0 && (
						<div className="col-12">
							<CompareList
								compareList={compareList}
								onRemovePackage={
									this.onRemoveHandle
								}
							/>
						</div>
					)}
					{compareList.length > 1 && (
						<Link
							to={{
								search: `${this.getUrlList(
									compareList
								)}`,
								hash: '#compare'
							}}
						>
							<div className="col-12">
								<div className="col-12">
									<Button
										onClick={
											this
												.onCompareHandle
										}
									>
										COMPARE
									</Button>
								</div>
							</div>
						</Link>
					)}
					{!loading &&
					currentPackageInfo.length !== 0 && (
						<div className="col-12">
							<NPMChart
								compareData={
									!this.props
										.compareMode ? (
										currentPackageInfo
									) : (
										compareList
									)
								}
								filter={timeDuration}
								type={this.state.chartType}
							/>
						</div>
					)}
					{currentPackageInfo.length > 0 &&
					!this.props.compareMode && (
						<NPMDetail
							{...dataConvert(
								currentPackageInfo
							)}
							onAddPackage={this.onAddHandle}
						/>
					)}
					{loading && (
						<div className="row col-12 justify-content-center">
							<Spin
								size="large"
								className="m-5 p-5"
							/>
						</div>
					)}
					{!loading &&
					!this.props.compareMode && (
						<ReadMe className="row col-12 justify-content-center readme-content">
							<div className="col-12">
								{ReactHtmlParser(
									this.props.readme
								)}
							</div>
						</ReadMe>
					)}
					{/* <NPMCompare /> */}
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
	compareMode: makeSelectCompareMode(),
	timeDuration: makeSelectTimeDuration(),
	package: packageViewer(),
	packageList: makeSelectPackageList(),
	readme: makeSelectReadme()
});

const mapDispatchToProps = (dispatch) => ({
	onGetInputPackage: (input) =>
		dispatch(getInputPackage(input)),
	onSearchPackage: () => dispatch(loadRepos()),
	removeAutocompletePackage: () =>
		dispatch(removeAutocompletePackage()),
	onAddPackage: (packageItem) =>
		dispatch(addPackage(packageItem)),
	onRemovePackage: (packageItem) =>
		dispatch(removePackage(packageItem)),
	onChangeUrl: (url) => dispatch(push(url)),
	clearPackageInfo: () => dispatch(clearPackageInfo()),
	onFilter: (filter) =>
		dispatch(filterPackageInfo(filter)),
	selectPackage: (packageName) =>
		dispatch(selectPackage(packageName)),
	toggleCompare: () => dispatch(toggleCompareMode()),
	toggleDetail: () => dispatch(toggleDetailMode()),
	setCurrentPackage: (packageName) =>
		dispatch(setCurrentPackage(packageName))
});

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);
const withReducer = injectReducer({
	key: 'npm-dashboard',
	reducer
});
const withSaga = injectSaga({ key: 'npm-dashboard', saga });

export default compose(withReducer, withSaga, withConnect)(
	NPMDashBoard
);
