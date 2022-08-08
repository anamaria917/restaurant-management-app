import { IconButton, Typography } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

const RestaurantBox = ({ restaurant, onDelete, onEdit }) => {
  return (
    <div>
      <div>
        <div>
          <Typography>{restaurant.name || "-"}</Typography>
          <Typography>{restaurant.address || "-"}</Typography>
        </div>

        <IconButton onClick={() => onEdit(restaurant.id)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => onDelete(restaurant.id)}>
          <RemoveIcon />
        </IconButton>
      </div>

      <div>
        <Typography>{restaurant.email || "-"}</Typography>
        <Typography>{restaurant.phone || "-"}</Typography>
      </div>
    </div>
  );
};

export default RestaurantBox;
