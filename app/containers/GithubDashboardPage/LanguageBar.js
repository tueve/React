import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const LanguageBarWrapper = styled.div`
  display: block;
`;

const LanguageBar = ({ languages, selectedLanguage, selectLanguage }) => (
  <LanguageBarWrapper>
    <RadioGroup onChange={selectLanguage} defaultValue={selectedLanguage}>
      {
        languages.map((language) => (
          <RadioButton
            value={language}
            key={`${language}_${Math.random()}`}
          >
            {language}
          </RadioButton>
      ))}
    </RadioGroup>
  </LanguageBarWrapper>
);

LanguageBar.propTypes = {
  languages: PropTypes.array.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  selectLanguage: PropTypes.func.isRequired,
};

export default LanguageBar;
