import {
  canvas,
  context,
} from '@options';
import { eventObserver } from '@utils/EventObserver';
import {
  Land,
  LandParamsWhenClickType,
} from '@components/Land';
import { Tile } from '@components/Tile';
import { Player } from '@components/Player';
import { Vector } from '@utils/Vector';
import { canvasCoordinatesToTileCoordinates } from '@utils/canvasCoordinatesToTileCoordinates';

export class Game {
  private land: Land;

  private player: Player;

  constructor() {
    Game.setCanvasSize();

    this.land = new Land({
      whenClick: params => this.putTile(params),
    });

    this.player = new Player({
      quantityOfTiles: 3,
    });

    this.createInitialTile();
  }

  private createInitialTile() {
    const i = Math.trunc(canvas.width / 2);
    const j = Math.trunc(canvas.height / 2);
    const key = this.land.getTileKey(i, j);

    this.land.addTile(key, new Tile({
      coords: canvasCoordinatesToTileCoordinates(new Vector(i, j)),
      biomes: ['lawn', 'lawn', 'lawn', 'lawn'],
    }));
  }

  private putTile(params: LandParamsWhenClickType): void {
    const key = params.key;
    const tileCoordinates = params.tileCoordinates;
    const tile = this.player.tile;

    tile.setCoords(tileCoordinates); // не использовать прямой сеттер для возможности запуска компенсирующих методов
    tile.createPath();
    // tile.createElements();

    this.land.addTile(key, tile);
    this.player.createRandomTile();
  }

  static setCanvasSize({ width, height } = { width: window.innerWidth, height: window.innerHeight} ) {
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
  }

  loop(): void {
    eventObserver.startListener('click');

    this.render();
    requestAnimationFrame(this.loop.bind(this));

    eventObserver.removeListener('click');
  }

  start(): void {
    console.log('GAME START');

    this.loop();
  }

  private render(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.land.render();
    this.player.render();
  }
}
