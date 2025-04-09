/**
 * 预览组件模块
 * 包含壁纸预览相关的所有组件和工具函数
 */

// 设备类型定义
export { type Device, devices } from './DeviceTypes';

// 设备选择器组件
export { DeviceSelector } from './DeviceSelector'; // 原有选择器（支持类名样式）
export { InlineDeviceSelector } from './InlineDeviceSelector'; // 内联样式选择器

// 设备预览组件
export { DevicePreview } from './DevicePreview';

// 预览工具函数
export {
  calculateDeviceScale,
  getDeviceFrameStyle,
  getDeviceScreenStyle,
  getReflectionStyle,
  getDeviceButtonStyles
} from './DevicePreviewUtils';

// 预览上下文 - 用于管理多个预览的状态
export { PreviewProvider, usePreview } from './PreviewContext';

// 预览组件 
export { FullScreenPreviewModal } from './FullScreenPreviewModal'; // 全屏预览模态框
export { PreviewDownloader } from './PreviewDownloader'; // 预览下载组件

// 包含动画样式
import './DevicePreviewAnimations.css'; 