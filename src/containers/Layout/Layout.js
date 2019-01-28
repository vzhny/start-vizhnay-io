import React, { Component } from 'react';
import store from 'store';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import FloatingActionButton from '../../components/UI/FloatingActionButton/FloatingActionButton';
import Link from '../../components/UI/Link/Link';
import styles from './Layout.module.scss';

export default class Layout extends Component {
  state = {
    linksCollection: [],
    showModal: false,
  };

  componentDidMount() {
    this.retrieveLinks();
  }

  showModalHandler = () => {
    this.setState({
      ...this.state,
      showModal: true,
    });
  };

  hideModalHandler = () => {
    this.setState({
      ...this.state,
      showModal: false,
    });
  };

  linkUpdateHandler = () => {
    this.retrieveLinks();
  };

  retrieveLinks = () => {
    const linksCollection = store.get('linksCollection');

    if (linksCollection) {
      this.setState({
        ...this.state,
        linksCollection: store.get('linksCollection'),
      });
    }
  };

  removeLinkHandler = (category, name) => {
    let modifiedLinksCollection = this.state.linksCollection;
    const categoryOfLink = find(modifiedLinksCollection, ['category', category]);
    const { links } = categoryOfLink;

    const indexOfLink = findIndex(links, ['name', name]);
    links.splice(indexOfLink, 1);

    if (links.length === 0) {
      const indexOfLinkCategory = findIndex(modifiedLinksCollection, ['category', category]);
      modifiedLinksCollection.splice(indexOfLinkCategory, 1);
      this.removeEmptyCategory(category);
    }

    if (modifiedLinksCollection.length === 0) {
      modifiedLinksCollection = [];
    }

    store.set('linksCollection', modifiedLinksCollection);

    this.setState({
      ...this.state,
      linksCollection: modifiedLinksCollection,
    });
  };

  removeEmptyCategory = category => {
    const modifiedCategoriesCollection = store.get('categoriesCollection');
    const indexOfCategoryCollection = findIndex(modifiedCategoriesCollection, ['category', category]);

    modifiedCategoriesCollection.splice(indexOfCategoryCollection, 1);

    store.set('categoriesCollection', modifiedCategoriesCollection);
  };

  render() {
    let linksCollection = (
      <Card>
        <p>Please click the floating action button to start adding links!</p>
      </Card>
    );

    if (this.state.linksCollection.length > 0) {
      linksCollection = this.state.linksCollection.map((collection, index) => {
        return (
          <Card key={collection.category}>
            {collection.links.map((link, index) => (
              <Link
                key={index}
                name={link.name}
                url={link.url}
                removeLink={() => this.removeLinkHandler(collection.category, link.name)}
              />
            ))}
          </Card>
        );
      });
    }

    return (
      <>
        {this.state.showModal && <Modal clicked={this.hideModalHandler} linksUpdated={this.linkUpdateHandler} />}
        <div className={styles.Layout}>{linksCollection}</div>
        <FloatingActionButton clicked={this.showModalHandler} />
      </>
    );
  }
}
