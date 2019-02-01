import React from 'react';
import PropTypes from 'prop-types';
import styles from './FloatingActionButton.module.scss';

const FloatingActionButton = ({ clicked }) => (
  <button className={styles.FloatingActionButton} onClick={clicked} />
);

FloatingActionButton.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default FloatingActionButton;
