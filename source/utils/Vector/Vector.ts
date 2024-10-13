import { Point } from '@utils/Point';

export class Vector extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public subtract(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public multiply(k: number): Vector {
        return new Vector(this.x * k, this.y * k);
    }
}
