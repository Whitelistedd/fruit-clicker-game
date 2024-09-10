import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/user";
import { fruitsApi } from "./slices/fruits";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'fruit',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  [fruitsApi.reducerPath]: fruitsApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(fruitsApi.middleware),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
