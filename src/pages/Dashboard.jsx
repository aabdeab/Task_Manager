import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { toast } from 'react-toastify';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.title.trim()) {
      toast.error('Le titre est requis');
      return;
    }

    setCreating(true);
    try {
      const created = await projectService.createProject(
        newProject.title,
        newProject.description
      );
      setProjects([...projects, created]);
      toast.success('Projet créé avec succès!');
      setOpenDialog(false);
      setNewProject({ title: '', description: '' });
    } catch (error) {
      toast.error('Erreur lors de la création du projet');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      return;
    }

    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      toast.success('Projet supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Mes Projets
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Nouveau Projet
          </Button>
        </Box>

        {projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Aucun projet pour le moment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Créez votre premier projet pour commencer!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Créer un projet
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onDelete={handleDeleteProject}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Create Project Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Créer un nouveau projet</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre du projet"
              type="text"
              fullWidth
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
            <Button onClick={handleCreateProject} variant="contained" disabled={creating}>
              {creating ? <CircularProgress size={24} /> : 'Créer'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard;
