export class Coords {
  public x: number;

  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public setCoords(x?: number, y?: number): void {
    if (x !== undefined) {
      this.setX(x);
    }

    if (y !== undefined) {
      this.setY(y);
    }
  }

  public add(coords: Coords): Coords {
    return new Coords(
      this.x + coords.x,
      this.y + coords.y
    );
  }

  subtract(coords: Coords): Coords {
    return new Coords(
      this.x - coords.x,
      this.y - coords.y
    );
  }

  public rotate(angle: number): Coords {
    const rad = angle * Math.PI / 180;

    return new Coords(
      this.x * Math.cos(rad) - this.y * Math.sin(rad),
      this.x * Math.sin(rad) + this.y * Math.cos(rad)
    );
  }
}
