export * from './http';
export * from './date';
export * from './fs';
export * from './db';
export * from './dom';
export * from './file-types';
export * from './build';
export * from './logging';
export * from './errors';
export * from './stores';
export * from './locales';
export * from './styles';
export * from './comunications';
export * from './validation';
export * from './sort';
export * from './react';
export * from './time';
export * from './extension';

export type AssembledType<T> = {
  [K in keyof T]: T[K];
};
export type SymbolType = string;
export type Meta<T = unknown> = Record<string, T>;
export type ValueOf<T> = T[keyof T];
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type Value = string | boolean | unknown[] | number | Record<string, unknown> | Function;
export type ExpectedValue = Value | null;
