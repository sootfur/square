import { canvas } from '@constants';
import type { BiomeVariantType } from '@components/Biome';
import { biomeVariants } from '@components/Biome'
import { Road } from '@components/Road';
import { Tile } from '@components/Tile';
import { Coords } from '@utils/Coords';
import { getRandomNumber } from '@utils/getRandomNumber';
import {
    tileWidth,
    tileHeight,
} from '@constants';
import { PlayerParamsType } from './types';

export class Player {
    tile: Tile;

    quantityOfTiles: number;

    constructor(params: PlayerParamsType) {
        this.setQuantityOfTiles(params.quantityOfTiles);

        this.createRandomTile();

        document.addEventListener('keypress', (event) => {
            if(event.code === 'KeyR') {
                this.tile.changeRotation(this.tile.rotation + 1);
            }

            if(event.code === 'KeyQ') {
                this.tile.changeRotation(this.tile.rotation - 1);
            }
        });
    }

    setTile(tile: Tile) {
        this.tile = tile;
    }

    setQuantityOfTiles(quantityOfTiles: number) {
        this.quantityOfTiles = quantityOfTiles;
    }

    createRandomTile() {
        const biomes: BiomeVariantType[] = [];
        const variants = Object.values(biomeVariants);

        for (let i = 0; i < 4; i++) {
            biomes.push(variants[getRandomNumber(0, variants.length - 1)]);
        }

        this.setTile(
            new Tile({
                coords: new Coords(canvas.width - tileWidth * 2, canvas.height - tileHeight * 2),
                width: tileWidth,
                height: tileHeight,
                biomes,
            })
        );
    }

    render() {
        this.tile?.render();
    }
}
