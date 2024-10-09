import { Coords } from '@utils/Coords';

export type RoadParamsType = {
    coords: Coords;
    width: number; // px
    height: number; // px
    rotation: number;
    fullRotation: number;
    variant: RoadVariantType;
    transform?: RoadTransformType;
};

export const roadVariants = {
    xCrossing: 'xCrossing',
    tCrossing: 'tCrossing',
    turnRoad: 'turnRoad',
    straightRoad: 'straightRoad',
    deadEnd: 'deadEnd',
} as const;

export type RoadVariantType = typeof roadVariants[keyof typeof roadVariants];

export type RoadTransformType = {
    rotate: number; // deg
};
