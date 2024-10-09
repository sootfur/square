export const biomeVariants = {
    lawn: 'lawn',
    road: 'road',
} as const;

export type BiomeVariantType = typeof biomeVariants[keyof typeof biomeVariants];
