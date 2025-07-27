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
    let hasValidCondition = false;

    for (const key in dto) {
      const value = dto[key];
      // 过滤掉 null、undefined 和空字符串
      if (value == null || value === '') continue;

      hasValidCondition = true;
      if (Array.isArray(value)) {
        (where as any)[key] = In(value);
      } else if (typeof value === 'string' && fuzzyFields.includes(key)) {
        (where as any)[key] = Like(`%${value}%`);
      } else {
        (where as any)[key] = value;
      }
    }

    // 如果没有有效条件，返回空对象
    return hasValidCondition ? where : {};
  };

  return Array.isArray(input) ? input.map(buildSingle) : buildSingle(input);
}
