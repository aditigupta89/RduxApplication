import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from './postsSlice';
// import appReducer from './appSlice';
import postsReducer from './redux/PostSclice';
import appReducer from "./redux/appSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    app: appReducer,
  },
});
