import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// interface PageState {
//   data: [
//     {
//       id: number;
//       name: string;
//       summary: string;
//       image: any;
//       url: string;
//
//     }
//   ];
// }

// const initialState: PageState = {
//   data: [
//     {
//       id: 0,
//       name: "",
//       summary: "",
//       image: null,
//       url: "",
//
//     },
//   ],
// };
const initialState = {
  data: [{ id: 0, name: "", summary: "", image: null, url: "" }],

  favorites: [{ id: 0, name: "", summary: "", image: null, url: "" }],
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
