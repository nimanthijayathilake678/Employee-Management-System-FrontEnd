import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DutyPoint } from '../../types/dutypoint';

//fetching dutyPoint
export const fetchDutyPoint = createAsyncThunk(
  'dutypoints/fetchDutyPoints',
  async () => {
    const response = await fetch('http://localhost:8089/api/dutyPoints');
    return (await response.json()) as DutyPoint[];
  }
);