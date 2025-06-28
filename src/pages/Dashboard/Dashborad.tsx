import React from 'react';
import { Typography, Paper, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const cards = [
    {
      title: 'EMPLOYEE',
      description: 'Employee create and view',
      icon: <PeopleIcon fontSize="large" color="primary" />,
      onClick: () => navigate('/dashboard/employees'),
      clickable: true,
    },
    {
      title: 'INVOICE',
      description: 'Invoice Details',
      icon: <ReceiptIcon fontSize="large" color="secondary" />,
      clickable: false,
    },
    {
      title: 'PAYSHEET MANAGEMENT',
      description: 'Paysheet Management',
      icon: <PaymentIcon fontSize="large" sx={{ color: theme.palette.success.main }} />,
      clickable: false,
    },
    {
      title: 'DUTY POINT MANAGEMENT',
      description: 'Duty Points Creation',
      icon: <LocationOnIcon fontSize="large" sx={{ color: theme.palette.warning.main }} />,
      onClick: () => navigate('/dashboard/dutypoints'),
      clickable: true,
    },
    {
      title: 'ATTENDANCE MANAGEMENT',
      description: 'Attendance Management',
      icon: <EventAvailableIcon fontSize="large" sx={{ color: theme.palette.info.main }} />,
      onClick: () => navigate('/dashboard/attendace'),
      clickable: true,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 60%, ${theme.palette.primary.dark} 100%)`,
        py: 6,
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
        Welcome to the Dashboard
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          '& > *': {
            flex: '1 1 calc(33.333% - 24px)', // 3 per row, minus gap
            minWidth: 260,
            maxWidth: 340,
          },
          '@media (max-width: 900px)': {
            '& > *': {
              flex: '1 1 calc(50% - 24px)', // 2 per row on tablets
            },
          },
          '@media (max-width: 600px)': {
            '& > *': {
              flex: '1 1 100%', // 1 per row on mobile
            },
          },
        }}
      >
        {cards.map((card, idx) => (
          <Paper
            key={card.title}
            elevation={4}
            sx={{
              padding: 3,
              cursor: card.clickable ? 'pointer' : 'default',
              borderRadius: 3,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': card.clickable
                ? {
                    transform: 'translateY(-6px) scale(1.03)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                  }
                : {},
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
              height: '100%',
            }}
            onClick={card.clickable ? card.onClick : undefined}
          >
            {card.icon}
            <Typography variant="h6" mt={2} fontWeight={600}>
              {card.title}
            </Typography>
            <Typography color="text.secondary" mt={1} align="center">
              {card.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;