import webpack from 'webpack';
import { BuildOptions } from './type/config'
import type {configuration as DevServerConfiguration} from 'webpack-dev-server'

export function buildDevServer(port: number): DevServerConfiguration{

 return {
     port: port,
     open: true
 }
}