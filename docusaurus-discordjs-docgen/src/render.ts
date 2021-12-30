import { existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Documentation, DocumentationCustom, DocumentationCustomFile } from './docgen-output';
import type { PluginOptions } from './types';

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

export function writeDocumentationCategory(outputDir: string, options: PluginOptions) {
	createDirIfNotExists(outputDir);
	const categoryData = [
		//
		`label: "${options.sidebar.categoryLabel}"`,
		`position: ${options.sidebar.position}`
	].join('\n');

	writeFileSync(resolve(outputDir, '_category_.yml'), categoryData);
}

export function renderOutputFiles(jsonFileContent: Documentation, outputDir: string, _pluginOptions: PluginOptions) {
	if (Reflect.has(jsonFileContent, 'custom')) {
		renderCustom(jsonFileContent.custom, outputDir);
	}
}

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

function renderCustom(documentationCustom: DocumentationCustom, outputDir: string) {
	let categorySidebarPosition = 0;
	for (const customCategory of Object.values(documentationCustom)) {
		const categoryDir = resolve(outputDir, customCategory.name);

		createDirIfNotExists(categoryDir);

		const categoryData = [
			//
			`label: "${customCategory.name}"`,
			`position: ${categorySidebarPosition}`
		].join('\n');

		writeFileSync(resolve(categoryDir, '_category_.yml'), categoryData);

		let fileSidebarPosition = 0;
		for (const [slug, file] of Object.entries(customCategory.files)) {
			renderCustomFile(slug, file, categoryDir, fileSidebarPosition);
			fileSidebarPosition++;
		}

		categorySidebarPosition++;
	}
}

function createDirIfNotExists(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}
