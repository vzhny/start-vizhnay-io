import React from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import styles from './Card.module.scss';

const Card = props => (
  <div className={styles.Card}>
    <CardHeader title={props.title} />
    <CardBody>{props.children}</CardBody>
  </div>
);

export default Card;
