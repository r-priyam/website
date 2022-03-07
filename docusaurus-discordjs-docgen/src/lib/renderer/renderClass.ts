import { isNullishOrEmpty } from '@sapphire/utilities';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Documentation, DocumentationClass } from '../types/docgen-output';
import { pluginContainer } from '../utils/pluginContainer';
import { parseContent } from './utils';
import { writeCategoryYaml } from './writeCategoryYaml';

function renderClass(jsonFileContent: Documentation, dClass: DocumentationClass, outputDir: string, sidebarPosition: number) {
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
${isNullishOrEmpty(classExtends) ? '' : `**extends ${parseContent(jsonFileContent, classExtends)}**`}
${isNullishOrEmpty(classImplements) ? '' : `**implements ${parseContent(jsonFileContent, classImplements)}**`}

${parseContent(jsonFileContent, classDescription)}

${parseContent(jsonFileContent, classExtendedDescription)}
${parseSee(jsonFileContent, dClass.see)}

${parseExamples(dClass.examples)}

${parseConstructor(dClass)}
`;

	writeFileSync(resolve(outputDir, `${slug}.mdx`), classResult);
}

export function renderClasses(jsonFileContent: Documentation, documentationClasses: DocumentationClass[], outputDir: string) {
	const categoryDir = writeCategoryYaml(outputDir, 'classes', 'Classes', 1);

	let fileSidebarPosition = 0;
	for (const documentationClass of documentationClasses) {
		renderClass(jsonFileContent, documentationClass, categoryDir, fileSidebarPosition);

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
		const exampleWithPlugin = example.replace(/(```typescript)\n/g, '$1 ts2esm2cjs\n');

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

function parseSee(jsonFileContent: Documentation, see?: string[]) {
	return see?.map((seeItem) => `\n**\`See also:\`** ${parseContent(jsonFileContent, seeItem)}`).join('\n') ?? '';
}
