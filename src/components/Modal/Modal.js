import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../containers/Form/Form';
import Card from '../Card/Card';
import styles from './Modal.module.scss';

const Modal = ({ clicked, linksUpdated }) => {
  const handleEscKey = e => {
    const keys = {
      27: () => {
        e.preventDefault();
        clicked();
        window.removeEventListener('keyup', handleEscKey);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscKey);

    return () => {
      window.removeEventListener('keyup', handleEscKey);
    };
  });

  return (
    <>
      <div className={styles.Backdrop} onClick={clicked} />
      <div className={styles.Modal}>
        <Card title="Add Link">
          <Form clicked={clicked} linksUpdated={linksUpdated} />
        </Card>
      </div>
    </>
  );
};

Modal.propTypes = {
  clicked: PropTypes.func.isRequired,
  linksUpdated: PropTypes.func.isRequired,
};

export default Modal;
