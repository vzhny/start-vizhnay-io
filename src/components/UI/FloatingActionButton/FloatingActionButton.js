import React from 'react';
import styles from './FloatingActionButton.module.scss';

const FloatingActionButton = props => (
  <button className={styles.FloatingActionButton} onClick={props.clicked}>
    {props.text}
  </button>
);

export default FloatingActionButton;
