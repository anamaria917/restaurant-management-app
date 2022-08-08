import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { makeStyles } from "@mui/styles";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DELETE_RESTAURANT } from "../database/mutations";
import FilledActionButton from "../core/FilledActionButton";

const useStyles = makeStyles({
  actionsContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "10px",
  },
  actionBtn: {
    marginRight: "10px !important",
  },
});

const ConfirmDeleteRestaurantModal = ({ isOpen, onClose, id }) => {
  const classes = useStyles();
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
        <div className={classes.actionsContent}>
          <FilledActionButton
            onClick={onConfirm}
            disabled={isOperationInProgress}
            className={classes.actionBtn}
          >
            <CheckIcon />
          </FilledActionButton>

          <FilledActionButton
            width="44px"
            bg="#f3f4f5"
            onClick={() => onClose()}
            disabled={isOperationInProgress}
          >
            <ClearIcon />
          </FilledActionButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteRestaurantModal;
