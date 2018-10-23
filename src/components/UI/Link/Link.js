import React, { Component } from 'react';
import styles from './Link.module.scss';

export default class Link extends Component {
  removeLinkHandler = () => {};

  render() {
    return (
      <div className={styles.LinkContainer}>
        <a className={styles.Link} target="_blank" rel="noopener noreferrer" href={this.props.url}>
          {this.props.name}
        </a>
        <span className={styles.RemoveBtn} onClick={this.removeLinkHandler()}>
          &times;
        </span>
      </div>
    );
  }
}
