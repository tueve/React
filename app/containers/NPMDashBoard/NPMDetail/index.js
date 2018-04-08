import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const LabelItem = styled.span`
  font-size   : 1rem;
  font-weight : 600;
  margin-right: 10px;
`;

const AddToCompare = styled(Button)`
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  padding: 10px 0;
`;

const ListItem = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Avatar = styled.div`
  background-image   : url(${(props) => props.backgroundImage});
  background-size    : cover;
  background-position: center;
  width              : 300px;
  height             : 300px;
`;

const NPMDetail = ({ 0:
  { author = '',
    name,
    description,
    version,
    keywords,
    links,
    downloads,
    starsCount,
    issues,
    finalScore,
    quality,
    popularity,
    maintenance,
  }, onAddPackage }) => (
      <div className="col-12 mt-3">
        <h3 className="d-flex">{name}
          <AddToCompare
            type="primary"
            icon="plus"
            size="large"
            onClick={() => onAddPackage(name)}
          >Add to compare</AddToCompare>
        </h3>

        <ContentWrapper>
          <div className="d-flex justify-content-center m-b-2">
            {/* <Avatar backgroundImage="https://image.flaticon.com/icons/svg/147/147144.svg"></Avatar> */}
            {/* <ImgContent src="https://image.flaticon.com/icons/svg/147/147144.svg" alt="avt"/> */}
          </div>
          <ContentWrapper className="d-block">
            <p>
              <LabelItem>Descrition</LabelItem>
              {description}
            </p>
          </ContentWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <p>
            <LabelItem>Keywords</LabelItem>
            {keywords && keywords.join(',')}
          </p>
        </ContentWrapper>
        <ContentWrapper className="row">
          <div className="col-12 col-sm-6">
            <p>
              <LabelItem>Publisher</LabelItem>
              {author}
            </p>
            <p>
              <LabelItem>Version</LabelItem>
              {version}
            </p>
            <p>
              <LabelItem>Star</LabelItem>
              {starsCount}
            </p>
          </div>
          <div className="col-12 col-sm-6">
            <ListItem>
              {links.homepage && <li><Link to={links.homepage || '#'} target="_blank"><LabelItem>homepage</LabelItem></Link></li>}
              {links.repository && <li><Link to={links.repository  || '#'} target="_blank"><LabelItem>github</LabelItem></Link></li>}
              {links.npm && <li><Link to={links.npm  || '#'} target="_blank"><LabelItem>npm</LabelItem></Link></li>}
              {links.bugs && <li><Link to={links.bugs  || '#'} target="_blank"><LabelItem>bugs</LabelItem></Link></li>}
            </ListItem>
          </div>
        </ContentWrapper>
        <div className="row">
          <div className="col-6">
            <div>
              <p><LabelItem>licence:</LabelItem> MIT</p>
            </div>
            <div>
              <p><LabelItem>Maintainers</LabelItem> 12</p>
            </div>
            <div>
              <p><LabelItem>Daily   downloads:</LabelItem> {downloads[0]}</p>
              <p><LabelItem>Weekly  downloads:</LabelItem> {downloads[1]}</p>
              <p><LabelItem>Monthly downloads:</LabelItem> {downloads[2]}</p>
            </div>
          </div>
          <div className="col-6">
            <div>
              <p><LabelItem>Open issues:</LabelItem> {issues.openCount}</p>
            </div>
            <div>
              <p><LabelItem>Quality score:</LabelItem> {Math.floor(quality * 100)}</p>
              <p><LabelItem>Popularity score</LabelItem> {Math.floor(popularity * 100)}</p>
              <p><LabelItem>Maintainance score</LabelItem> {Math.floor(maintenance * 100)}</p>
              <p><LabelItem>Avarage score</LabelItem> {Math.floor(finalScore * 100)}</p>
            </div>
          </div>
        </div>
      </div>
);

export default NPMDetail;

