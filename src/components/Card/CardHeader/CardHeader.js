import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardHeader.module.scss';

const CardHeader = props => <h1 className={styles.CardHeader}>{props.title}</h1>;

CardHeader.propTypes = {
  title: PropTypes.string,
};

export default CardHeader;
