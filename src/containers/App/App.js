import React, { useState, useEffect } from 'react';
import { slide as BurgerMenu } from 'react-burger-menu';
import store from 'store';
import { ToggleModalProvider } from '../../context/ToggleModalContext';
import { EditLinksProvider } from '../../context/EditLinksContext';
import Layout from '../Layout/Layout';
import BurgerMenuList from '../BurgerMenuList/BurgerMenuList';
import {} from './App.module.scss';

const App = () => {
  const [showSideMenu, toggleSideMenu] = useState(false);

  useEffect(() => {
    const linksCollection = store.get('linksCollection');
    const linksCollectionLength = linksCollection ? linksCollection.length : 0;
    const userHasVisited = store.get('hasVisited') || false;

    if (!userHasVisited) {
      firstVisitWalkthrough(linksCollectionLength);
      store.set('hasVisited', true);
    }
  }, []);

  const firstVisitWalkthrough = length => {
    if (length === 0) {
      setTimeout(() => {
        toggleSideMenu(true);
      }, 2000);

      setTimeout(() => {
        toggleSideMenu(false);
      }, 3500);
    }
  };

  const menuToggle = state => {
    const { isOpen } = state;
    toggleSideMenu(isOpen);
  };

  return (
    <EditLinksProvider>
      <ToggleModalProvider>
        <Layout />
        <BurgerMenu right isOpen={showSideMenu} onStateChange={menuToggle}>
          <BurgerMenuList toggleSideMenu={toggleSideMenu} />
        </BurgerMenu>
      </ToggleModalProvider>
    </EditLinksProvider>
  );
};

export default App;
