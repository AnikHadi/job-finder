import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
  filterBySalary: "",
  filterByType: "",
  filterBySearch: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySalary: (state, action) => {
      state.filterBySalary = action.payload;
    },
    filterByType: (state, action) => {
      state.filterByType = action.payload;
    },
    filterBySearch: (state, action) => {
      state.filterBySearch = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterBySalary, filterByType, filterBySearch } =
  filterSlice.actions;
