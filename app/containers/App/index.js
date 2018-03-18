/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import TodoAppPage from 'containers/TodoAppPage/Loadable';
import GithubDashboard from 'containers/GithubDashboardPage';
import NpmTrendDashBoard from 'containers/NPMDashBoard';
import NPMDetailPage from 'containers/NPMDetailPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/features" component={FeaturePage} /> */}
        <PrivateRoute path="/features" exact component={FeaturePage} />
        <Route path="/features/todo" component={TodoAppPage} />
        <Route exact path="/features/github-dashboard" component={GithubDashboard} />
        <Route path="/features/npm-trend-dashboard" component={NpmTrendDashBoard} />
        {/* <Route path="/features/npm-trend-dashboard/compare" component={TodoAppPage} /> */}
        <Route path="/npm-detail-page" component={NPMDetailPage} />
        <Route path="/login" component={Login} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
