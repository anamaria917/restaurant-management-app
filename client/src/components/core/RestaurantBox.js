import React, { memo } from "react";

import { makeStyles } from "@mui/styles";
import { IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
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
});

const RestaurantBox = ({ restaurant, onDelete, onEdit }) => {
  const classes = useStyles();

  const handleOnDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(restaurant.id);
  };

  return (
    <Paper
      className={classes.root}
      elevation={0}
      onClick={() => onEdit(restaurant.id)}
    >
      <div elevation={0} className={classes.nameSection}>
        <div>
          <Typography className={classes.name}>
            {restaurant.name || "-"}
          </Typography>
          <Typography className={classes.address}>
            {restaurant.address || "-"}
          </Typography>
        </div>

        <IconButton onClick={handleOnDelete}>
          <RemoveIcon className={classes.actionButton} />
        </IconButton>
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

export default memo(RestaurantBox);
