import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.module.scss';

const Backdrop = props => <div className={styles.Backdrop} onClick={props.clicked} />;

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
