import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const Dashboard: React.FC = () => {
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
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">Card 1</Typography>
          <Typography>Summary or chart here</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, flex: '1 1 30%' }}>
          <Typography variant="h6">Card 2</Typography>
          <Typography>Another summary</Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
