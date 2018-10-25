import React from 'react';
import PropTypes from 'prop-types';
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

Link.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  removeLink: PropTypes.func.isRequired,
};

export default Link;
