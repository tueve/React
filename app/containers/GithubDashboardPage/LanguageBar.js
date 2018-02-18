import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RadioButton from '../../components/RadioButton';

const LanguageBarWrapper = styled.div`
  display: block;
`;

const LanguageBar = ({ languages, selectedLanguage, selectLanguage }) => (
  <LanguageBarWrapper>
    <div className="row">
      {
        languages.map((language) => (
          <div className="col-6 col-sm-4 col-md-2 p-0" key={`${language}_${Math.random()}`}>
            <RadioButton
              value={language}
              selectedOption={selectedLanguage}
              onChangeHandle={selectLanguage}
            />
          </div>
        ))
      }
    </div>
  </LanguageBarWrapper>
);

LanguageBar.propTypes = {
  languages: PropTypes.array.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  selectLanguage: PropTypes.func.isRequired,
};

export default LanguageBar;
