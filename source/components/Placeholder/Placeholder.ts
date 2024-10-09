import { context } from '@constants';
import type { Coords } from '@utils/Coords';
import type { PlaceholderParamsType } from './types';

export class Placeholder {
    coords: Coords;

    width: number;

    height: number;

    constructor(params: PlaceholderParamsType) {
        this.setCoords(params.coords);
        this.setWidth(params.width);
        this.setHeight(params.height);
    }

    setCoords(coords: Coords) {
        this.coords = coords;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    render() {
        const x = this.coords.x;
        const y = this.coords.y;

        context.fillStyle = '#CEF';
        context.fillRect(x + this.width / 2 - 2, y + this.height / 2 - 2, 4, 4);
    }
}
