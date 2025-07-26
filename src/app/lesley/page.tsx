'use client'
import React, { useState } from 'react';
import { X, Smartphone, Monitor, Coffee, Lightbulb, Leaf, PenTool, FileText, Calendar } from 'lucide-react';
import Image from 'next/image';

// Define the type for workspace items
interface WorkspaceItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { left: string; top: string };
  description: string;
  specs: string[];
}

const InteractiveWorkspace = () => {
  const [selectedItem, setSelectedItem] = useState<WorkspaceItem | null>(null);

  const items: WorkspaceItem[] = [
    {
      id: 'phone',
      name: 'Smartphone',
      icon: <Smartphone className="w-6 h-6" />,
      position: { left: '18%', top: '88%' },
      description: 'Stay connected with your mobile device. Check messages, make calls, and access your favorite apps on the go.',
      specs: ['iOS/Android', '128GB Storage', '5G Connectivity', 'Dual Camera']
    },
    {
      id: 'laptop',
      name: 'MacBook Pro',
      icon: <Monitor className="w-6 h-6" />,
      position: { left: '50%', top: '65%' },
      description: 'Powerful laptop for productivity and creativity. Perfect for coding, design work, and video calls.',
      specs: ['M2 Chip', '16GB RAM', '512GB SSD', '13.3" Retina Display']
    },
    {
      id: 'mug',
      name: 'Coffee Mug',
      icon: <Coffee className="w-6 h-6" />,
      position: { left: '85%', top: '85%' },
      description: 'Essential fuel for productivity. This ceramic mug holds your favorite brew to keep you energized.',
      specs: ['Ceramic Material', '350ml Capacity', 'Microwave Safe', 'Dishwasher Safe']
    },
    {
      id: 'lamp',
      name: 'Desk Lamp',
      icon: <Lightbulb className="w-6 h-6" />,
      position: { left: '18%', top: '20%' },
      description: 'Adjustable LED desk lamp providing optimal lighting for work and study sessions.',
      specs: ['LED Bulb', 'Adjustable Arm', 'Touch Control', '3 Brightness Levels']
    },
    {
      id: 'plant',
      name: 'Desk Plant',
      icon: <Leaf className="w-6 h-6" />,
      position: { left: '32%', top: '75%' },
      description: 'Bring nature to your workspace. This low-maintenance plant improves air quality and adds life to your desk.',
      specs: ['Low Light Tolerant', 'Air Purifying', 'Easy Care', 'Pet Friendly']
    },
    {
      id: 'pen',
      name: 'Pen & Paper',
      icon: <PenTool className="w-6 h-6" />,
      position: { left: '72%', top: '92%' },
      description: 'Classic writing instruments for notes and sketches. Perfect for brainstorming and quick ideas.',
      specs: ['Smooth Writing', 'High Quality Paper', 'Ergonomic Design', 'Refillable']
    },
    {
      id: 'board',
      name: 'Vision Board',
      icon: <FileText className="w-6 h-6" />,
      position: { left: '65%', top: '25%' },
      description: 'Inspiration board with goals, tasks, and creative ideas. Stay motivated and organized.',
      specs: ['Cork Board', 'Colorful Notes', 'Task Planning', 'Visual Organization']
    },
    {
      id: 'todo',
      name: 'Todo List',
      icon: <Calendar className="w-6 h-6" />,
      position: { left: '78%', top: '18%' },
      description: 'Digital task management keeping you on track with daily goals and priorities.',
      specs: ['Task Management', 'Priority Levels', 'Progress Tracking', 'Reminders']
    },
    {
      id: 'photos',
      name: 'Inspiration Photos',
      icon: <FileText className="w-6 h-6" />,
      position: { left: '52%', top: '15%' },
      description: 'Collection of inspiring images and memories to fuel creativity and motivation.',
      specs: ['High Resolution', 'Travel Memories', 'Creative Inspiration', 'Personal Collection']
    }
  ];

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModal = (item: WorkspaceItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Background Image Container */}
      <div className="relative w-full h-screen overflow-hidden">
        <Image 
          src="https://i.snipboard.io/gCti5j.jpg"
          alt="Workspace"
          fill
          className="object-contain"
        />
        {/* Interactive Hotspots */}
        <div className="absolute inset-0">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openModal(item)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl z-10 group"
            style={{ 
              left: item.position.left, 
              top: item.position.top 
            }}
          >
            <div className="w-4 h-4 md:w-5 md:h-5">
              {item.icon}
            </div>
            {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
              {item.name}
            </div>
              {/* Pulse Animation Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-30"></div>
          </button>
        ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                  {selectedItem.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedItem.name}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {selectedItem.description}
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
                <ul className="space-y-2">
                  {selectedItem.specs.map((spec: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={closeModal}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveWorkspace;