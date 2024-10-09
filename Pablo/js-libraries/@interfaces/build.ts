import { StringDataISO } from './date';

export type BuildManifest = {
  contentHash: string;
  buildTime: StringDataISO;
  project?: string;
  version?: string;
  commitHash?: string;
  author?: string;
};

export enum Mode {
  development = 'development',
  testing = 'testing',
  production = 'production',
}

export enum Browser {
  chrome = 'chrome',
  firefox = 'firefox',
  edge = 'edge',
  safari = 'safari',
}
