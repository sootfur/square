import type { BiomeVariantType } from '@components/Biome';
import type { Road } from '@components/Road';
import { Vector } from '@utils/Vector';
import { Tile } from './Tile';

export type TileParamsType = {
   coords: Vector;
   width?: number;
   height?: number;
   rotation?: number;
   biomes: BiomeVariantType[];
   whenClick?: (tile: Tile) => void;
};

export type TileElementType = Road;
