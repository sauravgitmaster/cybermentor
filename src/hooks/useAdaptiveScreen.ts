import { useState, useEffect, useCallback } from 'react';

export type DeviceMode = 'large-desktop' | 'laptop' | 'tablet' | 'mobile';
export type ScreenOrientation = 'landscape' | 'portrait';
export type InputMode = 'touch' | 'mouse-keyboard' | 'hybrid';

export interface AdaptiveScreenState {
  deviceMode: DeviceMode;
  orientation: ScreenOrientation;
  inputMode: InputMode;
  hasTouch: boolean;
  isTouchDevice: boolean;
  viewportWidth: number;
  viewportHeight: number;
  isShortScreen: boolean; // e.g. 1366x768 laptop or mobile landscape
  isCompactWidth: boolean;
  isLargeDesktop: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
}

/**
 * Custom hook to detect screen characteristics, device category,
 * orientation, touch capability, and dynamic viewport size changes.
 *
 * Device Breakpoints:
 * - large-desktop: >= 1600px width
 * - laptop / normal desktop: 1024px to 1599px width
 * - tablet: 768px to 1023px width
 * - mobile: < 768px width
 *
 * Viewport Height:
 * - isShortScreen: height < 780px (common in 1366x768, 1440x900 with browser chrome, or mobile landscape)
 */
export function useAdaptiveScreen(): AdaptiveScreenState {
  const getScreenState = useCallback((): AdaptiveScreenState => {
    if (typeof window === 'undefined') {
      return {
        deviceMode: 'laptop',
        orientation: 'landscape',
        inputMode: 'mouse-keyboard',
        hasTouch: false,
        isTouchDevice: false,
        viewportWidth: 1366,
        viewportHeight: 768,
        isShortScreen: false,
        isCompactWidth: false,
        isLargeDesktop: false,
        isLaptop: true,
        isTablet: false,
        isMobile: false,
        isLandscape: true,
        isPortrait: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Device category detection
    let deviceMode: DeviceMode = 'laptop';
    if (width >= 1600) {
      deviceMode = 'large-desktop';
    } else if (width >= 1024) {
      deviceMode = 'laptop';
    } else if (width >= 768) {
      deviceMode = 'tablet';
    } else {
      deviceMode = 'mobile';
    }

    // Orientation detection
    const isLandscape = width >= height;
    const orientation: ScreenOrientation = isLandscape ? 'landscape' : 'portrait';

    // Touch & input detection
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    const hasFinePointer =
      window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    let inputMode: InputMode = 'mouse-keyboard';
    if (hasTouch && hasFinePointer) {
      inputMode = 'hybrid';
    } else if (hasTouch) {
      inputMode = 'touch';
    } else {
      inputMode = 'mouse-keyboard';
    }

    // Height awareness (crucial for 1366x768 or 1440x900 screens where vertical space is constrained)
    const isShortScreen = height < 780;

    return {
      deviceMode,
      orientation,
      inputMode,
      hasTouch,
      isTouchDevice: hasTouch,
      viewportWidth: width,
      viewportHeight: height,
      isShortScreen,
      isCompactWidth: width < 1024,
      isLargeDesktop: deviceMode === 'large-desktop',
      isLaptop: deviceMode === 'laptop',
      isTablet: deviceMode === 'tablet',
      isMobile: deviceMode === 'mobile',
      isLandscape,
      isPortrait: !isLandscape,
    };
  }, []);

  const [screen, setScreen] = useState<AdaptiveScreenState>(getScreenState);

  useEffect(() => {
    let timeoutId: number | null = null;

    const handleResize = () => {
      // Debounce with requestAnimationFrame for smooth 60fps adaptation
      if (timeoutId) cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        setScreen(getScreenState());
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getScreenState]);

  return screen;
}
