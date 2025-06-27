import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { store } from './store/store';
import { theme } from "./styles/theme";
// import AuthGuard from './guards/AuthGuard';
// import GuestGuard from './guards/GuestGuard';
import DashboardLayout from "./layouts/DashboardLayout";
// import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from "./pages/Login/Login";
import Dashboard from './pages/Dashboard/Dashborad';
import EmployeeList from './pages/Employees/EmployeeList/EmployeeList';
import EmployeeCreate from './pages/Employees/EmployeeForm/EmployeeForm';
import DutyPointList from './pages/DutyPoint/DutyPointList/DutyPointList';
import DutyPointForm from './pages/DutyPoint/DutyPointForm/DutyPointForm';
import AttendaceList from './pages/Attendance/AttendanceList/AttendanceList';
import AttendanceForm from './pages/Attendance/AttendanceForm/AttendaceForm';

// import EmployeeEdit from './pages/Employees/EmployeeEdit';
// import InvoiceList from './pages/Invoices/InvoiceList';
// import PaysheetList from './pages/Paysheets/PaysheetList';
// import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router>
          <Routes>
            {/* Guest routes */}
            <Route
              path="/login"
              element={
                // <GuestGuard>
                //   <AuthLayout>
                <Login />
                //   </AuthLayout>
                // </GuestGuard>
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                //<AuthGuard>
                <DashboardLayout />
                //</AuthGuard>
              }
            >
              <Route index element={<Dashboard />} />
                <Route path="/dashboard/employees" element={<EmployeeList/>} />
                <Route
                  path="/dashboard/employees/create"
                  element={<EmployeeCreate />}
                />
                <Route path="/dashboard/dutypoints" element={<DutyPointList/>} />
                <Route
                  path="/dashboard/dutypoints/create"
                  element={<DutyPointForm />}
                />
                <Route path="/dashboard/attendace" element={<AttendaceList/>} />
                <Route
                  path="/dashboard/attendance/create"
                  element={<AttendanceForm />}
                />
                {/* <Route path="employees/edit/:id" element={<EmployeeEdit />} />
                <Route path="attendance" element={<AttendanceList />} />
                <Route path="invoices" element={<InvoiceList />} />
                <Route path="paysheets" element={<PaysheetList />} /> */}
                
            </Route>

            {/* 404 page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
    </Provider>
  );
};

export default App;
