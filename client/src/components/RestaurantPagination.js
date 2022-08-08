import React, { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Pagination } from "@mui/material";

import RestaurantActionModal from "./modals/RestaurantActionModal";
import { setState } from "./store/restaurantStore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  actionButton: {
    color: "white !important",
    backgroundColor: "#4c54ee",
    padding: "10px",
  },
});

const RestaurantPagination = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <IconButton onClick={() => setIsOpen(true)}>
        <AddIcon className={classes.actionButton} />
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
