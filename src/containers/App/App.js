import React, { useState } from 'react';
import { slide as BurgerMenu } from 'react-burger-menu';
import { ToggleModalProvider } from '../../context/ToggleModalContext';
import { EditLinksProvider } from '../../context/EditLinksContext';
import Layout from '../Layout/Layout';
import BurgerMenuList from '../BurgerMenuList/BurgerMenuList';
import {} from './App.module.scss';

const App = () => {
  const [showSideMenu, toggleSideMenu] = useState(false);

  return (
    <EditLinksProvider>
      <ToggleModalProvider>
        <Layout />
        <BurgerMenu right isOpen={showSideMenu}>
          <BurgerMenuList toggleSideMenu={toggleSideMenu} />
        </BurgerMenu>
      </ToggleModalProvider>
    </EditLinksProvider>
  );
};

export default App;
