import React from 'react';
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useTask, Person } from '@/context/TaskContext';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { TaskFormValues } from '@/schemas/taskSchema';

interface TaskAssigneeFieldProps {
  control: Control<TaskFormValues>;
  watch: UseFormWatch<TaskFormValues>;
  setValue: UseFormSetValue<TaskFormValues>;
  getValues: UseFormGetValues<TaskFormValues>;
}

export const TaskAssigneeField: React.FC<TaskAssigneeFieldProps> = ({
  control,
  watch,
  setValue,
  getValues,
}) => {
  const { people } = useTask();
  const [assigneePopoverOpen, setAssigneePopoverOpen] = React.useState(false);

  // Helper functions for assignees
  const isPersonSelected = (personId: string) => {
    return getValues().assignees.some((p) => p.id === personId);
  };

  const toggleAssignee = (person: Person) => {
    const currentAssignees = getValues().assignees;

    if (isPersonSelected(person.id)) {
      setValue(
        'assignees',
        currentAssignees.filter((p) => p.id !== person.id),
        { shouldValidate: true }
      );
    } else {
      setValue('assignees', [...currentAssignees, person], {
        shouldValidate: true,
      });
    }
  };

  return (
    <FormField
      control={control}
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
                  {watch('assignees').length
                    ? `${watch('assignees').length} assignee${
                        watch('assignees').length > 1 ? 's' : ''
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
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>
                            {person.name?.charAt(0)}
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

          {watch('assignees').length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {watch('assignees').map((person) => (
                <div
                  key={person.id}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-xs"
                >
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name?.charAt(0)}</AvatarFallback>
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
  );
};
