import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Person,
  TaskPriority,
  TaskType,
  TaskStatus,
  useTask,
} from '@/context/TaskContext';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { taskFormSchema, TaskFormValues } from '@/schemas/taskSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
  const { addTask, people } = useTask();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      type: 'Dashboard' as TaskType,
      priority: 'Medium' as TaskPriority,
      assignees: [] as Person[],
    },
  });

  const [assigneePopoverOpen, setAssigneePopoverOpen] = React.useState(false);
  const [startDateOpen, setStartDateOpen] = React.useState(false);
  const [dueDateOpen, setDueDateOpen] = React.useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: '',
        description: '',
        startDate: new Date(),
        dueDate: new Date(),
        type: 'Dashboard' as TaskType,
        priority: 'Medium' as TaskPriority,
        assignees: [] as Person[],
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

  // Helper functions for assignees
  const isPersonSelected = (personId: string) => {
    return form.getValues().assignees.some((p) => p.id === personId);
  };

  const toggleAssignee = (person: Person) => {
    const currentAssignees = form.getValues().assignees;

    if (isPersonSelected(person.id)) {
      form.setValue(
        'assignees',
        currentAssignees.filter((p) => p.id !== person.id),
        { shouldValidate: true }
      );
    } else {
      form.setValue('assignees', [...currentAssignees, person], {
        shouldValidate: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-fade-in animate-slide-in">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover
                        open={startDateOpen}
                        onOpenChange={setStartDateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setStartDateOpen(false);
                            }}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setDueDateOpen(false);
                            }}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dashboard">Dashboard</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="assignees"
                render={() => (
                  <FormItem>
                    <FormLabel>Assigned People</FormLabel>
                    <Popover
                      open={assigneePopoverOpen}
                      onOpenChange={setAssigneePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={assigneePopoverOpen}
                            className="w-full justify-between"
                          >
                            {form.watch('assignees').length
                              ? `${form.watch('assignees').length} assignee${
                                  form.watch('assignees').length > 1 ? 's' : ''
                                } selected`
                              : 'Select people'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="pointer-events-auto">
                          <CommandInput placeholder="Search people..." />
                          <CommandEmpty>No person found.</CommandEmpty>
                          <CommandGroup>
                            {people.map((person) => (
                              <CommandItem
                                key={person.id}
                                value={person.id}
                                onSelect={() => toggleAssignee(person)}
                                className="flex items-center"
                              >
                                <div className="flex items-center flex-1 gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={person.avatar}
                                      alt={person.name}
                                    />
                                    <AvatarFallback>
                                      {person.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{person.name}</span>
                                </div>
                                <Check
                                  className={cn(
                                    'h-4 w-4 ml-auto',
                                    isPersonSelected(person.id)
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {form.watch('assignees').length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch('assignees').map((person) => (
                          <div
                            key={person.id}
                            className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-xs"
                          >
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={person.avatar}
                                alt={person.name}
                              />
                              <AvatarFallback>
                                {person.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{person.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
