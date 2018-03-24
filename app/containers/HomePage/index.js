/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';

const HomePage = () => (
  <article>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="A React.js Boilerplate application homepage" />
    </Helmet>
    <div>
      <h1>HOME PAGE</h1>
    </div>
  </article>);

export default HomePage;
