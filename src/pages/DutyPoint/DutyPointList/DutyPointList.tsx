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
  TextField
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchDutyPoint } from '../../../store/slices/dutyPointSlice';
import { DutyPoint } from '../../../types/dutypoint';

const DutyPointList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dutyPoints = [], loading, error } = useAppSelector(state => (state as any).dutyPoint || {});

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchDutyPoint());
  }, [dispatch]);

  const handleDelete = async (dutyPointId: number) => {
    if (window.confirm('Are you sure you want to delete this duty point?')) {
      // dispatch(deleteDutyPoint(dutyPointId));
    }
  };

  const filteredDutyPoints = dutyPoints.filter((dp: DutyPoint) =>
    dp.dutyPoint_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dp.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dp.dutyPoint_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">No Data Available</Typography>;
  if (!filteredDutyPoints.length) {
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">DUTY POINTS</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/dashboard/dutypoints/create"
          >
            Add Duty Point
          </Button>
        </Box>

        <Box mb={3}>
          <TextField
            placeholder="Search duty points..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.500' }} />
            }}
            sx={{ minWidth: 300 }}
          />
        </Box>

        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No Duty Point Data Fetched
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">DUTY POINTS</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/dashboard/dutypoints/create"
        >
          Add Duty Point
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          placeholder="Search duty points..."
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
              <TableCell>Duty Point Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Charges</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDutyPoints.map((dp: DutyPoint) => (
              <TableRow key={dp.dutyPoint_id}>
                <TableCell>{dp.dutyPoint_name}</TableCell>
                <TableCell>{dp.phone}</TableCell>
                <TableCell>{dp.dutyPoint_location}</TableCell>
                <TableCell>{dp.dutyPointCharges}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    href={`/dashboard/dutypoints/edit/${dp.dutyPoint_id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(dp.dutyPoint_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DutyPointList;