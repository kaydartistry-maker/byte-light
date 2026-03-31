// Theme store — manages mode (daylight/midnight) and accent color palette

export type ThemeMode = 'dark' | 'light';

export interface AccentPalette {
  name: string;
  dark: { main: string; bright: string; dim: string };
  light: { main: string; bright: string; dim: string };
}

export const ACCENT_PALETTES: AccentPalette[] = [
  { name: 'Crimson',  dark: { main: '#e05252', bright: '#ef6b6b', dim: '#c24444' }, light: { main: '#c24444', bright: '#a83a3a', dim: '#e05252' } },
  { name: 'Burgundy', dark: { main: '#a8416a', bright: '#c25580', dim: '#8e3659' }, light: { main: '#8e3659', bright: '#752d4a', dim: '#a8416a' } },
  { name: 'Rose',     dark: { main: '#e8829a', bright: '#f09db1', dim: '#d06b84' }, light: { main: '#c25b75', bright: '#a84d65', dim: '#d06b84' } },
  { name: 'Orange',   dark: { main: '#e07840', bright: '#ef9060', dim: '#c26835' }, light: { main: '#c26835', bright: '#a8582d', dim: '#e07840' } },
  { name: 'Amber',    dark: { main: '#d4a030', bright: '#e4b548', dim: '#b88a28' }, light: { main: '#b88a28', bright: '#9e7622', dim: '#d4a030' } },
  { name: 'Forest',   dark: { main: '#4a8c5c', bright: '#5ea872', dim: '#3d7a4e' }, light: { main: '#3d7a4e', bright: '#336842', dim: '#4a8c5c' } },
  { name: 'Emerald',  dark: { main: '#3daa7a', bright: '#50c490', dim: '#329068' }, light: { main: '#329068', bright: '#2a7a58', dim: '#3daa7a' } },
  { name: 'Mint',     dark: { main: '#44b8a0', bright: '#5cd0b6', dim: '#389e88' }, light: { main: '#389e88', bright: '#2e8674', dim: '#44b8a0' } },
  { name: 'Teal',     dark: { main: '#5eaba5', bright: '#7cc5c0', dim: '#4a908b' }, light: { main: '#3d8b86', bright: '#327570', dim: '#5eaba5' } },
  { name: 'Ocean',    dark: { main: '#4090b0', bright: '#52a8cc', dim: '#357a98' }, light: { main: '#357a98', bright: '#2c6680', dim: '#4090b0' } },
  { name: 'Sapphire', dark: { main: '#5080c0', bright: '#6898d8', dim: '#426ca8' }, light: { main: '#426ca8', bright: '#385c90', dim: '#5080c0' } },
  { name: 'Lavender', dark: { main: '#9a8cc8', bright: '#b0a0dc', dim: '#8478b0' }, light: { main: '#7a6cb0', bright: '#685c98', dim: '#9a8cc8' } },
  { name: 'Amethyst', dark: { main: '#8866bb', bright: '#9e7ed3', dim: '#7456a5' }, light: { main: '#7456a5', bright: '#634890', dim: '#8866bb' } },
  { name: 'Plum',     dark: { main: '#9060a0', bright: '#a878b8', dim: '#7c5090' }, light: { main: '#7c5090', bright: '#6a4480', dim: '#9060a0' } },
  { name: 'Magenta',  dark: { main: '#c85ca0', bright: '#dc74b4', dim: '#b04c8c' }, light: { main: '#a84888', bright: '#903c74', dim: '#c85ca0' } },
  { name: 'Blush',    dark: { main: '#dca0b0', bright: '#eab4c2', dim: '#c88e9e' }, light: { main: '#b88090', bright: '#a06e7e', dim: '#c88e9e' } },
];

// Reactive state
let mode = $state<ThemeMode>('dark');
let accentName = $state<string>('Teal');

// Initialize from localStorage on module load
if (typeof window !== 'undefined') {
  const savedMode = localStorage.getItem('resonant-theme') as ThemeMode | null;
  const savedAccent = localStorage.getItem('resonant-accent');
  if (savedMode === 'light' || savedMode === 'dark') mode = savedMode;
  if (savedAccent) accentName = savedAccent;
}

function findPalette(name: string): AccentPalette {
  return ACCENT_PALETTES.find(p => p.name === name) || ACCENT_PALETTES[8]; // default Teal
}

function applyTheme() {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  const palette = findPalette(accentName);
  const colors = mode === 'dark' ? palette.dark : palette.light;

  html.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');

  // Apply accent overrides
  html.style.setProperty('--gold', colors.main);
  html.style.setProperty('--gold-bright', colors.bright);
  html.style.setProperty('--gold-dim', colors.dim);
  html.style.setProperty('--gold-glow', hexToRgba(colors.main, 0.1));
  html.style.setProperty('--gold-ember', hexToRgba(colors.main, 0.06));
  html.style.setProperty('--shadow-gold', hexToRgba(colors.main, 0.04));
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function setMode(newMode: ThemeMode) {
  mode = newMode;
  localStorage.setItem('resonant-theme', mode);
  applyTheme();
}

export function setAccent(name: string) {
  accentName = name;
  localStorage.setItem('resonant-accent', name);
  applyTheme();
}

export function initTheme() {
  applyTheme();
}

export function getMode(): ThemeMode { return mode; }
export function getAccentName(): string { return accentName; }
