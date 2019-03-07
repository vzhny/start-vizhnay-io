import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ToggleModalContext = React.createContext([false, () => {}]);

export const ToggleModalProvider = ({ children }) => {
  const [showModal, toggleModal] = useState(false);

  return <ToggleModalContext.Provider value={[showModal, toggleModal]}>{children}</ToggleModalContext.Provider>;
};

ToggleModalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
