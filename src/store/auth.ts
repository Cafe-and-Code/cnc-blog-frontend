// store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}
const storage = typeof window !== "undefined"
  ? createWebStorage("local")
  : createPersistStore();

const persistConfig = {
  key: 'root',
  storage,
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null as string | null,
    postId: {
      id: null as string | null,
      name: null as string | null
    }
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
    updatePostId: (state, action) => {
      state.postId = action.payload;
    }
  },
});

// Xuất actions và reducer
export const { login, logout, updatePostId } = userSlice.actions;
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);