import { Meta } from './index';
import { LogLevel } from './logging';

export interface ExtendedError extends Error {
  id: string;
  type: string;
  level: LogLevel;
  meta?: Meta;
}
