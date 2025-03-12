import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TaskStatus, useTask, Task } from '@/context/TaskContext';
import { TaskFormValues, taskFormSchema } from '@/schemas/taskSchema';
import { TaskNameField } from './TaskNameField';
import { TaskDescriptionField } from './TaskDescriptionField';
import { TaskDateFields } from './TaskDateFields';
import { TaskTypeAndPriorityFields } from './TaskTypeAndPriorityFields';
// import { TaskAssigneeField } from './TaskAssigneeField';

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialStatus?: TaskStatus;
}

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onOpenChange,
  initialStatus = 'To-do',
}) => {
  const { addTask } = useTask();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      type: 'Dashboard',
      priority: 'Medium',
      assignees: [],
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: '',
        description: '',
        startDate: new Date(),
        dueDate: new Date(),
        type: 'Dashboard',
        priority: 'Medium',
        assignees: [],
      });
    }
  }, [open, form]);

  const onSubmit = (values: TaskFormValues) => {
    // Make sure we provide all required properties to addTask
    addTask({
      name: values.name,
      description: values.description || '',
      startDate: values.startDate,
      dueDate: values.dueDate,
      type: values.type,
      priority: values.priority,
      assignees: values.assignees,
      status: initialStatus,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <TaskNameField control={form.control} />
              <TaskDescriptionField control={form.control} />
              <TaskDateFields control={form.control} />
              <TaskTypeAndPriorityFields control={form.control} />
              {/* <TaskAssigneeField
                control={form.control}
                watch={form.watch}
                setValue={form.setValue}
                getValues={form.getValues}
              /> */}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
