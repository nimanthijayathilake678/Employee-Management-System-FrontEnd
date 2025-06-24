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
  Alert
} from '@mui/material';
//import { useAuth } from '../../hooks/useAuth';

interface LoginFormData {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const Login: React.FC = () => {
  //const { login, loading, error } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  // const onSubmit = async (data: LoginFormData) => {
  //   await login(data.username, data.password);
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Employee Management System
          </Typography>
          
          {/* {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} */}
          
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form>
            <TextField
              {...register('username')}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            
            <TextField
              {...register('password')}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              //disabled={loading}
              sx={{ mt: 2 }}
            >
              {/* {loading ? 'Logging in...' : 'Login'} */}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;