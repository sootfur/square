import {
    context,
    leftBasis,
    rightBasis,
    tileSize,
} from '@options';
import type { BiomeVariantType } from '@components/Biome';
import { biomeVariants } from '@components/Biome';
import type { RoadVariantType } from '@components/Road';
import {
    Road,
    roadVariants,
} from '@components/Road';
import { Vector } from '@utils/Vector';
import { eventObserver } from '@utils/EventObserver';
import { tileCoordinatesToCanvasCoordinates } from '@utils/tileCoordinatesToCanvasCoordinates';

import {
    TileParamsType,
    TileElementType,
} from './types';

const minRotation = 0;
const maxRotation = 3;

export class Tile {
    public coords: Vector;

    public width: number;

    public height: number;

    private path: Path2D;

    public rotation: number;

    public biomes: BiomeVariantType[];

    public elements: TileElementType[];

    public whenClick?: (tile: Tile) => void;

    constructor(params: TileParamsType) {
        this.setCoords(params.coords);
        this.setWidth(params?.width ?? tileSize);
        this.setHeight(params?.height ?? tileSize);
        this.setRotation(params.rotation || 0);
        this.setBiomes(params.biomes);
        this.setElements([]);
        this.setWhenClick(params.whenClick);

        this.createPath();
        this.createElements();

        document.addEventListener('click', (event) => {
            if (this.whenClick && context.isPointInPath(this.path, event.clientX, event.clientY)) {
                eventObserver.addListener('click', () => {
                    this.whenClick(this);
                });
            }
        });
    }

    setCoords(coords: Vector): void {
        this.coords = coords;
    }

    setWidth(width: number): void {
        this.width = width;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    setPath(path: Path2D): void {
        this.path = path;
    }

    setRotation(rotation: number) {
        this.rotation = rotation < minRotation
            ? (maxRotation + 1) - Math.abs(rotation % (maxRotation + 1))
            : rotation % (maxRotation + 1);
    }

    setBiomes(biomes: BiomeVariantType[]) {
        this.biomes = biomes;
    }

    setElements(elements: TileElementType[]) {
        this.elements = elements;
    }

    setElement(element: TileElementType) {
        this.elements.push(element);
    }

    setWhenClick(whenClick?: (tile: Tile) => void): void {
        this.whenClick = whenClick;
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

    createElements() {
        const hasRoadBiome = this.biomes.some((biome) => biome === biomeVariants.road);

        if (hasRoadBiome) {
            this.createRoadElement();
        }
    }

    createRoadElement() {
        const numberOfRoadBiomes: number = this.biomes.filter((biome) => biome === biomeVariants.road).length;
        const firstRoadBiomeIndex: number = this.biomes.findIndex((biome) => biome === biomeVariants.road);
        let roadVariant: RoadVariantType | null = null;
        let roadRotation = firstRoadBiomeIndex;

        switch (numberOfRoadBiomes) {
            case 4:
                roadVariant = roadVariants.xCrossing;
                break;

            case 3:
                roadVariant = roadVariants.tCrossing;
                break;

            case 2:
                if (this.biomes[firstRoadBiomeIndex + 2] === biomeVariants.road) {
                    roadVariant = roadVariants.straightRoad;
                } else {
                    roadVariant = roadVariants.turnRoad;
                }
                break;

            case 1:
                roadVariant = roadVariants.deadEnd;
                break;
        }

        /*
        this.setElement(
            new Road({
                coords: this.coords,
                width: this.width,
                height: this.height,
                rotation: roadRotation,
                fullRotation: roadRotation + this.rotation,
                variant: roadVariant,
            })
        );
        */
    }

    changeRotation(rotation: number) {
        this.setRotation(rotation);
        this.createPath();

        this.elements.forEach(element => {
            element.changeRotation(element.rotation + this.rotation);
        })
    }

    public render() {
        context.fillStyle = '#69DDAD';
        context.fill(this.path);

        // this.elements.forEach(element => element?.render());
    }
}
