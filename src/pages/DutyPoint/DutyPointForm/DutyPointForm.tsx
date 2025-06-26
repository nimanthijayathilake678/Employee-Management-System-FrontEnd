import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { DutyPoint, DutyPointFormData } from '../../../types/dutypoint';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
// import { addDutyPoint } from '../../../store/slices/dutyPointSlice';
import { useNavigate } from 'react-router-dom';

interface DutyPointFormProps {
  dutyPoint?: DutyPoint;
  onSubmit?: (data: DutyPointFormData) => void;
  loading?: boolean;
}

// Validation schema
const schema = yup.object({
  dutyPoint_name: yup.string().required('Duty Point Name is required'),
  phone: yup.string().required('Phone Number is required'),
  dutyPoint_location: yup.string().required('Location is required'),
  dutyPointCharges: yup
    .string()
    .required('Charges are required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Charges must be a valid number')
}).required();

const DutyPointForm: React.FC<DutyPointFormProps> = ({
  dutyPoint,
  onSubmit,
  loading = false
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { loading: reduxLoading } = useAppSelector(state => state.dutyPoint); 

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DutyPointFormData>({
    resolver: yupResolver(schema),
    defaultValues: dutyPoint
      ? {
          ...dutyPoint
        }
      : {
          dutyPoint_name: '',
          phone: '',
          dutyPoint_location: '',
          dutyPointCharges: ''
        }
  });

  // Submit logic to send data to backend
  const handleFormSubmit = async (data: DutyPointFormData) => {
    try {
      console.log("Submitting DutyPoint form with data:", data);
      // await dispatch(addDutyPoint(data)).unwrap(); // Uncomment and adjust as needed
      navigate('/dashboard/dutypoints');
    } catch (error) {
      console.error('Failed to add duty point:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {dutyPoint ? 'Edit Duty Point' : 'Add Duty Point'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit ?? handleFormSubmit)}>
          <Stack spacing={3}>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('dutyPoint_name')}
                label="Duty Point Name"
                fullWidth
                error={!!errors.dutyPoint_name}
                helperText={errors.dutyPoint_name?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('phone')}
                label="Phone"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                {...register('dutyPoint_location')}
                label="Location"
                fullWidth
                error={!!errors.dutyPoint_location}
                helperText={errors.dutyPoint_location?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('dutyPointCharges')}
                label="Charges"
                type="text"
                fullWidth
                error={!!errors.dutyPointCharges}
                helperText={errors.dutyPointCharges?.message}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" href="/dutypoints">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading /* || reduxLoading */}
              >
                {loading /* || reduxLoading */ ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default DutyPointForm;