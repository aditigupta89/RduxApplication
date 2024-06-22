import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  Cards: [],
  currentPage: 1,
  cardsPerPage: 6,
};

export const get_Card = createAsyncThunk('get_Card', async (_, thunkApi) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return thunkApi.rejectWithValue(error);
  }
});

const FeatureSlice = createSlice({
  name: 'FeatureSlice',
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.Cards.splice(action.payload, 1);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
    builder.addCase(get_Card.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const { removeCard, setCurrentPage } = FeatureSlice.actions;
export default FeatureSlice.reducer;
