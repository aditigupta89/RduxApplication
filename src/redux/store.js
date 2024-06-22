import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FeatureReducer from './featuresSlice'; // Ensure the correct path to your reducer

const rootReducer = combineReducers({
  feature: FeatureReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
