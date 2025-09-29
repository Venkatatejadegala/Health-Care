import React from 'react';
// Removed unused Link import
import { ModeToggle } from './ui/theme-toggle';
import { useAuth } from '../../frontend/src/context/AuthContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-card text-card-foreground p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Welcome{user ? `, ${user.username}` : ''}!</h2>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        {user && (
          <Button className="bg-transparent hover:bg-gray-200" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
