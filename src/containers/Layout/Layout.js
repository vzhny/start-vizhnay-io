import React, { useState, useLayoutEffect, useContext } from 'react';
import store from 'store';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import Link from '../../components/UI/Link/Link';
import { ToggleModalContext } from '../../context/ToggleModalContext';
import { EditLinksContext } from '../../context/EditLinksContext';
import { getGreeting } from '../../utils/utils';
import { layout, editButton } from './Layout.module.scss';

const Layout = () => {
  const [linksCollection, setLinksCollection] = useState([]);
  const [showModal, toggleModal] = useContext(ToggleModalContext);
  const [editable, toggleEditable] = useContext(EditLinksContext);

  useLayoutEffect(() => {
    retrieveLinks();
    document.title = getGreeting();
  }, [document.title]);

  const hideModalHandler = () => {
    toggleModal(false);
  };

  const linkUpdateHandler = () => {
    retrieveLinks();
  };

  const retrieveLinks = () => {
    const linksCollection = store.get('linksCollection');

    if (linksCollection) {
      setLinksCollection([...store.get('linksCollection')]);
    }
  };

  const removeLinkHandler = (category, name) => {
    let modifiedLinksCollection = linksCollection;

    const categoryOfLink = find(modifiedLinksCollection, ['category', category]);
    const { links } = categoryOfLink;

    const indexOfLink = findIndex(links, ['name', name]);
    links.splice(indexOfLink, 1);

    if (links.length === 0) {
      const indexOfLinkCategory = findIndex(modifiedLinksCollection, ['category', category]);
      modifiedLinksCollection.splice(indexOfLinkCategory, 1);
      removeEmptyCategory(category);
    }

    if (modifiedLinksCollection.length === 0) {
      modifiedLinksCollection = [];
    }

    store.set('linksCollection', modifiedLinksCollection);

    setLinksCollection([...modifiedLinksCollection]);
  };

  const removeEmptyCategory = category => {
    const modifiedCategoriesCollection = store.get('categoriesCollection');
    const indexOfCategoryCollection = findIndex(modifiedCategoriesCollection, ['category', category]);

    modifiedCategoriesCollection.splice(indexOfCategoryCollection, 1);

    store.set('categoriesCollection', modifiedCategoriesCollection);
  };

  let renderedLinksCollection = (
    <Card>
      <p>Please click the floating action button to start adding links!</p>
    </Card>
  );

  if (linksCollection.length > 0) {
    renderedLinksCollection = linksCollection.map(collection => {
      return (
        <Card key={collection.category}>
          {collection.links.map((link, index) => (
            <Link
              key={index}
              name={link.name}
              url={link.url}
              removeLink={() => removeLinkHandler(collection.category, link.name)}
            />
          ))}
        </Card>
      );
    });
  }

  return (
    <>
      {showModal && <Modal clicked={hideModalHandler} linksUpdated={linkUpdateHandler} />}
      <div className={layout}>
        {renderedLinksCollection}
        {editable && (
          <Card>
            <button className={editButton} onClick={() => toggleEditable(false)}>
              Done Editing
            </button>
          </Card>
        )}
      </div>
    </>
  );
};

export default Layout;
