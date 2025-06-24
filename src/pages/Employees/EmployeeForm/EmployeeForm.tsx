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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Employee, EmployeeFormData } from '../../../types/employee';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  loading?: boolean;
}

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  department: yup.string().required('Department is required'),
  position: yup.string().required('Position is required'),
  hireDate: yup.date().required('Hire date is required'),
  baseSalary: yup.number().positive('Salary must be positive').required('Base salary is required')
});

const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];

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
    // resolver: yupResolver(schema),
    // defaultValues: employee
    //   ? {
    //       ...employee,
    //       hireDate: employee.hireDate ? new Date(employee.hireDate) : null
    //     }
    //   : {
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //       phone: '',
    //       department: '',
    //       position: '',
    //       hireDate: null,
    //       baseSalary: undefined
    //     }
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
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  defaultValue=""
                  {...register('department')}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                type="number"
                fullWidth
                error={!!errors.baseSalary}
                helperText={errors.baseSalary?.message}
              />
            </Box>

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