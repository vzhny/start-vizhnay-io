import React, { Component } from 'react';
import store from 'store';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import FloatingActionButton from '../../components/UI/FloatingActionButton/FloatingActionButton';
import styles from './Layout.module.scss';
import { unslugify } from '../../utils/utils';

export default class Layout extends Component {
  state = {
    linksCollection: [],
    showModal: false,
  };

  componentDidMount() {
    this.setState({
      linksCollection: store.get('linksCollection'),
    });
  }

  toggleModalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  linkUpdateHandler = () => {
    const linksCollection = store.get('linksCollection');

    this.setState({
      ...this.state,
      linksCollection,
    });
  };

  render() {
    let linksCollection = (
      <Card>
        <p>Please click the floating action button to start adding links!</p>
      </Card>
    );

    // TODO Fix component not re-rendering on adding link
    if (this.state.linksCollection) {
      linksCollection = this.state.linksCollection.map((link, index) => {
        return (
          <Card key={index}>
            <a href={link.url}>{link.name}</a>
          </Card>
        );
      });
    }

    return (
      <>
        {this.state.showModal ? (
          <Modal clicked={this.toggleModalHandler} linksUpdated={this.linkUpdateHandler} />
        ) : null}
        <div className={styles.Layout}>{linksCollection}</div>
        <FloatingActionButton clicked={this.toggleModalHandler} />
      </>
    );
  }
}
