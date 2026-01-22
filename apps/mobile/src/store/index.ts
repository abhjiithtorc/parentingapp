import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import childrenReducer from './slices/childrenSlice';
import milestonesReducer from './slices/milestonesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    children: childrenReducer,
    milestones: milestonesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
