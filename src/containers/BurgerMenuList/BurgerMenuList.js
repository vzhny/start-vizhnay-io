import React, { useContext } from 'react';
import { EditLinksContext } from '../../context/EditLinksContext';
import { ToggleModalContext } from '../../context/ToggleModalContext';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { burgerMenuList, burgerMenuListItem, menuButton, linkButton, footerLink } from './BurgerMenuList.module.scss';

const BurgerMenuList = ({ toggleSideMenu }) => {
  const [editable, toggleEditable] = useContext(EditLinksContext); // eslint-disable-line
  const [showModal, toggleModal] = useContext(ToggleModalContext); // eslint-disable-line

  return (
    <ul className={burgerMenuList}>
      <li className={burgerMenuListItem}>
        <button
          className={menuButton}
          onClick={() => {
            toggleModal(true);
            toggleSideMenu(false);
          }}
        >
          Add a new Link
        </button>
      </li>
      <li className={burgerMenuListItem}>
        <button
          className={menuButton}
          onClick={() => {
            toggleEditable(true);
            toggleSideMenu(false);
          }}
        >
          Edit Links
        </button>
      </li>
      <li className={clsx(burgerMenuListItem, footerLink)}>
        <span>
          Created with{' '}
          <span role="img" aria-label="black heart">
            🖤
          </span>{' '}
          by{' '}
        </span>
        <a
          className={linkButton}
          href="https://vizhnay.io/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            toggleSideMenu(false);
          }}
        >
          vzhny
        </a>
        <span>.</span>
      </li>
    </ul>
  );
};

BurgerMenuList.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
};

export default BurgerMenuList;
