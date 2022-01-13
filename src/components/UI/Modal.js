import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('overlay-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children} </ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default Modal;
