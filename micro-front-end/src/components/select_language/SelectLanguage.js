import React from "react";
import PropTypes from "prop-types";
import { setLanguage } from "redux-i18n";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
      lang: state.i18nState.lang,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      changeLanguage: (language) => dispatch(setLanguage(language)),
    };
  };
  
const SelectLanguage = (props, context) => {
  const handleChange = (event) => {
    props.changeLanguage(event.target.value);
  };
  return <>
  <dic>
      <button onClick={handleChange} value='en'>{context.t('English')}</button>
      <button onClick={handleChange} value='ru'>{context.t('Russian')}</button>
  </dic>
  </>;
};

SelectLanguage.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);