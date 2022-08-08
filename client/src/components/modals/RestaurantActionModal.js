import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

import { CREATE_RESTAURANT, UPDATE_RESTAURANT } from "../database/mutations";
import { setState } from "../store/restaurantStore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "450px",
  },
  confirmActionBtn: {
    color: "white !important",
    backgroundColor: "#4c54ee",
    padding: "10px",
    width: "88px !important",
  },
  clearActionBtn: {
    color: "black !important",
    backgroundColor: "#f3f4f5",
    padding: "10px",
    width: "44px !important",
  },
  field: {
    marginTop: "10px",
  },
  actionsContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "10px",
  },
});

const FIELDS_CONFIG = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
];

// Restaurant received for edit mode
const RestaurantActionModal = ({ isOpen, onClose, restaurant }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const [isOperationInProgress, setOperationInProgress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (restaurant) {
      // Is edit mode
      setFormData(restaurant);
    }
  }, [restaurant]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    setOperationInProgress(true);

    apolloClient
      .mutate({
        mutation: restaurant ? UPDATE_RESTAURANT : CREATE_RESTAURANT,
        variables: formData,
      })
      .then(() => {
        onClose();
        setOperationInProgress(false);
        dispatch(setState({ refetchData: true }));
      })
      .catch(() => {
        setOperationInProgress(false);
        // TODO: Add notification
      });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => onClose()}>
        <DialogTitle>{restaurant ? "Edit" : "Add"} restaurant</DialogTitle>
        <DialogContent className={classes.root}>
          {FIELDS_CONFIG.map((fieldConfig) => (
            <OutlinedInput
              className={classes.field}
              key={fieldConfig.name}
              name={fieldConfig.name}
              value={formData[fieldConfig.name] || ""}
              onChange={handleChange}
              placeholder={fieldConfig.label}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <div className={classes.actionsContent}>
            <IconButton onClick={handleCreate} disabled={isOperationInProgress}>
              {restaurant ? (
                <CheckIcon className={classes.confirmActionBtn} />
              ) : (
                <AddIcon className={classes.confirmActionBtn} />
              )}
            </IconButton>

            <IconButton
              onClick={() => onClose()}
              disabled={isOperationInProgress}
            >
              <ClearIcon className={classes.clearActionBtn} />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestaurantActionModal;
