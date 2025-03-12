import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskFormValues } from '@/schemas/taskSchema';

interface TaskNameFieldProps {
  control: Control<TaskFormValues>;
}

export const TaskNameField: React.FC<TaskNameFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Task Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter task name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
