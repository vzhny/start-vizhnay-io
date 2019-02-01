import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.Loader}>
    <div className={styles.Bounce1} />
    <div className={styles.Bounce2} />
    <div className={styles.Bounce3} />
  </div>
);

export default Loader;
