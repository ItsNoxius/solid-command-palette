import { parseKeybinding } from 'tinykeys';
import { GetFormattedShortcut } from './types';

function getFormattedKey(key: string | RegExp): string {
  const keyStr = typeof key === 'string' ? key : key.source;
  if (keyStr === 'Meta') {
    return '⌘';
  }

  if (keyStr === 'Control') {
    return 'Ctrl';
  }

  if (keyStr === 'Escape') {
    return 'Esc';
  }

  return keyStr;
}

export const getFormattedShortcut: GetFormattedShortcut = (shortcut) => {
  const shortcutStr =
    typeof shortcut === 'function'
      ? (shortcut as () => string)()
      : shortcut;
  if (typeof shortcutStr !== 'string' || !shortcutStr) {
    return [];
  }
  const parsedShortcut = parseKeybinding(shortcutStr);

  const formattedShortcut = parsedShortcut.map((group) => {
    const flatGroup = group.flat();
    const formattedGroup = flatGroup.map(getFormattedKey);
    return formattedGroup;
  });

  return formattedShortcut;
};
