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

// Creating a new duty point
export const createDutyPoint = createAsyncThunk(
  'dutypoint/createDutyPoint',
  async (dutyPoint: Omit<DutyPoint, 'dutyPoint_id'>, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8089/api/DutyPoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dutyPoint),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create duty point');
      }
      return (await response.json()) as DutyPoint;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create duty point');
    }
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
      })
      .addCase(createDutyPoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDutyPoint.fulfilled, (state, action: PayloadAction<DutyPoint>) => {
        state.dutyPoints.push(action.payload);
        state.loading = false;
      })
      .addCase(createDutyPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create duty point';
      });
  },
});

export default dutyPointSlice.reducer;