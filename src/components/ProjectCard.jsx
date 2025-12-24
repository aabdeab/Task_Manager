import {
  Card,
  CardContent,
  CardActions,
  Typography,
  LinearProgress,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Delete, Folder } from '@mui/icons-material';

const ProjectCard = ({ project, onDelete, onClick }) => {
  return (
    <Card
      elevation={2}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent onClick={onClick}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Folder sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" noWrap>
            {project.title}
          </Typography>
        </Box>
        {project.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={`${project.totalTasks} tâche(s)`} size="small" />
          <Chip
            label={`${project.completedTasks} terminée(s)`}
            size="small"
            color="success"
            variant={project.completedTasks > 0 ? 'filled' : 'outlined'}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progression: {project.progressPercentage.toFixed(0)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={project.progressPercentage}
            sx={{ height: 6, borderRadius: 1 }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
