import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import FloatingActionButton from '../../components/UI/FloatingActionButton/FloatingActionButton';
import styles from './Layout.module.scss';

export default class Layout extends Component {
  state = {
    showModal: false,
  };

  toggleModalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    return (
      <>
        {this.state.showModal ? <Modal clicked={this.toggleModalHandler} /> : null}
        <div className={styles.Layout}>
          <Card>Box #1</Card>
          <Card>Box #2</Card>
          <Card>Box #3</Card>
          <Card>Box #4</Card>
        </div>
        <FloatingActionButton clicked={this.toggleModalHandler} />
      </>
    );
  }
}
