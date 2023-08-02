import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface PokemonCatchState {
  pokemonLocations: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean
}

const initialState: PokemonCatchState = {
  pokemonLocations: [],
  status: "idle",
  error: null,
  loading: false
};

export const fetchPokemonLocation = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("pokemon/fetchPokemonLocation", async (_, thunkAPI) => {
  try {
    const name = (thunkAPI.getState() as RootState).pokemonName.name;
    await new Promise((resolve:any) => {
      setTimeout(()=>{resolve()}, 2000);
    })
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

const pokemonCatchSlice = createSlice({
  name: "pokemonCatch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonLocation.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    });
    builder.addCase(
      fetchPokemonLocation.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.status = "succeeded";
        state.pokemonLocations = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchPokemonLocation.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      }
    );
  },
});

export default pokemonCatchSlice.reducer;
