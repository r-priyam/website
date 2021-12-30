import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentationCustom, DocumentationCustomFile } from '../types/docgen-output';
import { writeCategoryYaml } from './writeCategoryYaml';

function renderCustomFile(slug: string, customFile: DocumentationCustomFile, outputDir: string, sidebarPosition: number) {
	const lowercaseCustomFileType = customFile.type.toLowerCase();

	if (lowercaseCustomFileType === 'md' || lowercaseCustomFileType === 'mdx' || lowercaseCustomFileType === 'markdown') {
		const customFileHeader = [
			'---',
			`id: "${slug}"`,
			`title: "${customFile.name}"`,
			`sidebar_label: "${customFile.name}"`,
			`sidebar_position: ${sidebarPosition}`,
			`custom_edit_url: null`,
			'---'
		].join('\n');

		const customFileResult = `${customFileHeader}\n${customFile.content}`;
		writeFileSync(resolve(outputDir, `${slug}.mdx`), customFileResult);
	}
}
export function renderCustom(documentationCustom: DocumentationCustom, outputDir: string) {
	let categorySidebarPosition = 0;
	for (const customCategory of Object.values(documentationCustom)) {
		const categoryDir = writeCategoryYaml(outputDir, customCategory.name, customCategory.name, categorySidebarPosition);

		let fileSidebarPosition = 0;
		for (const [slug, file] of Object.entries(customCategory.files)) {
			renderCustomFile(slug, file, categoryDir, fileSidebarPosition);
			fileSidebarPosition++;
		}

		categorySidebarPosition++;
	}
}
