import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
      >
        <Paper
          elevation={3}
          sx={{ padding: 2, flex: '1 1 30%', cursor: 'pointer' }} 
          onClick={() => navigate('/dashboard/employees')} 
        >
          <Typography variant="h6">EMPLOYEE</Typography>
          <Typography>Employee create and view</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">ATTENDANCE</Typography>
          <Typography>Mark attendance and view</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">INVOICE</Typography>
          <Typography>Invoice Details</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">PAYSHEET MANAGMENT</Typography>
          <Typography>Paysheet Managment</Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{ padding: 2, flex: '1 1 30%', cursor: 'pointer' }} 
          onClick={() => navigate('/dashboard/dutypoints')} 
        >
          <Typography variant="h6">DUTY POINT MANAGMENT</Typography>
          <Typography>Duty Points Creations</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">PAYSHEET MANAGMENT</Typography>
          <Typography>2</Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
