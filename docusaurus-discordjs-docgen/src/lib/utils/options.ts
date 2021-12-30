import type { PluginOptions } from '../types/types';

const DEFAULT_PLUGIN_OPTIONS: PluginOptions = {
	id: 'default',
	docsRoot: 'docs',
	out: 'api',
	docgenJsonFile: 'docs.json',
	packageName: 'API',
	sidebar: {
		categoryLabel: 'API',
		position: null
	}
};

export function getPluginOptions(opts: Partial<PluginOptions>): PluginOptions {
	const options = {
		...DEFAULT_PLUGIN_OPTIONS,
		...opts,
		packageName: opts.packageName ?? opts.sidebar?.categoryLabel ?? DEFAULT_PLUGIN_OPTIONS.packageName,
		sidebar: {
			...DEFAULT_PLUGIN_OPTIONS.sidebar,
			...opts.sidebar
		}
	};

	return options;
}
