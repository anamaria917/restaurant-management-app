import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useApolloClient } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { SEARCH_RESTAURANTS } from "./database/queries";
import { setState } from "../store/restaurantStore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  searchButton: {
    color: "white !important",
    backgroundColor: "#4c54ee",
    padding: "10px",
    width: "88px !important",
  },
  searchBox: {
    flex: 1,
  },
});

const SearchBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const { isTableLoading, refetchData, page, pageSize } = useSelector(
    (state) => state.state.value
  );

  const [searchTerm, setSearch] = useState("");

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onFilterApply = async (newPage = page) => {
    dispatch(setState({ isTableLoading: true }));

    const {
      data: { searchRestaurants, countRestaurants },
    } = await apolloClient.query({
      query: SEARCH_RESTAURANTS,
      variables: { searchTerm, page: page * pageSize, pageSize },
      fetchPolicy: "network-only",
    });

    dispatch(
      setState({
        isTableLoading: false,
        restaurants: searchRestaurants || [],
        restaurantCount: countRestaurants,
      })
    );
  };

  useEffect(() => {
    if (refetchData) {
      dispatch(setState({ refetchData: false }));
      onFilterApply();
    }
  }, [refetchData]);

  useEffect(() => {
    onFilterApply(page);
  }, [page]);

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        value={searchTerm}
        onChange={onChange}
        disabled={isTableLoading}
        className={classes.searchBox}
      />

      <IconButton
        onClick={onFilterApply}
        variant="contained"
        disabled={isTableLoading}
      >
        <SearchIcon className={classes.searchButton} />
      </IconButton>
    </div>
  );
};

export default memo(SearchBox);
