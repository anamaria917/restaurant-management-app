import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DELETE_RESTAURANT } from "../database/mutations";

const ConfirmDeleteRestaurantModal = ({ isOpen, onClose, id }) => {
  const apolloClient = useApolloClient();
  const [isOperationInProgress, setOperationInProgress] = useState(false);

  const onConfirm = async () => {
    setOperationInProgress(true);

    apolloClient
      .mutate({
        mutation: DELETE_RESTAURANT,
        variables: { id },
      })
      .then(() => {
        onClose(true);
        setOperationInProgress(false);
      })
      .catch((err) => {
        setOperationInProgress(false);
        // TODO: Add notification
      });
  };

  return (
    <Dialog open={isOpen} onClose={() => onClose()}>
      <DialogTitle>Delete restaurant</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently remove this restaurant?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} disabled={isOperationInProgress}>
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={isOperationInProgress}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteRestaurantModal;
