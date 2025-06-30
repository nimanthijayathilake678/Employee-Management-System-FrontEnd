import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Stack,
  Chip,
  Divider,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const fetchEmployeeById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8089/api/employees/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch employee');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch employee');
  }
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatSalary = (salary: string) => {
  if (!salary) return '-';
  return Number(salary).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
};

// Dummy components for tab content
const AttendanceTab: React.FC = () => (
  <Box mt={2}>
    <Typography variant="h6">Attendance</Typography>
    <Typography color="text.secondary">Attendance details will be shown here.</Typography>
  </Box>
);

const PaysheetTab: React.FC = () => (
  <Box mt={2}>
    <Typography variant="h6">Paysheet</Typography>
    <Typography color="text.secondary">Paysheet details will be shown here.</Typography>
  </Box>
);

const NotesTab: React.FC = () => (
  <Box mt={2}>
    <Typography variant="h6">Notes</Typography>
    <Typography color="text.secondary">Employee notes will be shown here.</Typography>
  </Box>
);

const EmployeeProfile: React.FC = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (employee_id) {
      fetchEmployeeById(employee_id).then(emp => {
        setEmployee(emp);
        setLoading(false);
      });
    }
  }, [employee_id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Employee not found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          minWidth: isSmallScreen ? 300 : 700,
          borderRadius: 4,
          boxShadow: 6,
          width: '100%',
          maxWidth: 900
        }}
      >
        <Stack
          direction={isSmallScreen ? 'column' : 'row'}
          spacing={4}
          alignItems={isSmallScreen ? 'center' : 'flex-start'}
          justifyContent="center"
        >
          {/* Left: Avatar and Main Info */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minWidth={isSmallScreen ? 0 : 220}
            mb={isSmallScreen ? 2 : 0}
          >
            <Avatar
              sx={{ width: 90, height: 90, mb: 2, bgcolor: 'primary.main', fontSize: 36 }}
              src={employee.avatarUrl}
            >
              {employee.firstName?.[0]}
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              <BadgeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              ID: {employee.employeeId ?? employee.employee_id}
            </Typography>
            <Chip
              label={employee.active ? 'Active' : 'Inactive'}
              color={employee.active ? 'success' : 'default'}
              icon={employee.active ? <CheckCircleIcon /> : <CancelIcon />}
              sx={{ mb: 1 }}
            />
          </Box>

          {/* Right: Details and Tabs */}
          <Box flex={1} width="100%">
            <Stack spacing={2}>
              <Box display="flex" alignItems="center">
                <BadgeIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Employee Code:
                </Typography>
                <Typography variant="subtitle1">{employee.employeeCode}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <WorkIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Position:
                </Typography>
                <Typography variant="subtitle1">{employee.position}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Email:
                </Typography>
                <Typography variant="subtitle1">{employee.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Phone:
                </Typography>
                <Typography variant="subtitle1">{employee.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <CalendarMonthIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Hire Date:
                </Typography>
                <Typography variant="subtitle1">{formatDate(employee.hireDate)}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <MonetizationOnIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  Base Salary:
                </Typography>
                <Typography variant="subtitle1">{formatSalary(employee.baseSalary)}</Typography>
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="Attendance" />
              <Tab label="Paysheet" />
              <Tab label="Notes" />
            </Tabs>
            <Box>
              {tab === 0 && <AttendanceTab />}
              {tab === 1 && <PaysheetTab />}
              {tab === 2 && <NotesTab />}
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeeProfile;