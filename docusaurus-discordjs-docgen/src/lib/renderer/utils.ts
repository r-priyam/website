import { existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'node:fs';
import type { Documentation } from '../types/docgen-output';
import { parseDiscordjsExternals } from './externals/discordjs/parseDiscordjsExternals';
import { parseMdnExternals } from './externals/mdn/parseMdnExternals';
import { parseSapphire } from './externals/sapphire/parseSapphire';

export function parseContent(jsonFileContent: Documentation, content: string) {
	content = escapeGreaterThanSymbols(content);
	content = parseSapphire(jsonFileContent, content);
	content = parseDiscordjsExternals(content);
	content = parseMdnExternals(content);

	return content;
}

export function escapeGreaterThanSymbols(markdown: string) {
	return markdown.replace(/<([A-Za-z]+)>/gm, '<$1\\>');
}

export function removeDir(outputDir: string) {
	if (existsSync(outputDir)) {
		const files = readdirSync(outputDir);
		if (files.length > 0) {
			files.forEach((filename) => {
				if (statSync(`${outputDir}/${filename}`).isDirectory()) {
					removeDir(`${outputDir}/${filename}`);
				} else {
					unlinkSync(`${outputDir}/${filename}`);
				}
			});
			rmdirSync(outputDir);
		} else {
			rmdirSync(outputDir);
		}
	}
}

export function createDirIfNotExists(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}
