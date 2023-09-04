import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    selectedYear: "",
    selectedMLB1: "",
    selectedMLB2: "",
  },
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMLB1: (state, action) => {
      state.selectedMLB1 = action.payload;
    },
    setSelectedMLB2: (state, action) => {
      state.selectedMLB2 = action.payload;
    },
  },
});

export const { setSelectedYear, setSelectedMLB1, setSelectedMLB2 } =
  filterSlice.actions;
export default filterSlice.reducer;
