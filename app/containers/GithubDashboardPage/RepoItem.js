import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const RepoTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  display: block;
`;

const RepoImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
`;

const RepoInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const RepoInfoTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 10px;
`;

const RepoInfoValue = styled.span`
  font-size: .9rem;
  font-weight: 400;
`;

const RepoItem = ({ item: info }) => (
  <div className="col-6 col-sm-3 mb-3">
    <RepoTitle to={info.html_url} target="_blank">
      {info.owner.login}
    </RepoTitle>
    <RepoImg src={info.owner.avatar_url} alt="avt" />
    <RepoInfoWrapper>
      <RepoInfoTitle>follower: </RepoInfoTitle>
      <RepoInfoValue>{info.stargazers_count}</RepoInfoValue>
    </RepoInfoWrapper>
    <RepoInfoWrapper>
      <RepoInfoTitle>Open issues: </RepoInfoTitle>
      <RepoInfoValue>{info.open_issues}</RepoInfoValue>
    </RepoInfoWrapper>
  </div>
);

RepoItem.propTypes = {
  item: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    open_issues: PropTypes.number.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default RepoItem;
