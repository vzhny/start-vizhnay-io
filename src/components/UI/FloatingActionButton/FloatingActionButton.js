import React from 'react';
import PropTypes from 'prop-types';
import styles from './FloatingActionButton.module.scss';

const FloatingActionButton = props => (
  <button className={styles.FloatingActionButton} onClick={props.clicked}>
    {props.text}
  </button>
);

FloatingActionButton.defaultProps = {
  text: '➕',
};

FloatingActionButton.propTypes = {
  text: PropTypes.string,
  clicked: PropTypes.func.isRequired,
};

export default FloatingActionButton;
