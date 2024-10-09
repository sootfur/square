import { Coords } from '@utils/Coords'
import { toRadians } from '@utils/toRadians';
import {
  RoundRectParamsType,
  RoundRectParamsRadiusType,
  RoundRectParamsTransformType,
  RoundRectRadiusType,
  RoundRectTransformType,
} from './types';

export class RoundRect {
  public coords: Coords;

  public width: number;

  public height: number;

  public radius: RoundRectRadiusType;

  public transform: Partial<RoundRectTransformType> = {};

  private pivot: Coords;

  constructor(params: Partial<RoundRectParamsType>) {
    this.setCoords(params.coords);
    this.setWidth(params.width);
    this.setHeight(params.height);
    this.setRadius(params.radius);
    this.setTransform(params.transform);
    this.setPivot(params.pivot);
  }

  public get path(): Path2D {
    const path = new Path2D();
    const { x, y } = this.coords;
    const angle = this.transform?.rotate || 0;
    
    let rectCoords = [
      new Coords(x + this.radius[0], y + this.radius[0]),
      new Coords(x + this.width - this.radius[1], y + this.radius[1]),
      new Coords(x + this.width - this.radius[2], y + this.height - this.radius[2]),
      new Coords(x + this.radius[3], y + this.height - this.radius[3]),
    ];
    
    if (angle) {
      const pivot = this.pivot ?? new Coords(
        x + this.width / 2,
        y + this.height / 2
      );
      
      rectCoords = rectCoords.map(coords => coords.subtract(pivot).rotate(angle).add(pivot));
    }
    
    path.arc(rectCoords[0].x, rectCoords[0].y, this.radius[0], toRadians(180 + angle), toRadians(270 + angle));
    path.arc(rectCoords[1].x, rectCoords[1].y, this.radius[1], toRadians(270 + angle), toRadians(angle));
    path.arc(rectCoords[2].x, rectCoords[2].y, this.radius[2], toRadians(angle), toRadians(90 + angle));
    path.arc(rectCoords[3].x, rectCoords[3].y, this.radius[3], toRadians(90 + angle), toRadians(180 + angle));
    
    path.closePath();

    return path;
  }

  private setCoords(coords: Coords): void {
    this.coords = coords;
  }

  private setWidth(width: number): void {
    this.width = width;
  }

  private setHeight(height: number): void {
    this.height = height;
  }

  private setRadius(radius: RoundRectParamsRadiusType): void {
    if (!Array.isArray(radius)) {
      this.radius = [radius, radius, radius, radius];
    } else if (radius.length === 2) {
      this.radius = [radius[0], radius[1], radius[0], radius[1]];
    } else if (radius.length === 3) {
      this.radius = [radius[0], radius[1], radius[2], radius[1]];
    } else if (radius.length === 4) {
      this.radius = [radius[0], radius[1], radius[2], radius[3]];
    } else {
      this.radius = [0, 0, 0, 0];
    }
  }

  private setTransform(transform: Partial<RoundRectParamsTransformType>): void {
    if (Array.isArray(transform?.translate)) {
      this.transform = {
        translateX: transform.translate[0] ?? 0,
        translateY: transform.translate[1] ?? 0,
      };
    }

    if (transform?.translateX) {
      this.transform.translateX = transform?.translateX ?? 0;
    }

    if (transform?.translateY) {
      this.transform.translateY = transform?.translateY ?? 0;
    }

    if (transform?.rotate) {
      this.transform.rotate = transform?.rotate ?? 0;
    }
  }

  private setPivot(pivot: Coords): void {
    this.pivot = pivot;
  }
}
