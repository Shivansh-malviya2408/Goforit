import React from 'react';

import {
  LayoutDashboard,
  Calendar,
  Plane,
  KeyRound,
  Calculator,
  Bell,
  User,
  MapPin,
  Route
} from 'lucide-react';
import { buffer } from 'stream/consumers';
import Logout from './Logout';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planatrip', label: 'Plan a Trip', icon: Route },
  { id: 'bookings', label: 'Bookings', icon: Plane },
  { id: 'itinerary', label: 'Itinerary', icon: MapPin },
  { id: 'digital-keys', label: 'Digital Keys', icon: KeyRound },
  { id: 'budget', label: 'Budget', icon: Calculator },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black shadow-xl border-r z-10">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
        
          <h1 className="text-3xl font-bold text-black gradient-text">
            Go For It
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <>
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-muted text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-primary' : 'group-hover:scale-110'
                }`} />
                <span className="font-medium text-black">{item.label}</span>
                <Logout/>
              </button>
             
              </>
               
            );
          })}
        </nav>
         

      </div>
    </div>
  );
};

export default Sidebar;