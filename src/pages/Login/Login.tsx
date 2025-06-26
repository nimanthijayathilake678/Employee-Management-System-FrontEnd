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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme'; 
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  // onSubmit function
  const onSubmit = async (data: LoginFormData) => {
    // await login(data.username, data.password);
    // If login is successful:
    navigate('/dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Employee Management System
            </Typography>
            
            {/* {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} */}
            
            <form onSubmit={handleSubmit(onSubmit)}>
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
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;