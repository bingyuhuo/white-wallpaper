import React from 'react';
import { Device } from './DeviceTypes';
import { getDeviceFrameStyle, getDeviceScreenStyle, getReflectionStyle, getDeviceButtonStyles } from './DevicePreviewUtils';

interface DevicePreviewProps {
  device: Device;
  imageUrl: string;
  imageLoaded: boolean;
  onImageLoad: () => void;
}

/**
 * Device Preview Component
 * Displays images in various device frames based on selected device type
 */
export const DevicePreview: React.FC<DevicePreviewProps> = ({
  device,
  imageUrl,
  imageLoaded,
  onImageLoad
}) => {
  // 内联样式确保不受外部样式影响
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  // Original size mode
  if (device.id === 'none') {
    return (
      <div style={containerStyle}>
        <img
          src={imageUrl}
          alt="Original size preview"
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            opacity: imageLoaded ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={onImageLoad}
        />
      </div>
    );
  }
  
  // Status bar component for mobile devices
  const StatusBar = () => {
    if (!device.statusBar) return null;
    
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 10
      }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.7)' }}>9:41</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              border: '2px solid rgba(0, 0, 0, 0.7)', 
              borderRadius: '2px' 
            }}></div>
            <div style={{ 
              position: 'absolute', 
              inset: '3px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)' 
            }}></div>
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.7)' }}>100%</div>
        </div>
      </div>
    );
  };
  
  // Device preview mode
  return (
    <div style={containerStyle}>
      <div 
        style={{
          ...getDeviceFrameStyle(device),
          transformOrigin: 'center center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {/* Device reflection effect */}
        <div style={{...getReflectionStyle(device), transition: 'all 0.3s ease-in-out'}} />
        
        {/* Device side buttons */}
        <div style={{...getDeviceButtonStyles(device), transition: 'all 0.3s ease-in-out'}} />
        
        {/* Volume buttons for iPhone */}
        {device.buttonStyle === 'iphone' && (
          <>
            <div 
              style={{
                position: 'absolute',
                left: '-2px',
                top: '100px',
                width: '3px',
                height: '30px',
                background: '#000',
                borderRadius: '0 2px 2px 0',
                transition: 'all 0.3s ease-in-out'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                left: '-2px',
                top: '140px',
                width: '3px',
                height: '30px',
                background: '#000',
                borderRadius: '0 2px 2px 0',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          </>
        )}
        
        {/* Device screen */}
        <div style={{
          ...getDeviceScreenStyle(device),
          transition: 'all 0.3s ease-in-out'
        }}>
          <img
            src={imageUrl}
            alt={`${device.name} preview`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0.3, 
              transition: 'opacity 0.3s ease' 
            }}
            onLoad={onImageLoad}
          />
          
          {/* Status bar */}
          <StatusBar />
          
          {/* iPhone notch/dynamic island */}
          {device.showNotch && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${device.notchWidth}px`, 
                height: `${device.notchHeight}px`,
                backgroundColor: 'black',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                zIndex: 10,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {/* Add camera lens to dynamic island */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '25%',
                transform: 'translateY(-50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#333'
              }}></div>
            </div>
          )}
          
          {/* Android control bar */}
          {device.showControls && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/5 backdrop-blur-sm flex justify-center items-center z-10 transition-all duration-300 ease-in-out">
              <div className="flex space-x-8 items-center">
                <div className="w-6 h-6 bg-black/20 rounded-full"></div>
                <div className="w-14 h-1 bg-black/30 rounded-full"></div>
                <div className="w-6 h-6 border-2 border-black/20 rounded-sm"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* PC/Monitor stand */}
      {device.id === 'desktop' && (
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-300 ease-in-out">
          <div className="w-1/4 h-5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-sm"></div>
          <div 
            className="w-1/3 h-10 bg-gradient-to-t from-gray-700 to-gray-800 rounded-b-lg"
          >
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-600/20 ring-1 ring-gray-500/40"></div>
          </div>
        </div>
      )}
      
      {/* Laptop keyboard */}
      {device.id === 'laptop' && (
        <div 
          className="absolute -bottom-28 left-0 w-full h-28 bg-gradient-to-t from-gray-700 to-gray-800 rounded-b-lg transition-all duration-300 ease-in-out"
          style={{ 
            transform: 'perspective(1000px) rotateX(-10deg)',
            transformOrigin: 'top',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-8 bg-gray-600/30 rounded-lg" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600/40"></div>
        </div>
      )}
    </div>
  );
}; 