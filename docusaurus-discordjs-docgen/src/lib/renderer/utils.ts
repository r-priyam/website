import { existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'node:fs';
import { parseDiscordjsExternals } from './externals/discordjs/parseDiscordjsExternals';
import { parseMdnExternals } from './externals/mdn/parseMdnExternals';

export function parseContent(content: string) {
	content = parseDiscordjsExternals(content);
	content = parseMdnExternals(content);
	content = escapeGreaterThanSymbols(content);

	return content;
}

export function escapeGreaterThanSymbols(markdown: string) {
	return markdown.replace(/<([A-Za-z]+)>/gm, '<`$1`\\>');
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
