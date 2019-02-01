import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardBody.module.scss';

const CardBody = ({ children }) => <div className={styles.CardBody}>{children}</div>;

CardBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default CardBody;
