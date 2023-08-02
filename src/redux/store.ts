import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import favoriteSlice from "./features/favorite/favoriteSlice";
import pokemonListingSlice from './features/homeslice/pokemonListingSlice';
import pokemonCatchReducer from "./features/pokemon/pokemonCatchSlice";
import pokemonDetailsReducer from "./features/pokemon/pokemonDetailsSlice";
import pokemonNameReducer from "./features/pokemon/pokemonNameSlice";
import userAuthSlice from "./features/userAuth/userAuthSlice";

const reducer = {
  pokemon: pokemonListingSlice,
  pokemonDetails: pokemonDetailsReducer  ,
  pokemonLocation: pokemonCatchReducer ,
  pokemonName : pokemonNameReducer,
  userAuth : userAuthSlice,
  favoriteData: favoriteSlice,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer,
});

export default store;
