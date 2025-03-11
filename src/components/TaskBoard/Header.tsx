import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { AvatarGroup } from '../ui/avatar-group';
import userMale from '../../assets/user-male.jpg';
import userFem from '../../assets/user-fem.jpg';

interface HeaderProps {
  onNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask }) => {
  return (
    <div className="flex flex-col space-y-4 pb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-md bg-task-purple/10 text-task-purple flex items-center justify-center">
            <span className="font-semibold">C</span>
          </div>
          <h1 className="text-xl font-semibold">Craftboard Project</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={userMale} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={userFem} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={userMale} />
              <AvatarFallback>TW</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={userFem} />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
          </div>

          <Button variant="outline" size="sm" className="ml-2">
            Invite
          </Button>
        </div>
      </div>

      <div className="flex space-x-8 border-b">
        <Button
          variant="link"
          className="px-0 text-task-purple border-b-2 border-task-purple"
        >
          Kanban
        </Button>
        <Button variant="link" className="px-0 text-gray-500">
          Timeline
        </Button>
        <Button variant="link" className="px-0 text-gray-500">
          List
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-8" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button
            onClick={onNewTask}
            size="sm"
            className="flex items-center bg-task-purple hover:bg-task-purple/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
