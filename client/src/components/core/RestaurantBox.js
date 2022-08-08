import React from "react";

import { makeStyles } from "@mui/styles";
import { IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  root: {
    padding: "15px",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#f3f4f5 !important",
    color: "black !important",
    "&:hover": {
      backgroundColor: "#323cf0 !important",
      color: "white !important",
    },
  },
  nameSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  contactSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: "22px !important",
    fontWeight: "bold !important",
    color: "inherit",
  },
  address: {
    marginTop: "7px !important",
    color: "inherit",
  },
  email: {
    marginTop: "10px !important",
    color: "#323cf0", // TODO:
  },
  actionButton: {
    color: "white !important",
    backgroundColor: "#4c54ee",
    padding: "10px",
  },
  actionsContainer: {
    visibility: "visible", // TODO:
  },
});

const RestaurantBox = ({ restaurant, onDelete, onEdit }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div elevation={0} className={classes.nameSection}>
        <div>
          <Typography className={classes.name}>
            {restaurant.name || "-"}
          </Typography>
          <Typography className={classes.address}>
            {restaurant.address || "-"}
          </Typography>
        </div>

        <div className={classes.actionsContainer}>
          <IconButton onClick={() => onEdit(restaurant.id)}>
            <EditIcon className={classes.actionButton} />
          </IconButton>

          <IconButton onClick={() => onDelete(restaurant.id)}>
            <RemoveIcon className={classes.actionButton} />
          </IconButton>
        </div>
      </div>

      <div className={classes.contactSection}>
        <Typography className={classes.email}>
          {restaurant.email || "-"}
        </Typography>
        <Typography>{restaurant.phone || "-"}</Typography>
      </div>
    </Paper>
  );
};

export default RestaurantBox;
