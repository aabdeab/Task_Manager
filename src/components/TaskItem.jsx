import { Paper, Box, Checkbox, Typography, IconButton, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import dayjs from 'dayjs';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const isOverdue = !task.completed && dayjs(task.dueDate).isBefore(dayjs(), 'day');
  const isDueSoon = !task.completed && dayjs(task.dueDate).diff(dayjs(), 'day') <= 3 && !isOverdue;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        opacity: task.completed ? 0.7 : 1,
        borderLeft: isOverdue ? '4px solid #f44336' : isDueSoon ? '4px solid #ff9800' : '4px solid transparent',
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
        disabled={task.completed}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            fontWeight: task.completed ? 'normal' : 500,
          }}
        >
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Échéance: {dayjs(task.dueDate).format('DD/MM/YYYY')}
          </Typography>
          {isOverdue && <Chip label="En retard" color="error" size="small" />}
          {isDueSoon && <Chip label="Bientôt" color="warning" size="small" />}
          {task.completed && <Chip label="Terminée" color="success" size="small" />}
        </Box>
      </Box>
      <IconButton color="error" onClick={() => onDelete(task.id)}>
        <Delete />
      </IconButton>
    </Paper>
  );
};

export default TaskItem;
