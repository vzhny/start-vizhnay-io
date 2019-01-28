import React from 'react';
import styles from './CardBody.module.scss';

const CardBody = props => <div className={styles.CardBody}>{props.children}</div>;

export default CardBody;
