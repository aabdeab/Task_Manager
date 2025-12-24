import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add,
  ArrowBack,
  Edit,
  Delete,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import TaskItem from '../components/TaskItem';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [editProject, setEditProject] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const [projectData, tasksData] = await Promise.all([
        projectService.getProjectById(id),
        taskService.getAllTasks(id),
      ]);
      setProject(projectData);
      setTasks(tasksData);
      setEditProject({ title: projectData.title, description: projectData.description || '' });
    } catch (error) {
      toast.error('Erreur lors du chargement du projet');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !newTask.dueDate) {
      toast.error('Le titre et la date sont requis');
      return;
    }

    setCreating(true);
    try {
      const created = await taskService.createTask(
        id,
        newTask.title,
        newTask.description,
        newTask.dueDate
      );
      setTasks([...tasks, created]);
      setProject({ ...project, totalTasks: project.totalTasks + 1 });
      toast.success('Tâche créée!');
      setOpenTaskDialog(false);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      toast.error('Erreur lors de la création de la tâche');
    } finally {
      setCreating(false);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    if (completed) return; // Already completed, do nothing
    
    try {
      console.log('Completing task:', { projectId: id, taskId });
      console.log('Request URL:', `${id}/tasks/${taskId}/complete`);
      
      const updatedTask = await taskService.completeTask(id, taskId);
      console.log('Task completed successfully:', updatedTask);
      
      // Update tasks list with the completed task
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t)));
      
      // Calculate new progress
      const newCompletedTasks = project.completedTasks + 1;
      const newProgressPercentage = project.totalTasks > 0 
        ? (newCompletedTasks / project.totalTasks) * 100 
        : 0;
      
      setProject({
        ...project,
        completedTasks: newCompletedTasks,
        progressPercentage: newProgressPercentage,
      });
      
      toast.success('Tâche terminée! 🎉');
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error message:', error.message);
      
      if (error.response) {
        // Server responded with error
        toast.error(`Erreur ${error.response.status}: ${error.response.data?.message || 'Erreur serveur'}`);
      } else if (error.request) {
        // Request made but no response
        toast.error('Pas de réponse du serveur. Vérifiez que le backend est démarré.');
      } else {
        // Something else happened
        toast.error(`Erreur: ${error.message}`);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Supprimer cette tâche?')) return;

    try {
      await taskService.deleteTask(id, taskId);
      const deletedTask = tasks.find((t) => t.id === taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      setProject({
        ...project,
        totalTasks: project.totalTasks - 1,
        completedTasks: deletedTask.completed
          ? project.completedTasks - 1
          : project.completedTasks,
      });
      toast.success('Tâche supprimée');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleUpdateProject = async () => {
    if (!editProject.title.trim()) {
      toast.error('Le titre est requis');
      return;
    }

    setUpdating(true);
    try {
      const updated = await projectService.updateProject(
        id,
        editProject.title,
        editProject.description
      );
      setProject(updated);
      toast.success('Projet mis à jour!');
      setOpenEditDialog(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Supprimer ce projet et toutes ses tâches?')) return;

    try {
      await projectService.deleteProject(id);
      toast.success('Projet supprimé');
      navigate('/dashboard');
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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          sx={{ mb: 2 }}
        >
          Retour
        </Button>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {project.title}
              </Typography>
              {project.description && (
                <Typography variant="body1" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
              )}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={`${project.totalTasks} tâche(s)`} color="primary" size="small" />
                <Chip label={`${project.completedTasks} terminée(s)`} color="success" size="small" />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Progression: {project.progressPercentage.toFixed(0)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={project.progressPercentage}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            </Box>
            <Box>
              <IconButton color="primary" onClick={() => setOpenEditDialog(true)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={handleDeleteProject}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Tâches</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenTaskDialog(true)}>
            Nouvelle Tâche
          </Button>
        </Box>

        {tasks.length === 0 ? (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Aucune tâche. Créez-en une pour commencer!
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </Box>
        )}

        {/* Create Task Dialog */}
        <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Créer une nouvelle tâche</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre de la tâche"
              type="text"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Date d'échéance"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTaskDialog(false)}>Annuler</Button>
            <Button onClick={handleCreateTask} variant="contained" disabled={creating}>
              {creating ? <CircularProgress size={24} /> : 'Créer'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Project Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Modifier le projet</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre du projet"
              type="text"
              fullWidth
              value={editProject.title}
              onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={editProject.description}
              onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
            <Button onClick={handleUpdateProject} variant="contained" disabled={updating}>
              {updating ? <CircularProgress size={24} /> : 'Sauvegarder'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ProjectDetails;
