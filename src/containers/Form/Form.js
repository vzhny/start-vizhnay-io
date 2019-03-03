import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import slugify from 'slugify';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { unslugify } from '../../utils/utils';
import { form, label, input, formError, dropdown, submitBtn } from './Form.module.scss';

const Form = ({ clicked, linksUpdated }) => {
  const [linkData, setLinkData] = useState({
    name: '',
    url: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [showAddNewCategory, toggleShowAddNewCategory] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: {
      alreadyExists: false,
      missing: false,
    },
    url: {
      alreadyExists: false,
      missing: false,
    },
    category: {
      alreadyExists: false,
      missing: false,
    },
  });

  useEffect(() => {
    let categoriesCollection = store.get('categoriesCollection');

    if (categoriesCollection === undefined) {
      categoriesCollection = [
        {
          value: 'placeholder',
          title: 'Please select a category!',
        },
        {
          value: 'new-category',
          title: 'Add a New Category',
        },
      ];
    }

    setCategories([...categoriesCollection]);
  });

  const inputHandler = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setLinkData({
          ...linkData,
          name: value,
        });
        break;
      case 'url':
        setLinkData({
          ...linkData,
          url: value,
        });
        break;
      case 'category':
        setLinkData({
          ...linkData,
          category: slugify(value, { lower: true }),
        });
        break;
      case 'categories':
        if (value !== 'new-category') {
          // User selected an existing category
          setLinkData({
            ...linkData,
            category: slugify(value, { lower: true }),
          });

          toggleShowAddNewCategory(false);
        } else {
          // User selected to add a new category, show the input field
          toggleShowAddNewCategory(true);
        }
        break;
      default:
        break;
    }
  };

  const onFormSubmitHandler = e => {
    e.preventDefault();

    const formInvalid = checkForInvalidation();

    if (formInvalid) {
      return;
    }

    addLinkToCollection();
    addCategoryToCollection();

    closeModal(true);
  };

  const closeModal = async close => {
    if (close) {
      await clicked();
      await linksUpdated();
    }
  };

  const checkForInvalidation = () => {
    // TODO check for any duplicate links attempting to be added
    let containsErrors = false;
    const { name, url, category } = linkData;
    const updatedValidationErrors = validationErrors;

    if (name.length === 0) {
      updatedValidationErrors.name.missing = true;
      containsErrors = true;
    } else {
      updatedValidationErrors.name.missing = false;
    }

    if (url.length === 0) {
      updatedValidationErrors.url.missing = true;
      containsErrors = true;
    } else {
      updatedValidationErrors.url.missing = false;
    }

    if (category.length === 0) {
      updatedValidationErrors.category.missing = true;
      containsErrors = true;
    } else {
      updatedValidationErrors.category.missing = false;
    }

    setValidationErrors(updatedValidationErrors);

    return containsErrors;
  };

  const addLinkToCollection = () => {
    let linksCollection = store.get('linksCollection');
    const { name, url, category } = linkData;

    if (name.length === 0) {
    }

    if (linksCollection === undefined) {
      linksCollection = [];
    }

    const existingCategory = find(linksCollection, ['category', category]);

    if (existingCategory === undefined) {
      const addedLinkWithCategory = {
        category,
        links: [
          {
            name,
            url,
          },
        ],
      };

      linksCollection.push(addedLinkWithCategory);

      store.set('linksCollection', linksCollection);
    } else {
      const addedLink = {
        name,
        url,
      };

      existingCategory.links.push(addedLink);
      const indexOfExistingCategory = findIndex(linksCollection, ['category', category]);
      linksCollection.splice(indexOfExistingCategory, 1, existingCategory);

      store.set('linksCollection', linksCollection);
    }
  };

  const addCategoryToCollection = () => {
    let categoriesCollection = store.get('categoriesCollection');

    if (categoriesCollection === undefined) {
      categoriesCollection = categories;
    }

    const duplicateCategory = find(categoriesCollection, ['value', linkData.category]);

    if (duplicateCategory === undefined) {
      const addedCategory = {
        value: linkData.category,
        title: unslugify(linkData.category),
      };

      categoriesCollection.push(addedCategory);

      store.set('categoriesCollection', categoriesCollection);

      setCategories(categoriesCollection);
    }
  };

  const dropDownOptions = categories.map((category, index) => {
    return (
      <option key={index} value={category.value}>
        {category.title}
      </option>
    );
  });

  return (
    <form className={form} onSubmit={e => onFormSubmitHandler(e)}>
      <p>Please enter your link information below:</p>
      <label className={label} htmlFor="name">
        Link Name:
      </label>
      <input className={input} onChange={e => inputHandler(e)} type="text" name="name" />
      {validationErrors.name.missing ? (
        <p className={formError}>Please enter a link name.</p>
      ) : null}
      <label className={label} htmlFor="url">
        Link URL:
      </label>
      <input className={input} onChange={e => inputHandler(e)} type="url" name="url" />
      {validationErrors.url.missing ? <p className={formError}>Please enter a url.</p> : null}
      <label className={label} htmlFor="category">
        Link Category:
      </label>
      <select className={dropdown} name="categories" onChange={e => inputHandler(e)}>
        {dropDownOptions}
      </select>
      {showAddNewCategory ? (
        <input
          className={input}
          style={{ marginTop: '1rem' }}
          onChange={e => inputHandler(e)}
          type="text"
          name="category"
        />
      ) : null}
      {validationErrors.category.missing ? (
        <p className={formError}>Please select or enter a category.</p>
      ) : null}
      <button className={submitBtn} type="submit">
        Add Link
      </button>
    </form>
  );
};

Form.propTypes = {
  clicked: PropTypes.func.isRequired,
  linksUpdated: PropTypes.func.isRequired,
};

export default Form;
