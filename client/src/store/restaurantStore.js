import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isPageLoading: true,
  isTableLoading: false,
  refetchData: false, // Used as a trigger to reload data
  restaurants: [],
  restaurantCount: 0,
  // Filters
  searchText: "",
  page: 0,
  pageSize: 5,
};

const listSlice = createSlice({
  name: "state",
  initialState: {
    value: defaultState,
  },
  reducers: {
    resetState: (state) => {
      state.value = defaultState;
    },
    setState: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

// Export actions
export const { resetState, setState } = listSlice.actions;

// Export store
export const restaurantStore = configureStore({
  reducer: {
    state: listSlice.reducer,
  },
});
