import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Utensils, TrendingUp, Settings, Download, Trash2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground p-4 shadow-md flex flex-col">
      <div className="text-2xl font-bold mb-6 text-sidebar-primary">Health Tracker</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <Home className="mr-3" size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <User className="mr-3" size={20} />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/meal-logging" className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <Utensils className="mr-3" size={20} />
              Meal Logging
            </Link>
          </li>
          <li>
            <Link to="/nutrient-tracking" className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <TrendingUp className="mr-3" size={20} />
              Nutrient Tracking
            </Link>
          </li>
          <li>
            <Link to="/diet-recommendations" className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <Settings className="mr-3" size={20} />
              Diet Recommendations
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <ul className="space-y-2">
          <li>
            <button className="flex items-center w-full p-2 rounded-md text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <Download className="mr-3" size={20} />
              Export Data (CSV)
            </button>
          </li>
          <li>
            <button className="flex items-center w-full p-2 rounded-md text-left hover:bg-destructive hover:text-white transition-colors">
              <Trash2 className="mr-3" size={20} />
              Delete Profile & Data
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
