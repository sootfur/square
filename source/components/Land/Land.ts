import { Placeholder } from '@components/Placeholder';
import { Tile } from '@components/Tile';
import {
    tileKeySeparator,
    placeholderKeySeparator,
} from '@options';
import { Point } from '@utils/Point';
import { Vector } from '@utils/Vector';
import { eventObserver } from '@utils/EventObserver';
import { canvasCoordinatesToTileCoordinates } from '@utils/canvasCoordinatesToTileCoordinates';
import {
    LandParamsType,
    LandParamsWhenClickType,
    TileKeyType,
    PlaceholderKeyType,
    TilesType,
    PlaceholdersType,
} from './types';

export class Land {
    public tiles: TilesType;

    public placeholders: PlaceholdersType;

    public whenClick?: (params: LandParamsWhenClickType) => void; // rename -> when set new tile?

    constructor(params: LandParamsType) {
        this.setTiles(params.tiles ?? new Map());
        this.setPlaceholders(params.placeholders ?? new Map());
        this.setWhenClick(params?.whenClick);

        document.addEventListener('click', (event) => {
            eventObserver.addListener('click', () => {
                const canvasCoordinates = new Point(event.clientX, event.clientY);
                const tileCoordinates = canvasCoordinatesToTileCoordinates(canvasCoordinates);
                const key = this.getTileKey(tileCoordinates.x, tileCoordinates.y);

                if (!this.hasTile(key)) {
                    this?.whenClick({
                        key,
                        canvasCoordinates,
                        tileCoordinates,
                    });
                }
            });
        });
    }

    setTiles(tiles: TilesType): void {
        this.tiles = tiles;
    }

    setPlaceholders(placeholders: PlaceholdersType) {
        this.placeholders = placeholders;
    }

    setWhenClick(whenClick: (params: LandParamsWhenClickType) => void): void {
        this.whenClick = whenClick;
    }

    setTile(key: TileKeyType, tile: Tile): void {
        this.tiles.set(key, tile);
    }

    setPlaceholder(key: PlaceholderKeyType, placeholder: Placeholder): void {
        this.placeholders.set(key, placeholder);
    }

    getTileKey(i: number, j : number): TileKeyType {
        return `${i}${tileKeySeparator}${j}`;
    }

    getTile(key: TileKeyType): Tile | undefined {
        return this.tiles.get(key);
    }

    hasTile(key: TileKeyType): boolean {
        return this.tiles.has(key);
    }

    removeTile(key: TileKeyType) {
        return this.tiles.delete(key);
    }

    getPlaceholderKey(i: number, j : number): PlaceholderKeyType {
        return `${i}${placeholderKeySeparator}${j}`;
    }

    getPlaceholder(key: PlaceholderKeyType): Placeholder | undefined {
        return this.placeholders.get(key);
    }

    hasPlaceholder(key: PlaceholderKeyType): boolean {
        return this.placeholders.has(key);
    }

    removePlaceholder(key: PlaceholderKeyType) {
        return this.placeholders.delete(key);
    }

    addTile(key: TileKeyType, tile: Tile): void {
        if (this.hasPlaceholder(key)) {
            this.removePlaceholder(key);
        }

        this.setTile(key, tile);

        [
            new Vector(tile.coords.x + 1, tile.coords.y),
            new Vector(tile.coords.x - 1, tile.coords.y),
            new Vector(tile.coords.x, tile.coords.y + 1),
            new Vector(tile.coords.x, tile.coords.y - 1),
        ].forEach(coords => this.addPlaceholder(coords));
    }

    addPlaceholder(coords: Vector): void {
        const key = this.getPlaceholderKey(coords.x, coords.y); // переименовать в  LandKeyType

        if (!this.hasTile(key) && !this.hasPlaceholder(key)) {
            this.setPlaceholder(key, new Placeholder({
                coords,
            }));
        }
    }

    render() {
        this.placeholders.forEach(placeholder => placeholder.render());
        this.tiles.forEach(tile => tile.render());
    }
}
