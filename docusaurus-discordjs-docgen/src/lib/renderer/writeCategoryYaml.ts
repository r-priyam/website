import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createDirIfNotExists } from './utils';

export function writeCategoryYaml(outputDir: string, categoryPath: string, categoryName: string, sidebarPosition: number) {
	const categoryDir = resolve(outputDir, categoryPath);

	createDirIfNotExists(categoryDir);

	const categoryData = [
		//
		`label: "${categoryName}"`,
		`position: ${sidebarPosition}`
	].join('\n');

	writeFileSync(resolve(categoryDir, '_category_.yml'), categoryData);

	return categoryDir;
}
