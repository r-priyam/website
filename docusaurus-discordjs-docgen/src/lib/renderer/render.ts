import type { Documentation } from '../types/docgen-output';
import type { PluginOptions } from '../types/types';
import { renderClasses } from './renderClass';
import { renderCustom } from './renderCustomFile';

export function renderOutputFiles(jsonFileContent: Documentation, outputDir: string, _pluginOptions: PluginOptions) {
	if (Reflect.has(jsonFileContent, 'custom')) {
		renderCustom(jsonFileContent.custom, outputDir);
	}

	if (Reflect.has(jsonFileContent, 'classes')) {
		renderClasses(jsonFileContent.classes, outputDir);
	}
}
