import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FeatureReducer from './featuresSlice'; 

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
