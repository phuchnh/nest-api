export class Enum {
  static toArray<T = string>(enumVal: unknown): T[] {
    return Object.values(enumVal) as T[];
  }
}
