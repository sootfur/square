import {
    tileKeySeparator,
    placeholderKeySeparator,
} from '@options';
import type { Tile } from '@components/Tile';
import type { Placeholder } from '@components/Placeholder';
import { Point } from '@utils/Point';
import { Vector } from '@utils/Vector';

export type TileKeyType = `${number}${typeof tileKeySeparator}${number}`;

export type PlaceholderKeyType = `${number}${typeof placeholderKeySeparator}${number}`;

export type TilesType = Map<TileKeyType, Tile>;

export type PlaceholdersType = Map<PlaceholderKeyType, Placeholder>;

export type LandParamsWhenClickType = {
    key: TileKeyType;
    canvasCoordinates: Point;
    tileCoordinates: Vector;
};

export type LandParamsType = {
    tiles?: TilesType;
    placeholders?: PlaceholdersType;
    whenClick?: (params: LandParamsWhenClickType) => void;
};
