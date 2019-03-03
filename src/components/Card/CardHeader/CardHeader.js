import React from 'react';
import PropTypes from 'prop-types';
import { cardHeader } from './CardHeader.module.scss';

const CardHeader = ({ title }) => <h1 className={cardHeader}>{title}</h1>;

CardHeader.propTypes = {
  title: PropTypes.string,
};

export default CardHeader;
