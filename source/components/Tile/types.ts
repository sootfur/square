import type { BiomeVariantType } from '@components/Biome';
import type { Road } from '@components/Road';
import { Coords } from '@utils/Coords';
import { Tile } from './Tile';

export type TileParamsType = {
   coords: Coords;
   width: number;
   height: number;
   rotation?: number;
   biomes: BiomeVariantType[];
   whenClick?: (tile: Tile) => void;
};

export type TileElementType = Road;
