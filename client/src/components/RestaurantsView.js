import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useApolloClient } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import { Grid, Paper } from "@mui/material";

import { GET_RESTAURANTS } from "./database/queries";
import SearchBox from "./SearchBox";
import Loader from "./core/Loader";
import RestaurantRenderer from "./RestaurantRenderer";
import RestaurantPagination from "./RestaurantPagination";
import { setState } from "../store/restaurantStore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "auto",
  },
  gridContent: {
    maxWidth: "750px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  restaurantsContent: {
    marginTop: "42px !important",
    marginBottom: "28px !important",
  },
});

const RestaurantsView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const { isPageLoading, page, pageSize } = useSelector(
    (state) => state.state.value
  );

  const loadData = async () => {
    const {
      data: { restaurants, countRestaurants },
    } = await apolloClient.query({
      query: GET_RESTAURANTS,
      variables: { page, pageSize },
      fetchPolicy: "network-only",
    });

    dispatch(
      setState({
        isPageLoading: false,
        restaurants: restaurants || [],
        restaurantCount: countRestaurants,
      })
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper className={classes.root} elevation={0}>
      {isPageLoading ? (
        <Loader />
      ) : (
        <Grid container direction="column" className={classes.gridContent}>
          <Grid item>
            <SearchBox />
          </Grid>

          <Grid item className={classes.restaurantsContent}>
            <RestaurantRenderer />
          </Grid>

          <Grid item>
            <RestaurantPagination />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default RestaurantsView;
