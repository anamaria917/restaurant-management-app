import { IconButton, Pagination } from "@mui/material";
import React, { memo, useState } from "react";
import RestaurantActionModal from "./modals/RestaurantActionModal";
import AddIcon from "@mui/icons-material/Add";

const RestaurantPagination = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setIsOpen(true)}>
        <AddIcon />
      </IconButton>

      <Pagination count={10} variant="outlined" shape="rounded" />

      <RestaurantActionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default memo(RestaurantPagination);
