import { Placeholder } from '@components/Placeholder';
import { Tile } from '@components/Tile';
import {
    tileWidth,
    tileHeight,
    tileKeySeparator,
    placeholderKeySeparator,
} from '@constants'
import { Coords } from '@utils/Coords';
import { eventObserver } from '@utils/EventObserver';
import {
    LandParamsType,
    TileKeyType,
    PlaceholderKeyType,
    TilesType,
    PlaceholdersType,
} from './types';

export class Land {
    tiles: TilesType;
    placeholders: PlaceholdersType;

    constructor(params: LandParamsType) {
        this.setTiles(params.tiles ?? new Map());
        this.setPlaceholders(params.placeholders ?? new Map());

        this.createPlaceholders();

        document.addEventListener('click', (event) => {
            eventObserver.addListener('click', () => {
                const i = Math.trunc(event.clientX / tileWidth);
                const j = Math.trunc(event.clientY / tileHeight);
            });
        });
    }

    setTiles(tiles: TilesType): void {
        this.tiles = tiles;
    }

    setPlaceholders(placeholders: PlaceholdersType) {
        this.placeholders = placeholders;
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

    createPlaceholders() {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const key = this.getPlaceholderKey(i, j);
                const placeholder = new Placeholder({
                    coords: new Coords(j * tileWidth, i * tileHeight),
                    width: tileWidth,
                    height: tileHeight,
                });

                this.setPlaceholder(key, placeholder);
            }
        }
    }

    render() {
        this.placeholders.forEach(placeholder => placeholder.render());
        this.tiles.forEach(tile => tile.render());
    }
}
