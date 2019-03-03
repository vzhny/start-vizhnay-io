import React from 'react';
import PropTypes from 'prop-types';
import { cardBody } from './CardBody.module.scss';

const CardBody = ({ children }) => <div className={cardBody}>{children}</div>;

CardBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default CardBody;
