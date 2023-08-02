import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PokemonNameState {
  name: string | undefined;
}

const initialState: PokemonNameState = {
  name: "",
};

const pokemonNameSlice = createSlice({
  name: "pokemonName",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = pokemonNameSlice.actions;
export default pokemonNameSlice.reducer;
