import { dim } from "ansis"

const toggleComboKeysMap: Record<string, string> = {
  control: process.platform === 'darwin' ? 'Control(^)' : 'Ctrl(^)',
  meta: 'Command(⌘)',
  shift: 'Shift(⇧)',
}

export function normalizeComboKeyPrint(toggleComboKey: string) {
  return toggleComboKey.split('-').map((key) => toggleComboKeysMap[key] || key[0].toUpperCase() + key.slice(1)).join(dim('+'))
}