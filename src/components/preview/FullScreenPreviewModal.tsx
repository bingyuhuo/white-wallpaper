import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Device, devices } from './DeviceTypes';
import { DevicePreview } from './DevicePreview';
import { InlineDeviceSelector } from './InlineDeviceSelector';
import { PreviewDownloader } from './PreviewDownloader';
import './DevicePreviewAnimations.css';

interface FullScreenPreviewModalProps {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 全屏预览模态框组件
 * 显示不同设备下的壁纸预览效果
 */
export const FullScreenPreviewModal: React.FC<FullScreenPreviewModalProps> = ({
  imageUrl,
  title,
  isOpen,
  onClose
}) => {
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isChangingDevice, setIsChangingDevice] = useState(false);

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 切换设备的动画效果
  const handleDeviceChange = (device: Device) => {
    if (device.id === selectedDevice.id) return;
    
    setIsChangingDevice(true);
    setTimeout(() => {
      setSelectedDevice(device);
      setTimeout(() => {
        setIsChangingDevice(false);
      }, 100);
    }, 100);
  };

  // 切换到上一个设备
  const handlePreviousDevice = () => {
    const currentIndex = devices.findIndex(d => d.id === selectedDevice.id);
    const prevIndex = (currentIndex - 1 + devices.length) % devices.length;
    handleDeviceChange(devices[prevIndex]);
  };

  // 切换到下一个设备
  const handleNextDevice = () => {
    const currentIndex = devices.findIndex(d => d.id === selectedDevice.id);
    const nextIndex = (currentIndex + 1) % devices.length;
    handleDeviceChange(devices[nextIndex]);
  };

  // 样式定义
  const styles = {
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      zIndex: 99999,
    },
    container: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    header: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 10,
    },
    title: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    button: {
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    previewContainer: {
      width: '100%',
      height: '100%',
      transition: 'all 0.3s ease',
    },
    navButton: {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
      position: 'absolute' as const,
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem',
    },
    dot: (isActive: boolean) => ({
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      backgroundColor: isActive ? 'white' : 'rgba(100, 100, 100, 0.8)',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
    }),
  };

  // 使用Portal渲染到body
  const modalContent = (
    <div style={styles.modal}>
      <div style={styles.container}>
        {/* 顶部控制栏 */}
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <div style={styles.controls}>
            {/* 设备选择器 */}
            <InlineDeviceSelector
              selectedDevice={selectedDevice}
              onDeviceChange={handleDeviceChange}
            />
            
            {/* 下载按钮 */}
            <PreviewDownloader
              imageUrl={imageUrl}
              title={title}
              selectedDevice={selectedDevice}
            />
            
            {/* 关闭按钮 */}
            <button style={styles.button} onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div style={styles.content}>
          <div 
            style={{
              ...styles.previewContainer,
              transform: isChangingDevice ? 'scale(0.95)' : 'scale(1)', 
              opacity: isChangingDevice ? 0.5 : 1,
            }}
          >
            <DevicePreview
              device={selectedDevice}
              imageUrl={imageUrl}
              imageLoaded={imageLoaded}
              onImageLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        {/* 导航按钮 */}
        <button
          style={{ ...styles.navButton, left: '1rem' }}
          onClick={handlePreviousDevice}
        >
          <ChevronLeft size={32} />
        </button>
        
        <button
          style={{ ...styles.navButton, right: '1rem' }}
          onClick={handleNextDevice}
        >
          <ChevronRight size={32} />
        </button>

        {/* 底部分页 */}
        <div style={styles.pagination}>
          {devices.map((device) => (
            <div 
              key={device.id} 
              style={styles.dot(device.id === selectedDevice.id)}
              onClick={() => handleDeviceChange(device)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}; 