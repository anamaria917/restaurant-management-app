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
import TextField from "@mui/material/TextField";

import { CREATE_RESTAURANT, UPDATE_RESTAURANT } from "../database/mutations";
import { setState } from "../store/restaurantStore";
import { EMAIL_REGEX } from "../types/constants";

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
    marginTop: "10px !important",
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

const DETAILS_FORM_STATE = {
  name: "",
  address: "",
  email: "",
  phone: "",
};

const validateForm = (form) => {
  let errors = {};

  for (const propertyName of Object.keys(form)) {
    if (
      propertyName !== "id" &&
      (!form[propertyName] || form[propertyName]?.trim() === "")
    ) {
      errors = { ...errors, [propertyName]: "This field is mandatory." };
      continue;
    }

    switch (propertyName) {
      case "email":
        if (!EMAIL_REGEX.test(form[propertyName])) {
          errors = {
            ...errors,
            [propertyName]: "Please provide a valid email address.",
          };
        }
        break;
      default:
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

// Restaurant received for edit mode
const RestaurantActionModal = ({ isOpen, onClose, restaurant }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const [isOperationInProgress, setOperationInProgress] = useState(false);
  const [formData, setFormData] = useState(DETAILS_FORM_STATE);
  const [formErrors, setFormErrors] = useState(DETAILS_FORM_STATE);

  useEffect(() => {
    // ResetState
    if (isOpen) {
      setFormData(restaurant || DETAILS_FORM_STATE);
      setFormErrors(DETAILS_FORM_STATE);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    const formValidationErrors = validateForm(formData);
    if (formValidationErrors) {
      setFormErrors(formValidationErrors);
      return;
    }

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
            <TextField
              className={classes.field}
              key={fieldConfig.name}
              name={fieldConfig.name}
              value={formData[fieldConfig.name] || ""}
              onChange={handleChange}
              placeholder={fieldConfig.label}
              error={!!formErrors[fieldConfig.name]}
              helperText={formErrors[fieldConfig.name]}
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
