import React, { useRef, useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Device } from './DeviceTypes';

interface PreviewDownloaderProps {
  imageUrl: string;
  title: string;
  selectedDevice: Device;
}

/**
 * 图片下载器组件 - 处理不同设备尺寸图片的下载
 */
export const PreviewDownloader: React.FC<PreviewDownloaderProps> = ({
  imageUrl,
  title,
  selectedDevice
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // 获取设备尺寸（考虑设备方向）
  const getDeviceDimensions = () => {
    if (selectedDevice.id === 'none') {
      return originalImage ? { width: originalImage.width, height: originalImage.height } : null;
    }
    
    // 使用设备尺寸
    let width = selectedDevice.width;
    let height = selectedDevice.height;
    
    // 确保高度大于宽度（竖屏壁纸）
    if (width > height) {
      [width, height] = [height, width];
    }
    
    // 减去边框厚度
    const bezelWidth = selectedDevice.bezel || 0;
    width -= bezelWidth * 2;
    height -= bezelWidth * 2;
    
    return { width, height };
  };

  // 获取设备尺寸文本
  const getDeviceSizeText = (): string => {
    const dimensions = getDeviceDimensions();
    
    if (!dimensions) {
      return 'Original Size';
    }
    
    return `${dimensions.width} × ${dimensions.height}`;
  };

  // 下载调整后的图片
  const handleDownload = () => {
    if (!originalImage) {
      // 如果原始图片还没加载完，直接下载原图
      downloadOriginal();
      return;
    }

    const deviceDimensions = getDeviceDimensions();
    
    // 如果无法获取设备尺寸，直接下载原图
    if (!deviceDimensions) {
      downloadOriginal();
      return;
    }
    
    // 对于Original Size，直接下载原图
    if (selectedDevice.id === 'none') {
      downloadOriginal();
      return;
    }

    // 创建并设置Canvas
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    // 设置Canvas尺寸为设备屏幕尺寸
    canvas.width = deviceDimensions.width;
    canvas.height = deviceDimensions.height;
    
    // 清除Canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 计算缩放和裁剪
    const originalRatio = originalImage.width / originalImage.height;
    const targetRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
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
    
    try {
      // 将Canvas转换为图片并下载
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${title}-${selectedDevice.name.replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating device-specific wallpaper:', error);
      // 如果出错，回退到下载原图
      downloadOriginal();
    }
  };

  // 下载原图
  const downloadOriginal = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 样式
  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: showTooltip ? 1 : 0,
    transition: 'opacity 0.2s ease',
    zIndex: 30,
  };

  return (
    <>
      {/* 隐藏的Canvas用于图片处理 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <button 
        style={buttonStyle}
        onClick={handleDownload}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Download size={24} />
        <div style={tooltipStyle}>
          Download {getDeviceSizeText()}
        </div>
      </button>
    </>
  );
}; 