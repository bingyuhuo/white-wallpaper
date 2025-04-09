import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Monitor, Smartphone, Tablet, Laptop } from 'lucide-react';
import { Device, devices } from './DeviceTypes';

interface InlineDeviceSelectorProps {
  selectedDevice: Device;
  onDeviceChange: (device: Device) => void;
}

/**
 * 内联样式的设备选择器组件
 */
export const InlineDeviceSelector: React.FC<InlineDeviceSelectorProps> = ({
  selectedDevice,
  onDeviceChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 获取设备图标
  const getDeviceIcon = (deviceId: string, size: number = 18) => {
    switch (deviceId) {
      case 'none':
        return <Monitor size={size} />;
      case 'iphone15':
      case 'android':
        return <Smartphone size={size} />;
      case 'ipad':
        return <Tablet size={size} />;
      case 'laptop':
      case 'desktop':
        return <Monitor size={size} />;
      default:
        return <div style={{ width: size, height: size }} />;
    }
  };

  // 样式
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '0.5rem',
    backgroundColor: 'rgba(40, 40, 40, 0.9)',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    minWidth: '180px',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 20,
  };

  const menuItemStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    color: 'white',
    backgroundColor: isSelected ? 'rgba(70, 130, 180, 0.7)' : 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
    textAlign: 'left',
    border: 'none',
  });

  return (
    <div ref={selectorRef} style={{ position: 'relative' }}>
      <button 
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getDeviceIcon(selectedDevice.id, 20)}
        <span>{selectedDevice.name}</span>
        <ChevronDown size={16} style={{ 
          marginLeft: '0.25rem',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />
      </button>
      
      {isOpen && (
        <div style={menuStyle}>
          {devices.map(device => (
            <button
              key={device.id}
              style={menuItemStyle(device.id === selectedDevice.id)}
              onClick={() => {
                onDeviceChange(device);
                setIsOpen(false);
              }}
            >
              {getDeviceIcon(device.id)}
              <span>{device.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 