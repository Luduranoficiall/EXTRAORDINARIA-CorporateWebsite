import { describe, it, expect } from 'vitest';
import initIframeMessenger from '../src/iframeMessenger';

describe('iframeMessenger', () => {
  it('initializes and exposes API', () => {
    const { sendMessage, dispose } = initIframeMessenger({ debug: false });
    expect(typeof sendMessage).toBe('function');
    expect(typeof dispose).toBe('function');
    dispose();
  });
});
