import React from 'react';
import { Smartphone, Monitor, Tablet, Laptop } from 'lucide-react';

// Device type definition
export interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  width: number;
  height: number;
  scale: number;
  frameColor: string;
  frameWidth: number;
  borderRadius: number;
  showNotch?: boolean;
  notchWidth?: number;
  notchHeight?: number;
  screenBorderRadius?: number;
  showControls?: boolean;
  shadow?: string;
  reflection?: boolean;
  bezel?: number;
  bezelColor?: string;
  gradient?: string;
  frameGradient?: string;
  innerShadow?: string;
  buttonStyle?: "iphone" | "android" | "none";
  statusBar?: boolean;
}

// Preset device list
export const devices: Device[] = [
  {
    id: 'none',
    name: 'Original Size',
    icon: <Monitor className="w-4 h-4" />,
    width: 0, // Original size doesn't need specific dimensions
    height: 0,
    scale: 1,
    frameColor: 'transparent',
    frameWidth: 0,
    borderRadius: 0
  },
  {
    id: 'iphone15',
    name: 'iPhone 15 Pro',
    icon: <Smartphone className="w-4 h-4" />,
    width: 393,
    height: 852,
    scale: 0.7,
    frameColor: '#1a1a1a',
    frameGradient: 'linear-gradient(145deg, #2a2a2a 0%, #0a0a0a 100%)',
    frameWidth: 16,
    borderRadius: 48,
    showNotch: true,
    notchWidth: 126,
    notchHeight: 35,
    screenBorderRadius: 38,
    shadow: '0 30px 60px -10px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.7)',
    reflection: true,
    bezel: 2,
    bezelColor: '#000',
    buttonStyle: "iphone",
    statusBar: true,
    innerShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
  },
  {
    id: 'android',
    name: 'Android Flagship',
    icon: <Smartphone className="w-4 h-4" />,
    width: 412,
    height: 915,
    scale: 0.65,
    frameColor: '#111111',
    frameGradient: 'linear-gradient(160deg, #303030 0%, #101010 100%)',
    frameWidth: 14,
    borderRadius: 32,
    screenBorderRadius: 24,
    showControls: true,
    shadow: '0 30px 60px -10px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.7)',
    reflection: true,
    bezel: 1,
    bezelColor: '#222',
    buttonStyle: "android",
    statusBar: true
  },
  {
    id: 'desktop',
    name: 'PC Monitor',
    icon: <Monitor className="w-4 h-4" />,
    width: 1920,
    height: 1080,
    scale: 0.28,
    frameColor: '#272727',
    frameGradient: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
    frameWidth: 24,
    borderRadius: 8,
    screenBorderRadius: 2,
    shadow: '0 40px 80px -15px rgba(0, 0, 0, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    reflection: true,
    bezel: 3,
    bezelColor: '#111'
  },
  {
    id: 'laptop',
    name: 'MacBook Pro',
    icon: <Laptop className="w-4 h-4" />,
    width: 1440,
    height: 900,
    scale: 0.35,
    frameColor: '#333333',
    frameGradient: 'linear-gradient(180deg, #444444 0%, #292929 100%)',
    frameWidth: 30,
    borderRadius: 10,
    screenBorderRadius: 4,
    shadow: '0 40px 70px -15px rgba(0, 0, 0, 0.6), 0 30px 40px -20px rgba(0, 0, 0, 0.5)',
    reflection: true,
    bezel: 5,
    bezelColor: '#1a1a1a'
  },
  {
    id: 'ipad',
    name: 'iPad Pro',
    icon: <Tablet className="w-4 h-4" />,
    width: 834,
    height: 1194,
    scale: 0.45,
    frameColor: '#222222',
    frameGradient: 'linear-gradient(145deg, #343434 0%, #1d1d1d 100%)',
    frameWidth: 24,
    borderRadius: 20,
    screenBorderRadius: 10,
    shadow: '0 35px 68px -12px rgba(0, 0, 0, 0.55), 0 20px 40px -18px rgba(0, 0, 0, 0.6)',
    reflection: true,
    bezel: 4,
    bezelColor: '#000',
    buttonStyle: "iphone",
    statusBar: true
  }
]; 