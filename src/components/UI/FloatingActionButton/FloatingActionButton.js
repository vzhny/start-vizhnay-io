import React from 'react';
import PropTypes from 'prop-types';
import { floatingActionButton } from './FloatingActionButton.module.scss';

const FloatingActionButton = ({ clicked }) => (
  <button className={floatingActionButton} onClick={clicked} />
);

FloatingActionButton.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default FloatingActionButton;
