import { FindOptionsWhere, In, Like } from 'typeorm';

export function buildWhere<T extends Record<string, any>>(
  input?: T | T[],
  options?: {
    fuzzyFields?: (keyof T)[];
  }
): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
  if (!input) return {};

  const { fuzzyFields = [] } = options ?? {};//模糊查询

  const buildSingle = (dto: T): FindOptionsWhere<T> => {
    const where = {} as FindOptionsWhere<T>;

    for (const key in dto) {
      const value = dto[key];
      if (value == null) continue;
      console.log(value, "value");

      if (Array.isArray(value)) {
        (where as any)[key] = In(value);
      } else if (typeof value === 'string' && fuzzyFields.includes(key)) {
        (where as any)[key] = Like(`%${value}%`);
      } else {
        (where as any)[key] = value;
      }
    }

    return where;
  };

  return Array.isArray(input) ? input.map(buildSingle) : buildSingle(input);
}
