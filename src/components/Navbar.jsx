import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Logout, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <DashboardIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.name || user.email}
          </Typography>
        )}
        <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
          Déconnexion
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
