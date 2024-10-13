import {
    leftBasis,
    rightBasis,
} from '@options';
import { Vector } from '@utils/Vector';

export function tileCoordinatesToCanvasCoordinates(v: Vector): Vector {
    return rightBasis.multiply(v.x).add(leftBasis.multiply(v.y));
}
