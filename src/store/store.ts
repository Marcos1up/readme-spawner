import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import editorReducer from "./slices/editorSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;