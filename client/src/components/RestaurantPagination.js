import React, { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import { IconButton, Pagination } from "@mui/material";

import RestaurantActionModal from "./modals/RestaurantActionModal";
import { setState } from "./store/restaurantStore";

const RestaurantPagination = () => {
  const dispatch = useDispatch();

  const { page, pageSize, restaurantCount } = useSelector(
    (state) => state.state.value
  );
  const [isOpen, setIsOpen] = useState(false);

  const pageCount = useMemo(
    () => Math.ceil(restaurantCount / pageSize),
    [page]
  );

  const handlePaginationChange = (event, newPage) => {
    dispatch(setState({ page: newPage - 1 }));
  };

  return (
    <div>
      <IconButton onClick={() => setIsOpen(true)}>
        <AddIcon />
      </IconButton>

      <Pagination
        count={pageCount}
        page={page + 1}
        variant="outlined"
        shape="rounded"
        onChange={handlePaginationChange}
      />

      <RestaurantActionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default memo(RestaurantPagination);
