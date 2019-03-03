import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import { card } from './Card.module.scss';

const Card = ({ title, children }) => (
  <div className={card}>
    <CardHeader title={title} />
    <CardBody>{children}</CardBody>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Card;
