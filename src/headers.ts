export const headers = [
  'TGA - Asbuilt Barrier',
  'TGA - Asbuilt Batters',
  'TGA - Asbuilt Drainage',
  'TGA - Asbuilt Pavement',
  'Custom',
] as const;
export type Header = typeof headers[number];
