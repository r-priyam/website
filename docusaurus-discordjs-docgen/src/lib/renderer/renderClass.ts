import { isNullishOrEmpty } from '@sapphire/utilities';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentationClass } from '../types/docgen-output';
import { pluginContainer } from '../utils/pluginContainer';
import { parseContent } from './utils';
import { writeCategoryYaml } from './writeCategoryYaml';

function renderClass(dClass: DocumentationClass, outputDir: string, sidebarPosition: number) {
	const slug = dClass.name.toLowerCase().replace(/\s/g, '-');

	const classHeader = [
		'---',
		`id: "${slug}"`,
		`title: "${dClass.name}"`,
		`sidebar_label: "${dClass.name}"`,
		`sidebar_position: ${sidebarPosition}`,
		`custom_edit_url: null`,
		'---'
	].join('\n');

	const classExtends = parseClassExtendsAndImplements(dClass.extends);
	const classImplements = parseClassExtendsAndImplements(dClass.implements);

	const classDescription = dClass.description ?? '';
	const classExtendedDescription = dClass.extendedDescription ?? '';

	const classResult = `${classHeader}
${isNullishOrEmpty(classExtends) ? '' : `**extends ${parseContent(classExtends)}**`}
${isNullishOrEmpty(classImplements) ? '' : `**implements ${parseContent(classImplements)}**`}

${parseContent(classDescription)}

${parseContent(classExtendedDescription)}
${parseSee(dClass.see)}

${parseExamples(dClass.examples)}

${parseConstructor(dClass)}
`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), classResult);
}
export function renderClasses(documentationClasses: DocumentationClass[], outputDir: string) {
	const categoryDir = writeCategoryYaml(outputDir, 'classes', 'Classes', 1);

	let fileSidebarPosition = 0;
	for (const documentationClass of documentationClasses) {
		renderClass(documentationClass, categoryDir, fileSidebarPosition);

		fileSidebarPosition++;
	}
}

function parseClassExtendsAndImplements(classExtends?: string[] | string[][]) {
	if (!classExtends) return '';

	const zeroEntry = classExtends?.[0];

	if (Array.isArray(zeroEntry)) {
		return zeroEntry.join(', ');
	}

	return zeroEntry;
}

function parseExamples(examples?: string[]) {
	if (isNullishOrEmpty(examples)) return '';

	let examplesString = '## Examples\n\n';

	for (const example of examples) {
		const exampleWithPlugin = example.replaceAll('```typescript\n', '```typescript ts2esm2cjs\n');

		examplesString += `${exampleWithPlugin}\n\n`;
	}

	return examplesString;
}

function parseConstructor(dClass: DocumentationClass) {
	const classConstructorParameters = dClass.construct.params?.map((param) => param.name).join(', ');

	return `## Constructor

\`\`\`typescript ts2esm2cjs
import { ${dClass.name} } from '${pluginContainer.pluginOptions.packageName}';

new ${dClass.name}(${classConstructorParameters});
\`\`\``;
}

function parseSee(see?: string[]) {
	return see?.map((seeItem) => `\n**\`See also:\`** ${parseContent(seeItem)}`).join('\n') ?? '';
}
