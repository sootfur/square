import { Vector } from '@utils/Vector';

export const canvas = document.getElementById('scene') as HTMLCanvasElement;
export const context = canvas.getContext('2d') as CanvasRenderingContext2D;

export const tileKeySeparator = ':';

export const placeholderKeySeparator = ':';

export const tileSize = 160;

export const tileWidth = Math.floor(tileSize / 2);

export const tileHeight = Math.floor(tileWidth / 2);

export const rightBasis = new Vector(tileWidth, tileHeight);

export const leftBasis = new Vector(-tileWidth, tileHeight);
