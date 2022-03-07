import type { LoadContext } from '@docusaurus/types';
import { from, isErr } from '@sapphire/result';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderOutputFiles } from './lib/renderer/render';
import { removeDir } from './lib/renderer/utils';
import { writeCategoryYaml } from './lib/renderer/writeCategoryYaml';
import type { Documentation } from './lib/types/docgen-output';
import type { PluginOptions } from './lib/types/types';
import { generateLogString } from './lib/utils/logger';
import { getPluginOptions } from './lib/utils/options';
import { pluginContainer } from './lib/utils/pluginContainer';

// store list of plugin ids when running multiple instances
const apps: string[] = [];

export default function docusaurusDiscordjsDocgen(context: LoadContext, opts: Partial<PluginOptions>) {
	return {
		name: 'docusaurus-discordjs-docgen',
		loadContent() {
			if (opts.id && !apps.includes(opts.id)) {
				apps.push(opts.id);

				const { siteDir } = context;

				const options = getPluginOptions(opts);

				pluginContainer.pluginOptions = options;

				const outputDir = resolve(siteDir, options.docsRoot, options.out);

				removeDir(outputDir);

				writeCategoryYaml(outputDir, '', options.sidebar.categoryLabel, options.sidebar.position ?? 0);

				const docgenJsonFile = from<Documentation>(() => {
					return JSON.parse(readFileSync(resolve(options.docgenJsonFile), 'utf8'));
				});

				if (isErr(docgenJsonFile)) {
					throw new Error(generateLogString(`Failed to parse JSON file at path ${resolve(options.docgenJsonFile)}`, options.id));
				}

				const jsonFileContent = docgenJsonFile.value;

				renderOutputFiles(jsonFileContent, outputDir, options);
			}
		}
	};
}
