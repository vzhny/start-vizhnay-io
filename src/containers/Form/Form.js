import React, { Component } from 'react';
import store from 'store';
import styles from './Form.module.scss';
import slugify from 'slugify';
import { unslugify } from '../../utils/utils';

export default class Form extends Component {
  state = {
    linkData: {
      name: '',
      url: '',
      category: null,
    },
    categories: [
      {
        value: 'placeholder',
        title: 'Please select a category!',
      },
      {
        value: 'new-category',
        title: 'Add a New Category',
      },
    ],
    showAddNewCategory: false,
  };

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

    let linksCollection = store.get('linksCollection');
    console.log('linksCollection', linksCollection);
    const addedLink = this.state.linkData;

    if (linksCollection === undefined) {
      linksCollection = [];
    }

    linksCollection.push(addedLink);
    store.set('linksCollection', linksCollection);

    let categoriesCollection = store.get('categoriesCollection');
    console.log('categoriesCollection', categoriesCollection);
    const addedCategory = {
      value: this.state.linkData.category,
      name: unslugify(this.state.linkData.category),
    };

    if (categoriesCollection === undefined) {
      categoriesCollection = this.state.categories;
    }

    categoriesCollection.push(addedCategory);
    store.set('categoriesCollection', categoriesCollection);

    this.setState({
      ...this.state,
      categories: categoriesCollection,
    });

    this.props.clicked();
    this.props.linksUpdated();
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
        <button className={styles.SubmitBtn} type="submit">
          Add Link
        </button>
      </form>
    );
  }
}
