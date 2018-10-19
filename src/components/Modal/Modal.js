import React, { Component } from 'react';
import Form from '../../containers/Form/Form';
import Card from '../Card/Card';
import Backdrop from './Backdrop/Backdrop';
import styles from './Modal.module.scss';

export default class Modal extends Component {
  render() {
    return (
      <>
        <Backdrop toggleModal={this.props.clicked} />
        <div className={styles.Modal}>
          <Card>
            <Form />
          </Card>
        </div>
      </>
    );
  }
}
