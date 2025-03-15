import React from 'react';
import { Plus } from 'lucide-react';
import { TaskStatus, useTask } from '@/context/TaskContext';
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from '@/components/ui/table';

interface TaskListProps {
  status: TaskStatus;
  onNewTask?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ status, onNewTask }) => {
  const { getTasksByStatus } = useTask();
  const tasks = getTasksByStatus(status);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                'h-4 w-4 transition-transform',
                status === 'To-do' ? 'rotate-0' : 'rotate-90'
              )}
            >
              <polyline points="6 9 12 9"></polyline>
              <polyline points="9 6 12 9 9 12"></polyline>
            </svg>
          </button>
          <h3 className="font-medium">{status}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full hover:bg-gray-100"
          onClick={onNewTask}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {tasks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[200px] text-xs font-medium text-gray-500">
                Task Name
              </TableHead>
              <TableHead className="w-[300px] text-xs font-medium text-gray-500">
                Description
              </TableHead>
              <TableHead className="w-[200px] text-xs font-medium text-gray-500">
                Estimation
              </TableHead>
              <TableHead className="w-[100px] text-xs font-medium text-gray-500">
                Type
              </TableHead>
              <TableHead className="w-[200px] text-xs font-medium text-gray-500">
                People
              </TableHead>
              <TableHead className="w-[100px] text-xs font-medium text-gray-500">
                Priority
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-sm text-gray-500">
          No tasks in {status}
        </div>
      )}
    </div>
  );
};

export default TaskList;
