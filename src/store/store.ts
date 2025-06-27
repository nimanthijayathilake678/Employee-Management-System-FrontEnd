import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import dutyPointReducer from './slices/dutyPointSlice';
import attendace from './slices/attendace'

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth: authReducer,
    dutyPoint: dutyPointReducer,
    attendace:attendace
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;