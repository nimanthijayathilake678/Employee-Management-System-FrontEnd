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
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
// import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
// import { fetchEmployees, deleteEmployee } from '../../../store/slices/employeeSlice';
// import { Employee } from '../../../types/employee';

const EmployeeList: React.FC = () => {
  //const dispatch = useAppDispatch();
  //const { employees, loading, error } = useAppSelector(state => state.employee);
  const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     dispatch(fetchEmployees());
//   }, [dispatch]);

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       dispatch(deleteEmployee(id));
//     }
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/employees/create"
        >
          Add Employee
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          placeholder="Search employees..."
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
              <TableCell>Employee Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeCode}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.active ? 'Active' : 'Inactive'}
                    color={employee.active ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    href={`/employees/edit/${employee.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;