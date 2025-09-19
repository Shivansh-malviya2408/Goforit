// import React, { useState } from 'react';
// import {
//   Calculator,
//   PieChart,
//   TrendingUp,
//   CreditCard,
//   Plane,
//   Hotel,
//   Car,
//   MapPin,
//   Plus,
//   Minus,
//   Target,
//   AlertTriangle
// } from 'lucide-react';

// // 1. Removed: : React.FC
// const Budget = () => {
//   // 2. Removed: type annotation <string> (though not strictly necessary here, it's good practice for conversion)
//   const [selectedTrip, setSelectedTrip] = useState('paris');

//   const trips = [
//     { id: 'paris', name: 'Paris Adventure', budget: 3500, spent: 2480 },
//     { id: 'tokyo', name: 'Tokyo Explorer', budget: 4200, spent: 150 }
//   ];

//   const budgetBreakdown = {
//     paris: {
//       categories: [
//         { name: 'Flights', budgeted: 1200, spent: 650, icon: Plane, color: 'blue' },
//         { name: 'Accommodation', budgeted: 1400, spent: 1120, icon: Hotel, color: 'teal' },
//         { name: 'Transportation', budgeted: 300, spent: 180, icon: Car, color: 'orange' },
//         { name: 'Activities', budgeted: 400, spent: 330, icon: MapPin, color: 'green' },
//         { name: 'Food & Dining', budgeted: 200, spent: 200, icon: Target, color: 'purple' }
//       ],
//       recentExpenses: [
//         { date: '2024-12-20', description: 'Hotel de Louvre', amount: 280, category: 'Accommodation' },
//         { date: '2024-12-19', description: 'Le Jules Verne Restaurant', amount: 85, category: 'Food & Dining' },
//         { date: '2024-12-19', description: 'Metro Pass', amount: 15, category: 'Transportation' },
//         { date: '2024-12-18', description: 'Louvre Museum Tickets', amount: 45, category: 'Activities' }
//       ]
//     },
//     tokyo: {
//       categories: [
//         { name: 'Flights', budgeted: 1500, spent: 0, icon: Plane, color: 'blue' },
//         { name: 'Accommodation', budgeted: 1800, spent: 0, icon: Hotel, color: 'teal' },
//         { name: 'Transportation', budgeted: 400, spent: 0, icon: Car, color: 'orange' },
//         { name: 'Activities', budgeted: 300, spent: 150, icon: MapPin, color: 'green' },
//         { name: 'Food & Dining', budgeted: 200, spent: 0, icon: Target, color: 'purple' }
//       ],
//       recentExpenses: [
//         { date: '2024-12-15', description: 'Travel Insurance', amount: 150, category: 'Activities' }
//       ]
//     }
//   };

//   // 3. Removed: Non-null assertion operator (!)
//   const currentTrip = trips.find(t => t.id === selectedTrip);
//   // Safely access currentData using square brackets, avoiding TypeScript's key assertion
//   const currentData = budgetBreakdown[selectedTrip];

//   // Since currentTrip is guaranteed to exist by useState, we can proceed.
//   if (!currentTrip || !currentData) {
//     return <div>Error: Trip data not found.</div>;
//   }
  
//   const spentPercentage = (currentTrip.spent / currentTrip.budget) * 100;
//   const remainingBudget = currentTrip.budget - currentTrip.spent;

//   // 4. Removed: type assertion (color: string) and keyof typeof colors
//   const getColorClasses = (color) => {
//     const colors = {
//       blue: { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-100 text-blue-800' },
//       teal: { bg: 'from-teal-500 to-teal-600', light: 'bg-teal-100 text-teal-800' },
//       orange: { bg: 'from-orange-500 to-orange-600', light: 'bg-orange-100 text-orange-800' },
//       green: { bg: 'from-green-500 to-green-600', light: 'bg-green-100 text-green-800' },
//       purple: { bg: 'from-purple-500 to-purple-600', light: 'bg-purple-100 text-purple-800' }
//     };
//     return colors[color] || colors.blue;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Budget Calculator</h1>
//           <p className="text-gray-600 mt-1">Track expenses and optimize your travel budget</p>
//         </div>
//         <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
//           <Plus className="w-5 h-5" />
//           <span className="font-medium">Add Expense</span>
//         </button>
//       </div>

