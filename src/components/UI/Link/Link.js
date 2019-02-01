import React from 'react';
import PropTypes from 'prop-types';
import styles from './Link.module.scss';

const Link = ({ url, name, removeLink }) => (
  <div className={styles.LinkContainer}>
    <a className={styles.Link} target="_blank" rel="noopener noreferrer" href={url}>
      {name}
    </a>
    <span className={styles.RemoveBtn} onClick={removeLink}>
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
