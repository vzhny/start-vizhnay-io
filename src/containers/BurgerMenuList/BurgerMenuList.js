import React, { useContext } from 'react';
import { EditLinksContext } from '../../context/EditLinksContext';
import PropTypes from 'prop-types';
import { burgerMenuList, burgerMenuListItem, menuButton } from './BurgerMenuList.module.scss';

const BurgerMenuList = ({ toggleSideMenu }) => {
  const [editable, toggleEditable] = useContext(EditLinksContext); // eslint-disable-line

  return (
    <ul className={burgerMenuList}>
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
    </ul>
  );
};

BurgerMenuList.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
};

export default BurgerMenuList;
