import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Employee, EmployeeFormData } from '../../../types/employee';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  loading?: boolean;
}

// Validation schema
const schema = yup.object({
  employeeCode: yup.string().required('Employee code is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone Number is required'),
  position: yup.string().required('Position is required'),
  hireDate: yup.date().typeError('Hire date is required').required('Hire date is required'),
  baseSalary: yup
    .string()
    .required('Base salary is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Salary must be a valid number'),
  active: yup.boolean().required()
}).required();

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  loading = false
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(schema),
    defaultValues: employee
      ? {
          ...employee,
          hireDate: employee.hireDate ? new Date(employee.hireDate) : new Date(),
          active: employee.active ?? true
        }
      : {
          employeeCode: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          hireDate: new Date(),
          baseSalary: '',
          active: true
        }
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {employee ? 'Edit Employee' : 'Add Employee'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('employeeCode')}
                label="Employee Code"
                fullWidth
                error={!!errors.employeeCode}
                helperText={errors.employeeCode?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('firstName')}
                label="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                {...register('lastName')}
                label="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('email')}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register('phone')}
                label="Phone"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                {...register('position')}
                label="Position"
                fullWidth
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Box>
            <Box display="flex" gap={3} flexWrap="wrap">
              <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Hire Date"
                    //value={field.value}
                    onChange={field.onChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.hireDate,
                        helperText: errors.hireDate?.message
                      }
                    }}
                  />
                )}
              />
               <TextField
                {...register('baseSalary')}
                label="Base Salary"
                type="text"
                fullWidth
                error={!!errors.baseSalary}
                helperText={errors.baseSalary?.message}
              />
            </Box>
            <FormControlLabel
              control={
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  )}
                />
              }
              label="Active"
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" href="/employees">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;