import type { LoadContext } from '@docusaurus/types';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Documentation } from './docgen-output';
import { generateLogString } from './logger';
import { getPluginOptions } from './options';
import { removeDir, renderOutputFiles, writeDocumentationCategory } from './render';
import type { PluginOptions } from './types';
import { from, isErr } from './utils';

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

				const outputDir = resolve(siteDir, options.docsRoot, options.out);

				removeDir(outputDir);

				writeDocumentationCategory(outputDir, options);

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
