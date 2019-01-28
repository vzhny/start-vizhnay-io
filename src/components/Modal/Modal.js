import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../containers/Form/Form';
import Card from '../Card/Card';
import styles from './Modal.module.scss';

const Modal = props => (
  <>
    <div className={styles.Backdrop} onClick={props.clicked} />
    <div className={styles.Modal}>
      <Card title="Add Link">
        <Form clicked={props.clicked} linksUpdated={props.linksUpdated} />
      </Card>
    </div>
  </>
);

Modal.propTypes = {
  clicked: PropTypes.func.isRequired,
  linksUpdated: PropTypes.func.isRequired,
};

export default Modal;
