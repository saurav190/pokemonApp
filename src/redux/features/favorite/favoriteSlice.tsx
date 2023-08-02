import { createSlice } from "@reduxjs/toolkit";
const existingUser = localStorage.getItem("loginuser");
const user = existingUser ? JSON.parse(existingUser) : null;

interface favoriteData {
  [email: string]: string[];
}

const initialState: favoriteData = {
  email: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteInfo: (state, action) => {
      const existingData = action.payload;
      console.log(existingData);

      // if(state[user?.email]){
      const isExistingUser = state[existingData?.user?.email]?.includes(
        existingData.favoritePokemon
      );
      let tempFavorite = state[existingData?.user?.email] || [];

      if (isExistingUser) {
        tempFavorite = tempFavorite.filter(
          (fav) => fav !== existingData.favoritePokemon
        );
      } else {
        tempFavorite.push(existingData.favoritePokemon);
      }
      localStorage.setItem(
        `favorite_${existingData?.user?.email}`,
        JSON.stringify(tempFavorite)
      );
      state[existingData?.user?.email] = tempFavorite;
    },
    setfavInfo: (state, action) => {
      console.log(action.payload);
      const existingData = action.payload;

      state[existingData.user?.email] = existingData.favoritePokemon;
    },
  },
});

export const { favoriteInfo, setfavInfo } = favoriteSlice.actions;
export default favoriteSlice.reducer;
