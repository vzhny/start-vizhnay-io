import React from 'react';
import styles from './CardHeader.module.scss';

const CardHeader = props => <h1 className={styles.CardHeader}>{props.title}</h1>;

export default CardHeader;
