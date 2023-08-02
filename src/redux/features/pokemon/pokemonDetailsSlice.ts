import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { PokemonDetails } from "../../../utils/types";

interface PokemonDetailsState {
  name: string;
  pokemonDetailsData: PokemonDetails[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: Boolean;
}

const initialState: PokemonDetailsState = {
  pokemonDetailsData: [],
  status: "idle",
  error: null,
  name: "",
  loading: false
};

export const fetchPokemonDetails = createAsyncThunk<
  PokemonDetails[],
  void,
  { rejectValue: string }
>("pokemon/fetchData", async (_, thunkAPI) => {
  
  try {
    const name = (thunkAPI.getState() as RootState).pokemonName.name;
    await new Promise((resolve: any) => {
      setTimeout(() =>{
        resolve();
      },2000);
    });
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonDetails.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(
      fetchPokemonDetails.fulfilled,
      (state, action: PayloadAction<PokemonDetails[]>) => {
        state.status = "succeeded";
        state.pokemonDetailsData = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchPokemonDetails.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      }
    );
  },
});

export default pokemonDetailsSlice.reducer;
