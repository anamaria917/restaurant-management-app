import React, { memo, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import FilledActionButton from "./FilledActionButton";

const useStyles = makeStyles({
  root: {
    maxHeight: "134px",
    cursor: "pointer",
    paddingTop: "18px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "12px",
    marginTop: "10px",
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
    marginTop: "30px",
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
    color: "#323cf0", // TODO:
  },
  actionButton: {
    color: "white !important",
    backgroundColor: "#4c54ee", // TODO:
    padding: "10px",
  },
});

const RestaurantBox = ({ restaurant, onDelete, onEdit }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

        {isHovered && (
          <FilledActionButton
            width="44px"
            onClick={handleOnDelete}
            id="actionsContent"
          >
            <RemoveIcon className={classes.actionButton} />
          </FilledActionButton>
        )}
      </div>

      <div className={classes.contactSection}>
        <Typography
          className={classes.email}
          sx={{
            color: isHovered ? "inherit" : "auto",
          }}
        >
          {restaurant.email || "-"}
        </Typography>
        <Typography>{restaurant.phone || "-"}</Typography>
      </div>
    </Paper>
  );
};

export default memo(RestaurantBox);
