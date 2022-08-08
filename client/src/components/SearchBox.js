import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useApolloClient } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

import { SEARCH_RESTAURANTS } from "./database/queries";
import { setState } from "../store/restaurantStore";
import FilledActionButton from "./core/FilledActionButton";
import StyledInput from "./core/StyledInput";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  btnContainer: {
    marginLeft: "10px",
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
      <StyledInput
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={onChange}
        disabled={isTableLoading}
        placeholder="Search"
      />

      <div className={classes.btnContainer}>
        <FilledActionButton onClick={onFilterApply} disabled={isTableLoading}>
          <SearchIcon />
        </FilledActionButton>
      </div>
    </div>
  );
};

export default memo(SearchBox);
