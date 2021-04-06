export const headers = [
  'Alliance - Asbuilt Barrier',
  'Alliance - Asbuilt Batters',
  'Alliance - Asbuilt Drainage',
  'Alliance - Asbuilt Pavement',
  'TGA - Asbuilt Barrier',
  'TGA - Asbuilt Batters',
  'TGA - Asbuilt Drainage',
  'TGA - Asbuilt Pavement',
  'Custom',
] as const;
export type Header = typeof headers[number];
