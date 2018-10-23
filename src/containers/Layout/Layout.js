import React, { Component } from 'react';
import store from 'store';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import FloatingActionButton from '../../components/UI/FloatingActionButton/FloatingActionButton';
import styles from './Layout.module.scss';
import CardBody from '../../components/Card/CardBody/CardBody';
import Link from '../../components/UI/Link/Link';

export default class Layout extends Component {
  state = {
    linksCollection: [],
    categories: [],
    showModal: false,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
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

    if (this.state.linksCollection) {
      linksCollection = this.state.linksCollection.map((collection, index) => {
        return (
          <Card key={index}>
            <CardBody>
              {collection.links.map((link, index) => (
                <Link key={index} name={link.name} url={link.url} linksUpdated={this.linkUpdateHandler} />
              ))}
            </CardBody>
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
        <FloatingActionButton text="➕" clicked={this.toggleModalHandler} />
      </>
    );
  }
}
