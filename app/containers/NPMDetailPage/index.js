import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class NPMDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { location } = this.props;
    const packageName = location.hash.replace('#', '');
  }

  render() {
    return(
      <div>
        <h3>THIS IS NPM DETAIL PAGE</h3>
      </div>
    )
  }
}

export default NPMDetailPage;
