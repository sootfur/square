import { Coords } from '@utils/Coords';

export type RoundRectParamsType = {
  coords: Coords;
  width: number;
  height: number;
  radius: RoundRectParamsRadiusType;
  transform?: Partial<RoundRectParamsTransformType>;
  pivot?: Coords;
};

export type RoundRectParamsRadiusType =
  number |
  [number, number] |
  [number, number, number] |
  [number, number, number, number];

export type RoundRectRadiusType = [number, number, number, number];

export type RoundRectParamsTransformType = {
  translate: number | [number, number];
  translateX: number;
  translateY: number;
  rotate: number;
};

export type RoundRectTransformType = {
  translateX: number;
  translateY: number;
  rotate: number;
};
