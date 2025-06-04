import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    MoreVert,
    Person,
    Schedule,
    CalendarToday,
} from '@mui/icons-material';
import { format, differenceInDays, parseISO, isValid } from 'date-fns';
import type { Task } from './tasksApi';
import { getStatusInfo } from '../../types/Project';

interface TaskCardProps {
    task: Task;
    onMenuOpen: (event: React.MouseEvent<HTMLElement>, task: Task) => void;
}

const formatSafeDate = (date: string | Date | null | undefined): string => {
    if (!date) return '—';
    const parsed = typeof date === 'string' ? parseISO(date) : new Date(date);
    return isValid(parsed) ? format(parsed, 'dd/MM/yyyy') : '—';
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onMenuOpen }) => {
    const statusInfo = getStatusInfo(task.status);

    const getDaysRemaining = (deadline: string) => {
        try {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            return differenceInDays(deadlineDate, today);
        } catch {
            return 0;
        }
    };

    const daysRemaining = getDaysRemaining(task.deadline);
    const isOverdue = daysRemaining < 0;
    const isUrgent = daysRemaining <= 3 && daysRemaining >= 0;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: isOverdue ? '2px solid' : '1px solid',
                borderColor: isOverdue ? 'error.main' : 'divider',
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip
                        label={statusInfo.label}
                        size="small"
                        sx={{
                            bgcolor: statusInfo.color,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    />
                    <IconButton
                        size="small"
                        onClick={(e) => onMenuOpen(e, task)}
                        sx={{ mt: -1, mr: -1 }}
                    >
                        <MoreVert fontSize="small" />
                    </IconButton>
                </Box>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        lineHeight: 1.2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {task.task_name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '3em',
                    }}
                >
                    {task.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {task.performed_by ? (
                            <Tooltip title={task.performed_by.email}>
                                <span>{task.performed_by.user_name}</span>
                            </Tooltip>
                        ) : (
                            'Unassigned'
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {formatSafeDate(task.deadline)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{
                        fontSize: 18,
                        color: isOverdue ? 'error.main' : isUrgent ? 'warning.main' : 'text.secondary',
                        mr: 1
                    }} />
                    <Typography
                        variant="body2"
                        sx={{
                            color: isOverdue ? 'error.main' : isUrgent ? 'warning.main' : 'text.secondary',
                            fontWeight: isOverdue || isUrgent ? 'bold' : 'normal',
                        }}
                    >
                        {isOverdue
                            ? `${Math.abs(daysRemaining)} days overdue`
                            : isUrgent
                                ? `${daysRemaining} days left`
                                : `${daysRemaining} days remaining`}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary">
                        Created by {task.created_by?.user_name ?? 'Unknown'} • {formatSafeDate(task.createdAt)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;