import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    viewMode: 'card',
    showFeedbackForm: false,
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setShowFeedbackForm: (state, action) => {
      state.showFeedbackForm = action.payload;
    },
  },
});

export const { setViewMode, setShowFeedbackForm } = appSlice.actions;
export default appSlice.reducer;
