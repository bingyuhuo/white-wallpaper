import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Device, devices } from './DeviceTypes';

interface DeviceSelectorProps {
  selectedDevice: Device;
  onDeviceChange: (device: Device) => void;
}

/**
 * Device Selector Component
 * Provides a dropdown menu to select different device previews
 */
export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ 
  selectedDevice, 
  onDeviceChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  
  // Monitor click events to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    // Only add event listener when the menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div 
      ref={selectorRef} 
      className="absolute top-0 right-16 z-30 device-dropdown"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {selectedDevice.icon}
          <span className="ml-2 text-sm">{selectedDevice.name}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-40"
          role="menu"
        >
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => {
                onDeviceChange(device);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-left text-sm transition-colors duration-150 
                ${selectedDevice.id === device.id ? 'bg-blue-600 text-white' : 'text-white hover:bg-gray-700'}`}
              type="button"
              role="menuitem"
            >
              <span className="mr-2">{device.icon}</span>
              {device.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 