import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Box, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';
import { AttendanceFormData, AttendanceStatus, ShiftType } from '../../../types/attendace';
import { createAttendance } from '../../../store/slices/attendace';

interface AttendaceFormProps {
  attendance?: AttendanceFormData;
}

// Update schema to match nested structure
const schema = yup.object({
  employee: yup.object({
    employee_id: yup.number().required('Employee is required'),
  }),
  date: yup.string().required('Date is required'),
  shift: yup.mixed<ShiftType>().oneOf(['DAY', 'NIGHT']).required('Shift is required'),
  checkInTime: yup.string().notRequired().nullable(),
  checkOutTime: yup.string().notRequired().nullable(),
  breakDuration: yup.number().nullable().notRequired(),
  overtimeHours: yup.number().nullable().notRequired(),
  status: yup.mixed<AttendanceStatus>().oneOf(['PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE', 'HALF_DAY']).required('Status is required'),
  dutyPoint: yup.object({
    dutyPoint_id: yup.number().required('Duty Point is required'),
  }),
  remarks: yup.string().notRequired().nullable(),
});

function formatDate(date: Date | Moment): string {
  if (moment.isMoment(date)) {
    return date.format('YYYY-MM-DD');
  }
  return moment(date).format('YYYY-MM-DD');
}

const AttendaceForm: React.FC<AttendaceFormProps> = ({ attendance }) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    resolver: yupResolver(schema as any),
    defaultValues: attendance
      ? {
          ...attendance,
          date: attendance.date,
        }
      : {
          employee: { employee_id: 0 },
          date: formatDate(new Date()),
          shift: 'DAY',
          status: 'PRESENT',
          dutyPoint: { dutyPoint_id: 0 },
          checkInTime: '',
          checkOutTime: '',
          breakDuration: undefined,
          overtimeHours: undefined,
          remarks: '',
        },
  });

  const onSubmit: SubmitHandler<AttendanceFormData> = async (data) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const payload = {
      employee: { employee_id: data.employee.employee_id },
      dutyPoint: { dutyPoint_id: data.dutyPoint.dutyPoint_id },
      date: typeof data.date === 'string' ? data.date : formatDate(data.date as unknown as Date),
      shift: data.shift,
      status: data.status,
      checkInTime: data.checkInTime ? `${currentDate}T${data.checkInTime}` : null,
      checkOutTime: data.checkOutTime ? `${currentDate}T${data.checkOutTime}` : null,
      breakDuration: data.breakDuration,
      overtimeHours: data.overtimeHours,
      remarks: data.remarks,
    };
    console.log(payload);
    await dispatch(createAttendance(payload)).unwrap();
    navigate('/dashboard/attendace');
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {attendance ? 'Edit Attendance' : 'Add Attendance'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box display="flex" gap={3} flexWrap="wrap">
            <Controller
              name="employee.employee_id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee ID"
                  type="number"
                  error={!!errors.employee?.employee_id}
                  helperText={errors.employee?.employee_id?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date"
                  value={field.value ? moment(field.value, 'YYYY-MM-DD') : null}
                  onChange={date => {
                    let formatted = '';
                    if (date && moment.isMoment(date)) {
                      formatted = formatDate(date);
                    }
                    field.onChange(formatted);
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors.date,
                      helperText: errors.date?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="shift"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Shift"
                  error={!!errors.shift}
                  helperText={errors.shift?.message}
                  fullWidth
                >
                  <MenuItem value="DAY">Day</MenuItem>
                  <MenuItem value="NIGHT">Night</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  fullWidth
                >
                  <MenuItem value="PRESENT">Present</MenuItem>
                  <MenuItem value="ABSENT">Absent</MenuItem>
                  <MenuItem value="LATE">Late</MenuItem>
                  <MenuItem value="ON_LEAVE">On Leave</MenuItem>
                  <MenuItem value="HALF_DAY">Half Day</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="dutyPoint.dutyPoint_id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duty Point ID"
                  type="number"
                  error={!!errors.dutyPoint?.dutyPoint_id}
                  helperText={errors.dutyPoint?.dutyPoint_id?.message}
                  fullWidth
                />
              )}
            />
          </Box>
          <Box display="flex" gap={3} flexWrap="wrap">
            <Controller
              name="checkInTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Check In Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              )}
            />
            <Controller
              name="checkOutTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Check Out Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              )}
            />
            <Controller
              name="breakDuration"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Break Duration (minutes)"
                  type="number"
                  fullWidth
                  value={field.value || ''}
                />
              )}
            />
            <Controller
              name="overtimeHours"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Overtime Hours"
                  type="number"
                  fullWidth
                  value={field.value || ''}
                />
              )}
            />
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Remarks"
                  fullWidth
                  multiline
                  rows={2}
                />
              )}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            {attendance ? 'Update Attendance' : 'Add Attendance'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AttendaceForm;