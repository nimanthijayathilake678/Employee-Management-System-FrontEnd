import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Avatar } from '@mui/material';

// Dummy fetch function, replace with your actual API call
const fetchEmployeeById = async (id: string) => {
  // Replace with actual API call
  // Example: return await axios.get(`/api/employees/${id}`);
  return {
    employee_id: id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    position: 'Security Officer',
    avatarUrl: '', // Optional
  };
};

const EmployeeProfile: React.FC = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employee_id) {
      fetchEmployeeById(employee_id).then(emp => {
        setEmployee(emp);
        setLoading(false);
      });
    }
  }, [employee_id]);

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
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            sx={{ width: 80, height: 80, mb: 2 }}
            src={employee.avatarUrl}
          >
            {employee.firstName?.[0]}
          </Avatar>
          <Typography variant="h5">
            {employee.firstName} {employee.lastName}
          </Typography>
          <Typography color="text.secondary">
            ID: {employee.employee_id}
          </Typography>
        </Box>
        <Typography>Email: {employee.email}</Typography>
        <Typography>Phone: {employee.phone}</Typography>
        <Typography>Position: {employee.position}</Typography>
        {/* Add more fields as needed */}
      </Paper>
    </Box>
  );
};

export default EmployeeProfile;