import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Attendance, AttendanceFormData, AttendanceFilter } from '../../types/attendace';

// Fetch attendances
export const fetchAttendances = createAsyncThunk(
  'attendance/fetchAttendances',
  async (filter?: AttendanceFilter) => {
    let url = 'http://localhost:8089/api/attendance';
    if (filter) {
      const params = new URLSearchParams(filter as any).toString();
      url += `?${params}`;
    }
    const response = await fetch(url);
    return (await response.json()) as Attendance[];
  }
);

// Create a new attendance record
export const createAttendance = createAsyncThunk(
  'attendance/createAttendance',
  async (attendance: AttendanceFormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8089/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendance),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create attendance');
      }
      return (await response.json()) as Attendance;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create attendance');
    }
  }
);

interface AttendanceState {
  attendances: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendances.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.attendances = action.payload;
        state.loading = false;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch attendances';
      })
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action: PayloadAction<Attendance>) => {
        state.attendances.push(action.payload);
        state.loading = false;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create attendance';
      });
  },
});

export default attendanceSlice.reducer;