import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { format } from 'date-fns';

// Define task types
export type TaskType = 'Dashboard' | 'Mobile App';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'To-do' | 'In Progress' | 'Completed';

export interface Person {
  id?: string;
  name?: string;
  avatar?: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  type: TaskType;
  assignees: Person[];
  priority: TaskPriority;
  status: TaskStatus;
}

// Context interface
interface TaskContextType {
  tasks: Task[];
  people: Person[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample people data
const samplePeople: Person[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/lovable-uploads/59557754-fd3e-40ae-8a27-44d852ae77a7.png',
  },
  {
    id: '2',
    name: 'Jamie Smith',
    avatar: '/lovable-uploads/59557754-fd3e-40ae-8a27-44d852ae77a7.png',
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    avatar: '/lovable-uploads/59557754-fd3e-40ae-8a27-44d852ae77a7.png',
  },
  {
    id: '4',
    name: 'Morgan Lee',
    avatar: '/lovable-uploads/59557754-fd3e-40ae-8a27-44d852ae77a7.png',
  },
];

// Initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Employee Details',
    description: 'Create a page where there is information about employees',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Dashboard',
    assignees: [samplePeople[0], samplePeople[1]],
    priority: 'Medium',
    status: 'To-do',
  },
  {
    id: '2',
    name: 'Darkmode version',
    description: 'Darkmode version for all screens',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Mobile App',
    assignees: [samplePeople[0], samplePeople[2]],
    priority: 'Low',
    status: 'To-do',
  },
  {
    id: '3',
    name: 'Super Admin Role',
    description: '-',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Dashboard',
    assignees: [samplePeople[0], samplePeople[1]],
    priority: 'Medium',
    status: 'To-do',
  },
  {
    id: '4',
    name: 'Super Admin Role',
    description: '-',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Dashboard',
    assignees: [samplePeople[2]],
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: '5',
    name: 'Settings Page',
    description: '-',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Mobile App',
    assignees: [samplePeople[0], samplePeople[3]],
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: '6',
    name: 'KPI and Employee Statistics',
    description: 'Create a design that displays KPIs and employee statistics',
    startDate: new Date('2024-02-14'),
    dueDate: new Date('2024-03-01'),
    type: 'Dashboard',
    assignees: [samplePeople[1], samplePeople[2]],
    priority: 'Low',
    status: 'In Progress',
  },
];

// Provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [people] = useState<Person[]>(samplePeople);

  // Add a new task
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update a task
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Get tasks by status
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        people,
        addTask,
        updateTask,
        deleteTask,
        getTasksByStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

// Utility function to format date range
export const formatDateRange = (startDate: Date, endDate: Date) => {
  return `${format(startDate, 'MMM d, yyyy')} - ${format(
    endDate,
    'MMM d, yyyy'
  )}`;
};
