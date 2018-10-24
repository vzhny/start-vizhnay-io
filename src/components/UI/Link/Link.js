import React from 'react';
import styles from './Link.module.scss';

const Link = props => (
  <div className={styles.LinkContainer}>
    <a className={styles.Link} target="_blank" rel="noopener noreferrer" href={props.url}>
      {props.name}
    </a>
    <span className={styles.RemoveBtn} onClick={props.removeLink}>
      &times;
    </span>
  </div>
);

export default Link;
