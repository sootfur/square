import type { BiomeVariantType } from '@components/Biome';
import { biomeVariants } from '@components/Biome';
import type { RoadVariantType } from '@components/Road';
import {
    Road,
    roadVariants,
} from '@components/Road';
import { context } from '@constants';
import type { Coords } from '@utils/Coords';
import { eventObserver } from '@utils/EventObserver';
import {
    TileParamsType,
    TileElementType,
} from './types';

const minRotation = 0;
const maxRotation = 3;

export class Tile {
    public coords: Coords;

    public width: number;

    public height: number;

    private path: Path2D;

    public rotation: number;

    public biomes: BiomeVariantType[];

    public elements: TileElementType[];

    public whenClick?: (tile: Tile) => void;

    constructor(params: TileParamsType) {
        this.setCoords(params.coords);
        this.setWidth(params.width);
        this.setHeight(params.height);
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

    setCoords(coords: Coords): void {
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

        path.rect(this.coords.x, this.coords.y, this.width, this.height);

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
    }

    changeRotation(rotation: number) {
        this.setRotation(rotation);
        this.createPath();

        this.elements.forEach(element => {
            console.log(element.rotation + (this.rotation - rotation))

            element.changeRotation(element.rotation + this.rotation);
        })
    }

    public render() {
        context.fillStyle = '#69DDAD';
        context.fill(this.path);

        this.elements.forEach(element => element?.render());
    }
}
