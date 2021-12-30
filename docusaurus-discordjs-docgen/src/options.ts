import type { PluginOptions } from './types';

const DEFAULT_PLUGIN_OPTIONS: PluginOptions = {
	id: 'default',
	docsRoot: 'docs',
	out: 'api',
	docgenJsonFile: 'docs.json',
	sidebar: {
		fullNames: false,
		categoryLabel: 'API',
		indexLabel: undefined,
		readmeLabel: 'Readme',
		position: null
	}
	// hideInPageTOC: true,
	// hideBreadcrumbs: true,
	// hidePageTitle: true,
	// entryDocument: 'index.mdx',
	// plugin: ['none'],
	// watch: false,
	// indexSlug: undefined
};

export function getPluginOptions(opts: Partial<PluginOptions>): PluginOptions {
	const options = {
		...DEFAULT_PLUGIN_OPTIONS,
		...opts,
		sidebar: {
			...DEFAULT_PLUGIN_OPTIONS.sidebar,
			...opts.sidebar
		}
	};

	return options;
}
