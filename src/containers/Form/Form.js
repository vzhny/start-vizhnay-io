import React, { Component } from 'react';
import store from 'store';
import styles from './Form.module.scss';
import slugify from 'slugify';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { unslugify } from '../../utils/utils';

export default class Form extends Component {
  state = {
    linkData: {
      name: '',
      url: '',
      category: null,
    },
    categories: [],
    showAddNewCategory: false,
    validationErrors: {
      name: {
        length: 0,
        touched: false,
      },
      url: {
        length: 0,
        touched: false,
      },
      category: {
        length: 0,
        touched: false,
      },
    },
    submitDisabled: false,
  };

  componentDidMount() {
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

    this.setState({
      ...this.state,
      categories: categoriesCollection,
    });
  }

  inputHandler = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        // Link Name input field
        this.setState({
          ...this.state,
          linkData: {
            ...this.state.linkData,
            name: value,
          },
        });
        break;
      case 'url':
        // Link URL input field
        this.setState({
          ...this.state,
          linkData: {
            ...this.state.linkData,
            url: value,
          },
        });
        break;
      case 'categories':
        if (value !== 'new-category') {
          // User selected an existing category
          this.setState({
            ...this.state,
            linkData: {
              ...this.state.linkData,
              category: slugify(value, { lower: true }),
            },
            showAddNewCategory: false,
          });
        } else {
          // User selected to add a new category, show the input field
          this.setState({
            ...this.state,
            showAddNewCategory: true,
          });
        }
        break;
      case 'category':
        // Link Category input field
        this.setState({
          ...this.state,
          linkData: {
            ...this.state.linkData,
            category: slugify(value, { lower: true }),
          },
        });
        break;
      default:
        break;
    }
  };

  onFormSubmitHandler = e => {
    e.preventDefault();

    this.addLinkToCollection();
    this.addCategoryToCollection();

    this.props.clicked();
    this.props.linksUpdated();
  };

  addLinkToCollection = () => {
    let linksCollection = store.get('linksCollection');
    const { name, url, category } = this.state.linkData;

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

  addCategoryToCollection = () => {
    let categoriesCollection = store.get('categoriesCollection');

    if (categoriesCollection === undefined) {
      categoriesCollection = this.state.categories;
    }

    const duplicateCategory = find(categoriesCollection, ['value', this.state.linkData.category]);

    if (duplicateCategory === undefined) {
      const addedCategory = {
        value: this.state.linkData.category,
        title: unslugify(this.state.linkData.category),
      };

      categoriesCollection.push(addedCategory);

      store.set('categoriesCollection', categoriesCollection);

      this.setState({
        ...this.state,
        categories: categoriesCollection,
      });
    }
  };

  render() {
    const dropDownOptions = this.state.categories.map((category, index) => {
      return (
        <option key={index} value={category.value}>
          {category.title}
        </option>
      );
    });

    return (
      <form className={styles.Form} onSubmit={e => this.onFormSubmitHandler(e)}>
        <p>Please enter your link information below:</p>
        <label className={styles.Label} htmlFor="name">
          Link Name:
        </label>
        <input className={styles.Input} onChange={e => this.inputHandler(e)} type="text" name="name" />
        <label className={styles.Label} htmlFor="url">
          Link URL:
        </label>
        <input className={styles.Input} onChange={e => this.inputHandler(e)} type="url" name="url" />
        <label className={styles.Label} htmlFor="category">
          Link Category:
        </label>
        <select className={styles.Dropdown} name="categories" onChange={e => this.inputHandler(e)}>
          {dropDownOptions}
        </select>
        {this.state.showAddNewCategory ? (
          <input
            className={styles.Input}
            style={{ marginTop: '1rem' }}
            onChange={e => this.inputHandler(e)}
            type="text"
            name="category"
          />
        ) : null}
        <button className={styles.SubmitBtn} disabled={this.state.submitDisabled} type="submit">
          Add Link
        </button>
      </form>
    );
  }
}
