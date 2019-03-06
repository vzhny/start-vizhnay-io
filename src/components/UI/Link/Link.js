import React, { useContext } from 'react';
import { EditLinksContext } from '../../../context/EditLinksContext.js';
import PropTypes from 'prop-types';
import { linkContainer, link, removeBtn } from './Link.module.scss';

const Link = ({ url, name, removeLink }) => {
  const [editable, toggleEditable] = useContext(EditLinksContext); // eslint-disable-line

  return (
    <div className={linkContainer}>
      <a className={link} target="_blank" rel="noopener noreferrer" href={url}>
        {name}
      </a>
      {editable && (
        <span className={removeBtn} onClick={removeLink}>
          &times;
        </span>
      )}
    </div>
  );
};

Link.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  removeLink: PropTypes.func.isRequired,
};

export default Link;
