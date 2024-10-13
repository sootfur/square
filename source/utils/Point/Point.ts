export class Point {
  public x: number;

  public y: number;

  constructor(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }
}
