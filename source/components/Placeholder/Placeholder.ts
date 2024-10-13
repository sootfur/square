import {
    context,
    leftBasis,
    rightBasis,
    tileSize,
} from '@options';
import { Vector } from '@utils/Vector';
import { tileCoordinatesToCanvasCoordinates } from '@utils/tileCoordinatesToCanvasCoordinates';
import type { PlaceholderParamsType } from './types';

export class Placeholder {
    coords: Vector;

    width: number;

    height: number;

    path: Path2D;

    constructor(params: PlaceholderParamsType) {
        this.setCoords(params.coords);
        this.setWidth(params?.width ?? tileSize);
        this.setHeight(params?.height ?? tileSize);

        this.createPath();
    }

    setCoords(coords: Vector) {
        this.coords = coords;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    setPath(path: Path2D): void {
        this.path = path;
    }

    createPath(): void {
        const path = new Path2D();

        const p0 = tileCoordinatesToCanvasCoordinates(this.coords);
        const p1 = tileCoordinatesToCanvasCoordinates(this.coords).add(rightBasis);
        const p2 = tileCoordinatesToCanvasCoordinates(this.coords).add(rightBasis).add(leftBasis);
        const p3 = tileCoordinatesToCanvasCoordinates(this.coords).add(leftBasis);

        path.moveTo(p0.x, p0.y);
        path.lineTo(p1.x, p1.y);
        path.lineTo(p2.x, p2.y);
        path.lineTo(p3.x, p3.y);

        this.setPath(path);
    }

    public render() {
        context.fillStyle = '#e8ffed';
        context.fill(this.path);
    }
}
