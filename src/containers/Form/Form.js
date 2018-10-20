import React, { Component } from 'react';
import store from 'store';
import styles from './Form.module.scss';

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

  componentDidMount() {}

  inputHandler = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        this.setState({
          linkData: {
            ...this.state.linkData,
            name: value,
          },
        });
        break;
      case 'url':
        this.setState({
          linkData: {
            ...this.state.linkData,
            url: value,
          },
        });
        break;
      case 'categories':
        if (value !== 'new-category') {
          this.setState({
            linkData: {
              ...this.state.linkData,
              category: value,
            },
            showAddNewCategory: false,
          });
        } else {
          this.setState({
            ...this.state,
            showAddNewCategory: true,
          });
        }
        break;
      case 'category':
        this.setState({
          linkData: {
            ...this.state.linkData,
            category: value,
          },
        });
        break;
      default:
        break;
    }
  };

  onFormSubmitHandler = e => {
    e.preventDefault();

    const updatedLinksCollection = store.get('linksCollection');
    const updatedCategoriesCollection = store.get('categoriesCollection');

    if (updatedLinksCollection) {
      updatedLinksCollection.push(this.state.linkData);
      store.set('linksCollection', updatedLinksCollection);
    } else {
      const linksCollection = [];
      linksCollection.push(this.state.linkData);
      store.set('linksCollection', linksCollection);
    }

    if (updatedCategoriesCollection) {
      updatedCategoriesCollection.push(...this.state.categories, this.state.linkData.category);
      store.set('categoriesCollection', updatedCategoriesCollection);
    } else {
      const categoriesCollection = [];
      const convertedCategory = {
        value: this.state.linkData.category,
        title: this.state.linkData.category,
      };
      categoriesCollection.push(convertedCategory);
      store.set('categoriesCollection', categoriesCollection);
    }

    this.setState({
      ...this.state,
      categories: store.get('categoriesCollection'),
    });

    // TODO Find a better(?) way to close the modal that may not involve passing the toggleHandler all the way down
    this.props.clicked();
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
        <select name="categories" onChange={e => this.inputHandler(e)}>
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
