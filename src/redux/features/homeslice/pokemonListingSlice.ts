import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

export interface Pokemon {
  name: string;
}

interface PokemonListState {
  data: Pokemon[];
  count:number ;
  loading: boolean;
  error: string | null;
  limit: string;
  currentPage: number;
  totalPages: number;
  totalPokemonCount: number; // Add totalPokemonCount property
}

interface ApiResponse {
  results: Pokemon[];
  count: number; // Add count property to the ApiResponse interface
}

const initialState: PokemonListState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
  limit: '20',
  currentPage: 1,
  totalPages: 1,
  totalPokemonCount: 0, // Initialize totalPokemonCount to 0
};

export const fetchPokemonData = createAsyncThunk<
  { count: number; results: Pokemon[] },
  void,
  { rejectValue: string }
>(
  'pokemon/fetchData',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const limit = state.pokemon.limit;
      const offset = (state.pokemon.currentPage - 1) * parseInt(limit);
      const response = await axios.get<ApiResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      console.log("res",response)
      return {
        count: response.data.count,
        results: response.data.results,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

const pokemonListSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonData: (state, action: PayloadAction<Pokemon[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalPokemonCount: (state, action: PayloadAction<number>) => {
      state.totalPokemonCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.data = action.payload.results;
      state.count = action.payload.count
      state.loading = false;
      state.totalPages = Math.ceil(action.payload.count / parseInt(state.limit));
    });
    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching Pokémon data';
    });
  },
});

export const {
  setPokemonData,
  setLoading,
  setError,
  setLimit,
  setCurrentPage,
  setTotalPages,
  setTotalPokemonCount,
} = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
