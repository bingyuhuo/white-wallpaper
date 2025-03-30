import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Device, devices } from './DeviceTypes';
import { DeviceSelector } from './DeviceSelector';
import { DevicePreview } from './DevicePreview';
import './DevicePreviewAnimations.css'; // 引入动画样式

interface ImagePreviewModalProps {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Image Preview Modal Component
 * Provides full-screen image preview with different device view options
 */
export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageUrl,
  title,
  isOpen,
  onClose
}) => {
  // Selected device state
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);
  // Current device index in the devices array
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  // Image loading state
  const [imageLoaded, setImageLoaded] = useState(false);
  // Animation state
  const [isChangingDevice, setIsChangingDevice] = useState(false);
  // Canvas ref for image processing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 原始图片对象
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  
  // 预加载原始图片
  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // 允许跨域图片处理
      img.src = imageUrl;
      img.onload = () => {
        setOriginalImage(img);
      };
    }
  }, [imageUrl]);
  
  // Update current device index when selected device changes
  useEffect(() => {
    const index = devices.findIndex(device => device.id === selectedDevice.id);
    if (index !== -1) {
      setCurrentDeviceIndex(index);
    }
  }, [selectedDevice]);
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset image loading state each time modal opens
      setImageLoaded(false);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset image loading state when device changes
  useEffect(() => {
    setImageLoaded(false);
  }, [selectedDevice]);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  // Navigate to previous device with animation
  const handlePreviousDevice = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Set animation state
    setIsChangingDevice(true);
    setTimeout(() => {
      const prevIndex = (currentDeviceIndex - 1 + devices.length) % devices.length;
      setSelectedDevice(devices[prevIndex]);
      
      // Remove animation state after a short delay
      setTimeout(() => {
        setIsChangingDevice(false);
      }, 100);
    }, 100);
  };
  
  // Navigate to next device with animation
  const handleNextDevice = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Set animation state
    setIsChangingDevice(true);
    setTimeout(() => {
      const nextIndex = (currentDeviceIndex + 1) % devices.length;
      setSelectedDevice(devices[nextIndex]);
      
      // Remove animation state after a short delay
      setTimeout(() => {
        setIsChangingDevice(false);
      }, 100);
    }, 100);
  };

  if (!isOpen) return null;

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Image load complete handler
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // 获取设备尺寸（考虑设备方向和特殊设备）
  const getDeviceDimensions = () => {
    // 如果是"Original Size"，则返回空值（使用原始尺寸）
    if (selectedDevice.id === 'none') {
      return null;
    }
    
    // 根据设备类型确定宽高
    let width = selectedDevice.width;
    let height = selectedDevice.height;
    
    // 保证高度始终大于或等于宽度（竖屏壁纸）
    if (width > height) {
      [width, height] = [height, width];
    }
    
    // 去掉边框厚度影响(仅用于生成壁纸，不影响预览)
    const bezelWidth = selectedDevice.bezel || 0;
    width -= bezelWidth * 2;
    height -= bezelWidth * 2;
    
    return { width, height };
  };

  // 调整并下载图片
  const handleDownload = () => {
    if (!originalImage) return;
    
    const deviceDimensions = getDeviceDimensions();
    
    // 如果是原始尺寸或者无法获取设备尺寸，直接下载原图
    if (!deviceDimensions) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${title}-wallpaper.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    
    // 创建并准备Canvas
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    // 设置Canvas尺寸为设备屏幕尺寸
    canvas.width = deviceDimensions.width;
    canvas.height = deviceDimensions.height;
    
    // 清除Canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 计算裁剪和缩放
    const originalRatio = originalImage.width / originalImage.height;
    const targetRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    // 按屏幕比例裁剪图片
    if (originalRatio > targetRatio) {
      // 原图较宽，按高度适配
      drawHeight = canvas.height;
      drawWidth = originalImage.width * (canvas.height / originalImage.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // 原图较窄，按宽度适配
      drawWidth = canvas.width;
      drawHeight = originalImage.height * (canvas.width / originalImage.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    // 绘制图片
    ctx.drawImage(originalImage, offsetX, offsetY, drawWidth, drawHeight);
    
    // 生成下载链接
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      // 创建并点击下载链接
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${title}-${selectedDevice.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating device-specific wallpaper:', error);
      
      // 失败时回退到原始图片下载
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${title}-wallpaper.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      {/* 隐藏的Canvas用于图片处理 */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
      />
      
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(30, 30, 45, 0.8) 0%, rgba(5, 5, 15, 0.9) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite'
        }}
      />
      
      <div className="relative max-w-4xl w-full">
        {/* Control bar */}
        <div className="absolute -top-14 left-0 right-0 flex items-center justify-between px-3">
          {/* Title with device name */}
          <div className="text-white/80 text-lg font-medium transition-all duration-300">
            {title} 
            <span className={`ml-1 ${isChangingDevice ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {selectedDevice.id !== 'none' && `- ${selectedDevice.name}`}
            </span>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/90 transition-colors duration-200 relative group"
              aria-label="Download wallpaper"
              title={selectedDevice.id === 'none' 
                ? "Download Original Size" 
                : `Download ${selectedDevice.name} Size (${selectedDevice.width}x${selectedDevice.height})`
              }
            >
              <Download className="w-5 h-5 text-white/90" />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {selectedDevice.id === 'none' 
                  ? "Download Original Size" 
                  : `Download for ${selectedDevice.name}`
                }
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/90 transition-colors duration-200"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 text-white/90" />
            </button>
          </div>
        </div>

        {/* Device selector component */}
        <DeviceSelector 
          selectedDevice={selectedDevice} 
          onDeviceChange={setSelectedDevice} 
        />

        {/* Preview container */}
        <div 
          className="w-full h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center relative"
          style={{ 
            background: 'linear-gradient(145deg, #121218 0%, #090910 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Environment lighting effect */}
          <div 
            className="absolute top-0 left-1/4 right-1/4 h-1/2 opacity-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)'
            }}
          />
          
          {/* Surface reflection */}
          <div 
            className="absolute bottom-0 left-0 w-full h-20 opacity-10"
            style={{
              background: 'linear-gradient(0deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
            }}
          />
          
          {/* Loading indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="h-10 w-10 relative">
                <div className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-30"></div>
                <div className="animate-spin relative h-8 w-8 rounded-full border-2 border-transparent border-t-white border-b-white"></div>
              </div>
            </div>
          )}
          
          {/* Device preview with animation class */}
          <div className={`${isChangingDevice ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
            <DevicePreview 
              device={selectedDevice}
              imageUrl={imageUrl}
              imageLoaded={imageLoaded}
              onImageLoad={handleImageLoad}
            />
          </div>
        </div>
        
        {/* Navigation arrows for device switching */}
        <div className="absolute top-1/2 -left-14 transform -translate-y-1/2">
          <button 
            className="device-nav-arrow p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/80 hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={handlePreviousDevice}
            aria-label="Previous device"
            title={`Previous Device: ${devices[(currentDeviceIndex - 1 + devices.length) % devices.length].name}`}
            disabled={isChangingDevice}
          >
            <ChevronLeft className="w-6 h-6 text-white/80" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -right-14 transform -translate-y-1/2">
          <button 
            className="device-nav-arrow p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/80 hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={handleNextDevice}
            aria-label="Next device"
            title={`Next Device: ${devices[(currentDeviceIndex + 1) % devices.length].name}`}
            disabled={isChangingDevice}
          >
            <ChevronRight className="w-6 h-6 text-white/80" />
          </button>
        </div>
        
        {/* Current device indicator */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {devices.map((device, index) => (
            <div 
              key={device.id}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${currentDeviceIndex === index ? 'bg-white scale-125' : 'bg-white/30 scale-100'}
              `}
              title={device.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 