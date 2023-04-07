import React, { useState } from "react";
// import {useStyles} from './style';
import {useTranslation} from 'react-i18next';

function Modal(props:any) {
  const classes = "useStyles";
//   const classes = useStyles();
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button onClick={toggleModal}>{t('modal.closeModal')}</button>
      {showModal && (
        <div className={classes} >
          <div className={classes} >
            <h2>{props.title}</h2>
            <p>{props.message}</p>
            <button onClick={toggleModal}>{t('modal.openModal')}</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;