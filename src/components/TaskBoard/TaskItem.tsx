import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/context/TaskContext';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { AvatarGroup } from '@/components/ui/avatar-group';
import { cn } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getTypeClass = (type: string) => {
    return type.toLowerCase().replace(' ', '-');
  };

  const getPriorityClass = (priority: string) => {
    return `priority-${priority.toLowerCase()}`;
  };

  return (
    <TableRow className="group hover:bg-gray-50 transition-all duration-200">
      {/* Task Name Column */}
      <TableCell className="py-3">
        <div className="flex items-center">
          <Checkbox id={`task-${task.id}`} className="mr-2" />
          <label
            htmlFor={`task-${task.id}`}
            className="text-sm font-medium task-title cursor-pointer"
          >
            {task.name}
          </label>
        </div>
      </TableCell>

      {/* Description Column */}
      <TableCell className="py-3 text-sm text-gray-600 truncate">
        {task.description && task.description !== '-' ? task.description : '—'}
      </TableCell>

      {/* Estimation Column */}
      <TableCell className="py-3 text-xs text-gray-500">
        <span className="block truncate">
          {format(task.startDate, 'MMM d, yyyy')} -{' '}
          {format(task.dueDate, 'MMM d, yyyy')}
        </span>
      </TableCell>

      {/* Type Column */}
      <TableCell className="py-3">
        <Badge className={cn('badge-' + getTypeClass(task.type))}>
          {task.type}
        </Badge>
      </TableCell>

      {/* People Column */}
      <TableCell className="py-3">
        <div className="flex -space-x-2">
          {task.assignees.map((person, i) => (
            <Avatar key={i} className="h-6 w-6 border-2 border-white">
              <AvatarImage src={person.avatar} alt={person.name} />
              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </TableCell>

      {/* Priority Column */}
      <TableCell className="py-3 text-right">
        <Badge className={cn(getPriorityClass(task.priority))}>
          {task.priority}
        </Badge>
      </TableCell>

      {/* Actions Column */}
      <TableCell className="py-3 text-right">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 task-actions transition-opacity rounded-full"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
