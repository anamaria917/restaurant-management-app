import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CREATE_RESTAURANT, UPDATE_RESTAURANT } from "../database/mutations";
import { setState } from "../store/restaurantStore";

const FIELDS_CONFIG = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
];

// Restaurant received for edit mode
const RestaurantActionModal = ({ isOpen, onClose, restaurant }) => {
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
        <DialogContent>
          {FIELDS_CONFIG.map((fieldConfig) => (
            <OutlinedInput
              key={fieldConfig.name}
              name={fieldConfig.name}
              value={formData[fieldConfig.name] || ""}
              onChange={handleChange}
              placeholder={fieldConfig.label}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <IconButton
            onClick={() => onClose()}
            disabled={isOperationInProgress}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={handleCreate} disabled={isOperationInProgress}>
            <AddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestaurantActionModal;
