import React, { useState } from 'react';
import { TaskProvider } from '@/context/TaskContext';
import Header from '@/components/TaskBoard/Header';
import TaskList from '@/components/TaskBoard/TaskList';
import TaskForm from '@/components/TaskBoard/TaskForm';

const Index = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [initialStatus, setInitialStatus] = useState<
    'To-do' | 'In Progress' | 'Completed'
  >('To-do');

  const handleNewTask = (
    status: 'To-do' | 'In Progress' | 'Completed' = 'To-do'
  ) => {
    setInitialStatus(status);
    setTaskFormOpen(true);
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto py-6 px-8">
          <Header onNewTask={() => handleNewTask()} />

          <div className="grid grid-cols-1 gap-8">
            <div>
              <TaskList
                status="To-do"
                onNewTask={() => handleNewTask('To-do')}
              />
            </div>
            <div>
              <TaskList
                status="In Progress"
                onNewTask={() => handleNewTask('In Progress')}
              />
            </div>
            <div>
              <TaskList
                status="Completed"
                onNewTask={() => handleNewTask('Completed')}
              />
            </div>
          </div>

          <TaskForm
            open={taskFormOpen}
            onOpenChange={setTaskFormOpen}
            initialStatus={initialStatus}
          />
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
