import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DutyPoint } from '../../types/dutypoint';

// Fetching dutyPoint
export const fetchDutyPoint = createAsyncThunk(
  'dutypoint/fetchDutyPoints',
  async () => {
    const response = await fetch('http://localhost:8089/api/DutyPoint');
    return (await response.json()) as DutyPoint[];
  }
);

interface DutyPointState {
  dutyPoints: DutyPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: DutyPointState = {
  dutyPoints: [],
  loading: false,
  error: null,
};

const dutyPointSlice = createSlice({
  name: 'dutyPoint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDutyPoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDutyPoint.fulfilled, (state, action: PayloadAction<DutyPoint[]>) => {
        state.dutyPoints = action.payload;
        state.loading = false;
      })
      .addCase(fetchDutyPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch duty points';
      });
  },
});

export default dutyPointSlice.reducer;