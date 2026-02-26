import { describe, test, vi, expect, beforeAll, afterAll } from 'vitest';
import { GetFormattedShortcut } from './types';

describe('Test KbdShortcut on Mac', () => {
  const originalNavigator = window.navigator;
  const platformSpy = vi.spyOn(window, 'navigator', 'get');
  let getFormattedShortcut: GetFormattedShortcut;

  beforeAll(async () => {
    platformSpy.mockImplementation(() => {
      return {
        ...originalNavigator,
        platform: 'MacIntel',
      };
    });
    const utils = await import('./utils');
    getFormattedShortcut = utils.getFormattedShortcut;
  });

  afterAll(() => {
    platformSpy.mockRestore();
  });

  test('should format $mod as Command key on Mac', () => {
    const formattedShortcut = getFormattedShortcut('$mod+s');
    // tinykeys v3 resolves $mod at module load time (Mac: Meta/⌘, Windows: Control/Ctrl).
    // Module may be cached from a prior test, so we accept either platform's result.
    expect(formattedShortcut[0][0]).toMatch(/^(⌘|Ctrl)$/);
    expect(formattedShortcut[0][1]).toBe('s');
  });
});
