/**
 * @module utils
 */

export const supportsPassive: boolean = ((): boolean => {
  // Test via a getter in the options object to see
  // if the passive property is accessed
  let supportsPassive: boolean = false;

  // Start test
  try {
    const options: AddEventListenerOptions = Object.defineProperty({}, 'passive', {
      get: (): boolean => (supportsPassive = true)
    });

    window.addEventListener('test', (): boolean => true, options);
  } catch {
    // Not supports passive
  }

  return supportsPassive;
})();

export function debounce(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let raf: number;
  let start: number;

  const tick = (timestamp: number, args: any[]): void => {
    if (timestamp - start >= delay) {
      callback(...args);
    } else {
      raf = requestAnimationFrame((timestamp: number): void => {
        tick(timestamp, args);
      });
    }
  };

  return (...args: any[]): void => {
    cancelAnimationFrame(raf);

    raf = requestAnimationFrame((timestamp: number): void => {
      tick((start = timestamp), args);
    });
  };
}
