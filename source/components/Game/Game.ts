import {
  canvas,
  context,
  tileHeight,
  tileWidth,
} from '@constants';
import { eventObserver } from '@utils/EventObserver';
import { Coords } from '@utils/Coords';
import { Land } from '@components/Land';
import { Player } from '@components/Player';

export class Game {
  private land: Land;

  private player: Player;

  constructor() {
    Game.setCanvasSize();

    this.land = new Land({});

    this.player = new Player({
      quantityOfTiles: 3,
    });

    document.addEventListener('click', (event) => {
      eventObserver.addListener('click', () => {
        const i = Math.trunc(event.clientX / tileWidth);
        const j = Math.trunc(event.clientY / tileHeight);
        const key = this.land.getTileKey(i, j);

        if (!this.land.hasTile(key)) {
          const coords = new Coords(i * tileWidth, j * tileHeight)
          const key = this.land.getTileKey(i, j);
          const tile = this.player.tile;

          tile.setCoords(coords);
          tile.createPath();
          tile.createElements();

          this.land.setTile(key, tile);
          this.player.createRandomTile();
        }
      });
    });
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
