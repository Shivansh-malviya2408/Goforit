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
                className={`w-full flex text-white items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-muted text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-primary' : 'group-hover:scale-110'
                }`} />
                <span className="font-medium text-white">{item.label}</span>
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

// import React from 'react';
// import {
//   LayoutDashboard,
//   Calendar,
//   Plane,
//   KeyRound,
//   Calculator,
//   Bell,
//   User,
//   MapPin,
//   Route,
//   DollarSign // Importing the appropriate icon for Currency
// } from 'lucide-react';
// // The 'buffer' and 'stream/consumers' imports are not relevant for this component, 
// // but I'll leave them in your code block as requested.
// import { buffer } from 'stream/consumers';
// import Logout from './Logout';

// interface SidebarProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, available: true },
//   { id: 'planatrip', label: 'Plan a Trip', icon: Route, available: true },
//   { id: 'bookings', label: 'Bookings', icon: Plane, available: true },
//   { id: 'itinerary', label: 'Itinerary', icon: MapPin, available: true },
//   { id: 'digital-keys', label: 'Digital Keys', icon: KeyRound, available: true },
//   { id: 'budget', label: 'Budget', icon: Calculator, available: true },
//   { id: 'notifications', label: 'Notifications', icon: Bell, available: true },
  
//   // NEW UNAVAILABLE ITEM: Currency Converter
//   { id: 'converter', label: 'Currency Converter', icon: DollarSign, available: false }, 
  
//   { id: 'profile', label: 'Profile', icon: User, available: true },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="fixed left-0 top-0 h-full w-64 bg-black shadow-xl border-r z-10">
//       <div className="p-6">
//         <div className="flex items-center space-x-4 mb-8">
        
//           {/* NOTE: You have text-black on a black background here. You may want to change this. */}
//           <h1 className="text-3xl font-bold text-white gradient-text">
//             Go For It
//           </h1>
//         </div>

//         <nav className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeTab === item.id;
//             const isAvailable = item.available;

//             // Define conditional classes for disabled/unavailable state
//             const disabledClasses = !isAvailable 
//               ? 'text-gray-600 bg-gray-900 cursor-not-allowed hover:bg-gray-900 hover:text-gray-600'
//               : '';
            
//             // Define active/hover classes for available items
//             const activeClasses = isAvailable && isActive
//               ? 'bg-muted text-primary shadow-sm'
//               : isAvailable
//               ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
//               : '';
            
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   // Only allow interaction if the item is available
//                   if (isAvailable) {
//                     setActiveTab(item.id);
//                   }
//                 }}
//                 disabled={!isAvailable} // Disable button interaction
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
//                   // Apply active/hover classes first, then override with disabled classes
//                   activeClasses 
//                 } ${disabledClasses}`}
//               >
//                 <Icon className={`w-5 h-5 transition-transform duration-200 ${
//                   isActive && isAvailable ? 'text-primary' : (isAvailable ? 'group-hover:scale-110' : 'text-gray-600')
//                 }`} />
//                 <span className={`font-medium ${!isAvailable ? 'text-gray-600' : 'text-black'}`}>{item.label}</span>
//                 {/* NOTE: Placing the Logout component here will show it on every single button. 
//                    It is highly recommended to move <Logout/> outside of this map loop 
//                    and position it absolutely at the bottom of the sidebar. */}
//                 {/* <Logout/> */}
//               </button>
//             );
//           })}
//         </nav>
         

//       </div>
//     </div>
//   );
// };

// export default Sidebar;