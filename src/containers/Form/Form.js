import React, { Component } from 'react';
import styles from './Form.module.scss';

export default class Form extends Component {
  state = {
    linkData: {
      name: '',
      url: '',
      category: null,
    },
    showAddNewCategory: false,
  };

  componentDidMount() {
    // TODO Dynamically retrieve the categories for the select dropdown
  }

  inputHandler = event => {
    const { name, value } = event.target;
    console.log('value:', value);

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
        // TODO bind the value of the categories to the displayed values
        if (value !== 'new-category') {
          this.setState({
            linkData: {
              ...this.state.linkData,
              category: value,
            },
          });
        } else {
          this.setState({
            ...this.state,
            showAddNewCategory: true,
          });
        }
        break;
      case 'category':
        break;
      default:
        break;
    }
  };

  onFormSubmitHandler = e => {
    e.preventDefault();
    console.log('LinkData', this.state.linkData);
  };

  render() {
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
          <option value="placeholder">Please select a category!</option>
          <option value="new-category">Add a New Category</option>
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
