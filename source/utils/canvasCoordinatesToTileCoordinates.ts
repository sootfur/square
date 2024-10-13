import {
    tileWidth,
    tileHeight,
} from '@options';
import { Point } from '@utils/Point';
import { Vector } from '@utils/Vector';

export function canvasCoordinatesToTileCoordinates(canvasCoordinates: Point | Vector): Vector {
    const x = canvasCoordinates.x / tileWidth + canvasCoordinates.y / tileHeight;
    const y = canvasCoordinates.y / tileHeight - canvasCoordinates.x / tileWidth;

    return new Vector(Math.floor(x / 2), Math.floor(y / 2));
}
