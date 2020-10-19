export type ObjectLiteralUnion<T extends { [key: string]: string }, S extends string> = Record<keyof T | S, string>;
