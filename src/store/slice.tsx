import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  allData: {};
}

const initialState: PageState = {
  allData: Object,
};

export const dataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    setAllData: (state, action: PayloadAction<object>) => {
      state.allData = action.payload;
    },
  },
});

export const { setAllData } = dataSlice.actions;

export default dataSlice.reducer;
