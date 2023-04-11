import React, { useState } from "react";
import { Modal, Button, Typography,Divider } from '@mui/material';

import {useTranslation} from 'react-i18next';
import { ModalContent,CoreModal,CustomButton } from "./modal.style";

function CustomModal(props:{title:string,description?:string}) {
  // const {t} = useTranslation();
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <CoreModal open={showModal} onClose={toggleModal}>
        <ModalContent>
          <Typography variant="h6" gutterBottom>
          {props.title}
          </Typography>
          <Divider variant="inset" />

          <Typography  variant="h6"  gutterBottom>
          {props.description}
          </Typography>
          <CustomButton variant="contained" onClick={toggleModal}>x</CustomButton>
        </ModalContent>
      </CoreModal>
    </div>
  );
}

export default CustomModal;