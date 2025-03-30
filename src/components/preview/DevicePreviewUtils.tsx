import { Device } from './DeviceTypes';

/**
 * Calculate device scaling ratio to fit the preview container
 */
export const calculateDeviceScale = (selectedDevice: Device): number => {
  if (selectedDevice.id === 'none') return 1;
  
  // Mobile portrait devices need smaller scaling ratio
  if (selectedDevice.id === 'iphone15' || selectedDevice.id === 'android') {
    return selectedDevice.scale * 0.8;
  }
  
  // Tablet devices need appropriate scaling ratio
  if (selectedDevice.id === 'ipad') {
    return selectedDevice.scale * 0.7;
  }
  
  // PC and laptop devices maintain original scaling ratio
  return selectedDevice.scale;
};

/**
 * Render device frame style
 */
export const getDeviceFrameStyle = (selectedDevice: Device): React.CSSProperties => {
  if (selectedDevice.id === 'none') {
    return {};
  }

  return {
    width: `${selectedDevice.width}px`,
    height: `${selectedDevice.height}px`,
    backgroundColor: selectedDevice.frameColor,
    background: selectedDevice.frameGradient || selectedDevice.frameColor,
    borderRadius: `${selectedDevice.borderRadius}px`,
    boxShadow: selectedDevice.shadow || '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    transform: `scale(${calculateDeviceScale(selectedDevice)})`,
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative'
  };
};

/**
 * Render device screen style
 */
export const getDeviceScreenStyle = (selectedDevice: Device): React.CSSProperties => {
  if (selectedDevice.id === 'none') {
    return {};
  }

  // Apply inner shadow and bezel if specified
  const bezelWidth = selectedDevice.bezel || 0;
  const bezelColor = selectedDevice.bezelColor || 'rgba(0, 0, 0, 0.8)';
  
  return {
    width: 'calc(100% - ' + (bezelWidth * 2) + 'px)',
    height: 'calc(100% - ' + (bezelWidth * 2) + 'px)',
    margin: `${bezelWidth}px`,
    borderRadius: `${selectedDevice.screenBorderRadius || 0}px`,
    overflow: 'hidden',
    background: '#fff',
    position: 'relative',
    boxShadow: selectedDevice.innerShadow || 'inset 0 0 2px rgba(0, 0, 0, 0.1)',
    border: bezelWidth > 0 ? `${bezelWidth}px solid ${bezelColor}` : 'none'
  };
};

/**
 * Get reflection styles for device frames
 */
export const getReflectionStyle = (selectedDevice: Device): React.CSSProperties => {
  if (!selectedDevice.reflection) {
    return { display: 'none' };
  }
  
  // Different reflection styles based on device type
  if (selectedDevice.id === 'iphone15' || selectedDevice.id === 'android') {
    return {
      position: 'absolute',
      top: '0',
      left: '5%',
      width: '90%',
      height: '30%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
      borderRadius: `${selectedDevice.borderRadius * 0.8}px ${selectedDevice.borderRadius * 0.8}px 100px 100px`,
      opacity: 0.4,
      pointerEvents: 'none'
    };
  }
  
  if (selectedDevice.id === 'ipad') {
    return {
      position: 'absolute',
      top: '0',
      left: '10%',
      width: '80%',
      height: '25%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
      borderRadius: `${selectedDevice.borderRadius * 0.6}px ${selectedDevice.borderRadius * 0.6}px 50px 50px`,
      opacity: 0.5,
      pointerEvents: 'none'
    };
  }
  
  // Default reflection for desktop and laptop
  return {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '40%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    opacity: 0.3,
    pointerEvents: 'none'
  };
};

/**
 * Get button styles for mobile devices
 */
export const getDeviceButtonStyles = (selectedDevice: Device): React.CSSProperties => {
  if (!selectedDevice.buttonStyle || selectedDevice.buttonStyle === 'none') {
    return { display: 'none' };
  }
  
  // iPhone-style side buttons
  if (selectedDevice.buttonStyle === 'iphone') {
    return {
      position: 'absolute',
      right: '-2px',
      top: '120px',
      width: '3px',
      height: '80px',
      background: '#000',
      borderRadius: '2px 0 0 2px'
    };
  }
  
  // Android-style side buttons
  return {
    position: 'absolute',
    right: '-2px',
    top: '150px',
    width: '3px',
    height: '60px',
    background: '#333',
    borderRadius: '2px 0 0 2px'
  };
}; 