import React, { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { Pagination } from "@mui/material";

import RestaurantActionModal from "./modals/RestaurantActionModal";
import { setState } from "../store/restaurantStore";
import FilledActionButton from "./core/FilledActionButton";

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
    [page, restaurantCount, pageSize]
  );

  const handlePaginationChange = (event, newPage) => {
    dispatch(setState({ page: newPage - 1 }));
  };

  return (
    <div className={classes.root}>
      <FilledActionButton onClick={() => setIsOpen(true)}>
        <AddIcon />
      </FilledActionButton>

      <Pagination
        count={pageCount}
        page={page + 1}
        shape="rounded"
        onChange={handlePaginationChange}
        color={"primary"}
        size="large"
      />

      <RestaurantActionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default memo(RestaurantPagination);
