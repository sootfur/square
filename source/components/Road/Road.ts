import { context } from '@options';
import { Vector } from '@utils/Vector';
import type {
    RoadParamsType,
    RoadVariantType,
    RoadTransformType,
} from './types';
import { roadVariants } from './types'

const roadWidth = 40;
const roadRadius = 10;
const minRotation = 0;
const maxRotation = 3;

export class Road {
    coords: Vector;

    width: number;

    height: number;

    rotation: number;

    fullRotation: number;

    variant: RoadVariantType;

    transform: RoadTransformType;

    path: Path2D;

    constructor(params: RoadParamsType) {
        this.setCoords(params.coords);
        this.setWidth(params.width);
        this.setHeight(params.height);
        this.setRotation(params.rotation);
        this.setVariant(params.variant);
        this.setTransform(params.transform);
        this.fullRotation = params.fullRotation;

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

    setRotation(rotation: number) {
        this.rotation = rotation < minRotation
            ? (maxRotation + 1) - Math.abs(rotation % (maxRotation + 1))
            : rotation % (maxRotation + 1);
    }

    setVariant(variant: RoadVariantType) {
        this.variant = variant;
    }

    setTransform(transform: Partial<RoadTransformType>) {
        this.transform = {
            ...this.transform,
            ...transform,
        };
    }

    setPath(path: Path2D) {
        this.path = path;
    }

    createPath() {
        const x0 = this.coords.x;
        const x1 = x0 + (this.width - roadWidth) / 2;
        const x2 = x1 + roadWidth;
        const x3 = x0 + this.width;
        const y0 = this.coords.y;
        const y1 = y0 + (this.height - roadWidth) / 2
        const y2 = y1 + roadWidth;
        const y3 = y0 + this.height;

        let points: Vector[] = [];

        switch(this.variant) {
            case roadVariants.deadEnd:
                points = [
                    new Vector(x1, y0),
                    new Vector(x2, y0),
                    new Vector(x2, y1),
                    new Vector(x1, y1),
                ];
                break;

            case roadVariants.straightRoad:
                points = [
                    new Vector(x1, y0),
                    new Vector(x2, y0),
                    new Vector(x2, y3),
                    new Vector(x1, y3),
                ];
                break;

            case roadVariants.turnRoad:
                points = [
                    new Vector(x1, y0),
                    new Vector(x2, y0),
                    new Vector(x2, y2),
                    new Vector(x0, y2),
                    new Vector(x0, y1),
                    new Vector(x1, y1),
                ];
                break;

            case roadVariants.tCrossing:
                points = [
                    new Vector(x1, y0),
                    new Vector(x2, y0),
                    new Vector(x2, y1),
                    new Vector(x3, y1),
                    new Vector(x3, y2),
                    new Vector(x0, y2),
                    new Vector(x0, y1),
                    new Vector(x1, y1),
                ];
                break;

            case roadVariants.xCrossing:
                points = [
                    new Vector(x1, y0),
                    new Vector(x2, y0),
                    new Vector(x2, y1),
                    new Vector(x3, y1),
                    new Vector(x3, y2),
                    new Vector(x2, y2),
                    new Vector(x2, y3),
                    new Vector(x1, y3),
                    new Vector(x1, y2),
                    new Vector(x0, y2),
                    new Vector(x0, y1),
                    new Vector(x1, y1),
                ];
                break;
        }

        const rotationAngle = this.fullRotation * 90;
        const path = new Path2D();

        points.forEach((point, index) => {
            let coords = point;

            if (rotationAngle) {
                const pivot = new Vector(x0 + this.width / 2, y0 + this.height / 2);

                // coords = point.subtract(pivot).rotate(rotationAngle).add(pivot)
            }

            if (index === 0) {
                path.moveTo(coords.x, coords.y);
            } else {
                path.lineTo(coords.x, coords.y);
            }
        });

        path.closePath();

        this.setPath(path);
    }

    changeRotation(rotation: number) {
        this.fullRotation = rotation;
        this.createPath();
    }

    public render() {
        context.fillStyle = '#333333';
        context.fill(this.path);
    }
}
