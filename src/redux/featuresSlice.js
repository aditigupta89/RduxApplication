import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base_url } from './Api';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
  Cards: [],
  currentPage: 1,
  cardsPerPage: 6,
};

export const get_Card = createAsyncThunk('get_Card', async (_, thunkApi) => {
  try {
    const response = await fetch(`${base_url.url}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return thunkApi.rejectWithValue(error.message);
  }
});

const FeatureSlice = createSlice({
  name: 'FeatureSlice',
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.Cards = state.Cards.filter((_, index) => index !== action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_Card.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_Card.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Cards = action.payload;
    });
    builder.addCase(get_Card.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { removeCard, setCurrentPage, clearError } = FeatureSlice.actions;

export const selectCurrentCards = (state) => {
  const startIndex = (state.featureSlice.currentPage - 1) * state.featureSlice.cardsPerPage;
  const endIndex = startIndex + state.featureSlice.cardsPerPage;
  return state.featureSlice.Cards.slice(startIndex, endIndex);
};

export default FeatureSlice.reducer;