//       {/* Trip Selector */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Calculator className="w-5 h-5 text-gray-600" />
//             <span className="font-medium text-gray-700">Select Trip:</span>
//             <div className="flex space-x-2">
//               {trips.map((trip) => (
//                 <button
//                   key={trip.id}
//                   onClick={() => setSelectedTrip(trip.id)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
//                     selectedTrip === trip.id
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {trip.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Budget Overview */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="text-center">
//               <div className="relative w-32 h-32 mx-auto mb-4">
//                 <svg className="w-32 h-32 transform -rotate-90">
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="currentColor"
//                     strokeWidth="8"
//                     fill="none"
//                     className="text-gray-200"
//                   />
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="currentColor"
//                     strokeWidth="8"
//                     fill="none"
//                     strokeDasharray={`${spentPercentage * 3.51} 351`}
//                     className={spentPercentage > 80 ? 'text-red-500' : spentPercentage > 60 ? 'text-yellow-500' : 'text-green-500'}
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">{spentPercentage.toFixed(0)}%</div>
//                     <div className="text-xs text-gray-600">Used</div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Budget</p>
//                   <p className="text-xl font-bold text-gray-900">${currentTrip.budget.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Spent</p>
//                   <p className="text-lg font-semibold text-gray-700">${currentTrip.spent.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Remaining</p>
//                   <p className={`text-lg font-semibold ${remainingBudget < currentTrip.budget * 0.2 ? 'text-red-600' : 'text-green-600'}`}>
//                     ${remainingBudget.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Category Breakdown */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget Breakdown</h2>
            
//             <div className="space-y-4">
//               {currentData.categories.map((category, index) => {
//                 const Icon = category.icon;
//                 const colors = getColorClasses(category.color);
//                 const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0;
//                 const isOverBudget = category.spent > category.budgeted;
                
//                 return (
//                   <div key={index} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-10 h-10 bg-gradient-to-r ${colors.bg} rounded-lg flex items-center justify-center`}>
//                           <Icon className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-900">{category.name}</h3>
//                           <p className="text-sm text-gray-600">
//                             ${category.spent.toLocaleString()} of ${category.budgeted.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {isOverBudget && <AlertTriangle className="w-4 h-4 text-red-500" />}
//                         <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
//                           {percentage.toFixed(0)}%
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full transition-all duration-300 ${
//                           isOverBudget ? 'bg-red-500' : `bg-gradient-to-r ${colors.bg}`
//                         }`}
//                         style={{ width: `${Math.min(percentage, 100)}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Expenses and Budget Tips */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Expenses */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
//             <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//               View All
//             </button>
//           </div>
          
//           <div className="space-y-3">
//             {currentData.recentExpenses.map((expense, index) => (
//               <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
//                 <div>
//                   <p className="font-medium text-gray-900">{expense.description}</p>
//                   <div className="flex items-center space-x-2 mt-1">
//                     <span className="text-xs text-gray-500">{expense.date}</span>
//                     <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
//                       {expense.category}
//                     </span>
//                   </div>
//                 </div>
//                 <span className="font-semibold text-gray-900">${expense.amount}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Budget Tips */}
//         <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
//           <div className="flex items-center space-x-3 mb-4">
//             <TrendingUp className="w-6 h-6" />
//             <h2 className="text-xl font-semibold">Smart Budget Tips</h2>
//           </div>
          
//           <div className="space-y-4">
//             <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
//               <h3 className="font-medium mb-2">💡 Optimize Spending</h3>
//               <p className="text-sm opacity-90">
//                 You're {spentPercentage > 70 ? 'approaching' : 'within'} your budget limits. 
//                 Consider booking activities in advance for better rates.
//               </p>
//             </div>
            
//             <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
//               <h3 className="font-medium mb-2">🎯 Category Alert</h3>
//               <p className="text-sm opacity-90">
//                 Your accommodation spending is on track. Consider allocating saved funds to activities.
//               </p>
//             </div>
            
//             <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
//               <h3 className="font-medium mb-2">💳 Payment Tip</h3>
//               <p className="text-sm opacity-90">
//                 Use cards with no foreign transaction fees to save 3-5% on international purchases.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Budget;

import React, { useState } from 'react';
import {
  Calculator,
  PieChart,
  TrendingUp,
  CreditCard,
  Plane,
  Hotel,
  Car,
  MapPin,
  Plus,
  Target,
  AlertTriangle
} from 'lucide-react';

const Budget = () => {
  const [selectedTrip, setSelectedTrip] = useState('paris');

  const trips = [
    { id: 'paris', name: 'Paris Adventure', budget: 3500, spent: 2480 },
    { id: 'tokyo', name: 'Tokyo Explorer', budget: 4200, spent: 150 }
  ];

  const budgetBreakdown = {
    paris: {
      categories: [
        { name: 'Flights', budgeted: 1200, spent: 650, icon: Plane, color: 'blue' },
        { name: 'Accommodation', budgeted: 1400, spent: 1120, icon: Hotel, color: 'teal' },
        { name: 'Transportation', budgeted: 300, spent: 180, icon: Car, color: 'orange' },
        { name: 'Activities', budgeted: 400, spent: 330, icon: MapPin, color: 'green' },
        { name: 'Food & Dining', budgeted: 200, spent: 200, icon: Target, color: 'purple' }
      ],
      recentExpenses: [
        { date: '2024-12-20', description: 'Hotel de Louvre', amount: 280, category: 'Accommodation' },
        { date: '2024-12-19', description: 'Le Jules Verne Restaurant', amount: 85, category: 'Food & Dining' },
        { date: '2024-12-19', description: 'Metro Pass', amount: 15, category: 'Transportation' },
        { date: '2024-12-18', description: 'Louvre Museum Tickets', amount: 45, category: 'Activities' }
      ]
    },
    tokyo: {
      categories: [
        { name: 'Flights', budgeted: 1500, spent: 0, icon: Plane, color: 'blue' },
        { name: 'Accommodation', budgeted: 1800, spent: 0, icon: Hotel, color: 'teal' },
        { name: 'Transportation', budgeted: 400, spent: 0, icon: Car, color: 'orange' },
        { name: 'Activities', budgeted: 300, spent: 150, icon: MapPin, color: 'green' },
        { name: 'Food & Dining', budgeted: 200, spent: 0, icon: Target, color: 'purple' }
      ],
      recentExpenses: [
        { date: '2024-12-15', description: 'Travel Insurance', amount: 150, category: 'Activities' }
      ]
    }
  };

  const currentTrip = trips.find(t => t.id === selectedTrip);
  const currentData = budgetBreakdown[selectedTrip];

  if (!currentTrip || !currentData) {
    return <div className="bg-gray-900 text-red-400 p-8">Error: Trip data not found.</div>;
  }
  
  const spentPercentage = (currentTrip.spent / currentTrip.budget) * 100;
  const remainingBudget = currentTrip.budget - currentTrip.spent;

  const getColorClasses = (color) => {
    // Adjusted colors for better dark theme visibility and contrast
    const colors = {
      blue: { bg: 'from-blue-600 to-blue-700', text: 'text-blue-400', progress: 'bg-blue-500' },
      teal: { bg: 'from-teal-600 to-teal-700', text: 'text-teal-400', progress: 'bg-teal-500' },
      orange: { bg: 'from-orange-600 to-orange-700', text: 'text-orange-400', progress: 'bg-orange-500' },
      green: { bg: 'from-green-600 to-green-700', text: 'text-green-400', progress: 'bg-green-500' },
      purple: { bg: 'from-purple-600 to-purple-700', text: 'text-purple-400', progress: 'bg-purple-500' }
    };
    return colors[color] || colors.blue;
  };

  return (
    // MAIN BACKGROUND: Deep dark gray
    <div className="space-y-6 bg-gray-900 min-h-screen p-8 text-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Budget Calculator</h1>
          <p className="text-gray-400 mt-1">Track expenses and optimize your travel budget</p>
        </div>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-black/30">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Expense</span>
        </button>
      </div>

      {/* Trip Selector */}
      {/* ELEMENT: Card background slightly lighter than main background */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calculator className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-300">Select Trip:</span>
            <div className="flex space-x-2">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => setSelectedTrip(trip.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border ${
                    selectedTrip === trip.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-700 text-gray-300 border-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {trip.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          {/* ELEMENT: Card background slightly lighter than main background */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  {/* Progress background color changed for dark theme */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  {/* Progress color adjusted for dark theme visibility */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${spentPercentage * 3.51} 351`}
                    className={spentPercentage > 80 ? 'text-red-500' : spentPercentage > 60 ? 'text-yellow-500' : 'text-green-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{spentPercentage.toFixed(0)}%</div>
                    <div className="text-xs text-gray-400">Used</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-400">Total Budget</p>
                  <p className="text-xl font-bold text-white">${currentTrip.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Spent</p>
                  <p className="text-lg font-semibold text-gray-300">${currentTrip.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Remaining</p>
                  <p className={`text-lg font-semibold ${remainingBudget < currentTrip.budget * 0.2 ? 'text-red-400' : 'text-green-400'}`}>
                    ${remainingBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-3">
          {/* ELEMENT: Card background slightly lighter than main background */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Budget Breakdown</h2>
            
            <div className="space-y-4">
              {currentData.categories.map((category, index) => {
                const Icon = category.icon;
                const colors = getColorClasses(category.color);
                const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0;
                const isOverBudget = category.spent > category.budgeted;
                
                return (
                  <div key={index} className="p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {/* Icon background uses vibrant gradient */}
                        <div className={`w-10 h-10 bg-gradient-to-r ${colors.bg} rounded-lg flex items-center justify-center shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{category.name}</h3>
                          <p className="text-sm text-gray-400">
                            ${category.spent.toLocaleString()} of ${category.budgeted.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Alert icon color adjusted */}
                        {isOverBudget && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        <span className={`text-sm font-medium ${isOverBudget ? 'text-red-400' : colors.text}`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress bar background and fill color changed */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isOverBudget ? 'bg-red-500' : colors.progress
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Expenses and Budget Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Expenses</h2>
            <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {currentData.recentExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-700/50 hover:bg-gray-700 transition-colors">
                <div>
                  <p className="font-medium text-white">{expense.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{expense.date}</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-green-400">${expense.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Tips */}
        {/* ELEMENT: Tips card uses a strong, contrasting gradient */}
        <div className="bg-gradient-to-r from-teal-700 to-green-700 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold">Smart Budget Tips</h2>
          </div>
          
          <div className="space-y-4">
            {/* Inner cards with dark/transparent background */}
            <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <h3 className="font-medium mb-2">💡 Optimize Spending</h3>
              <p className="text-sm opacity-90">
                You're **{spentPercentage > 70 ? 'approaching' : 'within'}** your budget limits. 
                Consider booking activities in advance for better rates.
              </p>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <h3 className="font-medium mb-2">🎯 Category Alert</h3>
              <p className="text-sm opacity-90">
                Your accommodation spending is on track. Consider allocating saved funds to activities.
              </p>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <h3 className="font-medium mb-2">💳 Payment Tip</h3>
              <p className="text-sm opacity-90">
                Use cards with **no foreign transaction fees** to save 3-5% on international purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
 