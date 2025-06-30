import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await fetch('http://localhost:8089/api/employees');
    return (await response.json()) as Employee[];
  }
);

// Async thunk for fetching an employee by ID
export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8089/api/employees/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch employee');
      }
      return (await response.json()) as Employee;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch employee');
    }
  }
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id: number) => {
    await fetch(`http://localhost:8089/api/employees/${id}`, { method: 'DELETE' });
    return id;
  }
);

//  adding an employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employee: Omit<Employee, 'employeeId'>, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8089/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to add employee');
      }
      console.log("Employee Updated:)");
      return (await response.json()) as Employee;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add employee');
    }
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
        state.employees = state.employees.filter(emp => emp.employeeId !== action.payload);
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
        state.loading = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add employee';
      });
  },
});

export default employeeSlice.reducer;