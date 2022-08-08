import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useApolloClient } from "@apollo/client";
import { IconButton, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { SEARCH_RESTAURANTS } from "../database/queries";
import { setState } from "../store/restaurantStore";

const SearchBox = () => {
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const { isTableLoading, page, pageSize } = useSelector(
    (state) => state.state.value
  );

  const [searchTerm, setSearch] = useState("");

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onFilterApply = async () => {
    dispatch(setState({ isTableLoading: true }));

    const {
      data: { searchRestaurants },
    } = await apolloClient.query({
      query: SEARCH_RESTAURANTS,
      variables: { searchTerm, page, pageSize },
      fetchPolicy: "network-only",
    });

    dispatch(
      setState({ isTableLoading: false, restaurants: searchRestaurants || [] })
    );
  };

  return (
    <div>
      <OutlinedInput
        value={searchTerm}
        onChange={onChange}
        disabled={isTableLoading}
      />

      <IconButton
        onClick={onFilterApply}
        variant="contained"
        disabled={isTableLoading}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default memo(SearchBox);
