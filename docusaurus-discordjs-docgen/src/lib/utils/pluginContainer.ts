import type { PluginOptions } from '../types/types';

// @ts-expect-error initialise empty container
export const pluginContainer: Container = {};

interface Container {
	pluginOptions: PluginOptions;
}
