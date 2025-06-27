import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchAttendances } from '../../../store/slices/attendace';
import { Attendance } from '../../../types/attendace';

const AttendanceList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAttendances());
  }, [dispatch]);

  const { attendances = [], loading, error } = useAppSelector(state => state.attendace);

  // Filter attendances by employee firstName and lastName
  const filteredAttendances = (Array.isArray(attendances) ? attendances : []).filter(att =>
    `${att.employee?.firstName ?? ''} ${att.employee?.lastName ?? ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">No Data Available</Typography>;
  if (!filteredAttendances.length) {
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">ATTENDANCE</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/dashboard/attendance/create"
          >
            Add Attendance
          </Button>
        </Box>
        <Box mb={3}>
          <TextField
            placeholder="Search attendance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.500' }} />
            }}
            sx={{ minWidth: 300 }}
          />
        </Box>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No Attendance Data Fetched
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">ATTENDANCE</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/dashboard/attendance/create"
        >
          Add Attendance
        </Button>
      </Box>
      <Box mb={3}>
        <TextField
          placeholder="Search attendance..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.500' }} />
          }}
          sx={{ minWidth: 300 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Break (min)</TableCell>
              <TableCell>Overtime (hrs)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Duty Point</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendances.map((att: Attendance) => (
              <TableRow key={att.attendance_id}>
                <TableCell>{att.date}</TableCell>
                <TableCell>
                  {att.employee
                    ? `${att.employee.firstName ?? ''} ${att.employee.lastName ?? ''} (${att.employee.employee_id ?? ''})`
                    : '-'}
                </TableCell>
                <TableCell>{att.shift}</TableCell>
                <TableCell>
                  {att.checkInTime ? new Date(att.checkInTime).toLocaleTimeString() : '-'}
                </TableCell>
                <TableCell>
                  {att.checkOutTime ? new Date(att.checkOutTime).toLocaleTimeString() : '-'}
                </TableCell>
                <TableCell>{att.breakDuration ?? '-'}</TableCell>
                <TableCell>{att.overtimeHours ?? '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={att.status}
                    color={
                      att.status === 'PRESENT'
                        ? 'success'
                        : att.status === 'ABSENT'
                        ? 'error'
                        : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {att.dutyPoint
                    ? `${att.dutyPoint.dutyPoint_name ?? ''} (${att.dutyPoint.dutyPoint_id ?? ''})`
                    : '-'}
                </TableCell>
                <TableCell>{att.remarks ?? '-'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    href={`/attendance/edit/${att.attendance_id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  {/* Optionally add delete functionality here */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendanceList;