import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [
    {
      id: 0,
      name: "",
      summary: "",
      image: {
        original: "",
        medium: "",
      },
      url: "",
    },
  ],

  favorites: [
    {
      id: 0,
      name: "",
      summary: "",
      image: {
        original: "",
        medium: "",
      },
      url: "",
    },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    deleteCard: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    addFavorites: (state, action) => {
      const itemToAdd = state.data.find((item) => item.id === action.payload);
      if (itemToAdd) {
        state.favorites.push(itemToAdd);
      }
    },
    deleteFavorites: (state, action) => {
      const itemId = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== itemId);
    },
    showFavorites: (state, action) => {
      state.data = state.favorites;
    },
  },
});

export const {
  setData,
  deleteCard,
  addFavorites,
  deleteFavorites,
  showFavorites,
} = dataSlice.actions;

export const getData = () => (dispatch: any) => {
  axios
    .get("https://api.tvmaze.com/shows??page=0")
    .then((response) => {
      dispatch(setData(response.data));
    })
    .catch((error) => console.log(error));
};

export default dataSlice.reducer;
