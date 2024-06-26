/**
 * Get deep property from object
 * @param obj
 * @param path
 */
export const getDeepProperty = (obj: object, path: string): string => {
  const keys = path.split(".") as (keyof typeof obj)[];
  return keys.reduce((o, key) => o && o[key], obj) as unknown as string;
};
