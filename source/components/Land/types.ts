import {
    tileKeySeparator,
    placeholderKeySeparator,
} from '@constants';
import type { Tile } from '@components/Tile';
import type { Placeholder } from '@components/Placeholder';

export type TileKeyType = `${number}${typeof tileKeySeparator}${number}`;

export type PlaceholderKeyType = `${number}${typeof placeholderKeySeparator}${number}`;

export type TilesType = Map<TileKeyType, Tile>;

export type PlaceholdersType = Map<PlaceholderKeyType, Placeholder>;

export type LandParamsType = {
    tiles?: TilesType;
    placeholders?: PlaceholdersType;
};
