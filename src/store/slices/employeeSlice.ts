import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';

// Example async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await fetch('http://localhost:8089/api/employees');
    return (await response.json()) as Employee[];
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id: number) => {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    return id;
  }
);

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.employees = state.employees.filter(emp => emp.employeeId! == action.payload);
      });
  },
});

export default employeeSlice.reducer;