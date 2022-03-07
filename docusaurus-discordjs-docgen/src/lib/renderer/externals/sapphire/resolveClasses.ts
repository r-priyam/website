import type { DocumentationClass } from '../../../types/docgen-output';

export function resolveClasses(name: string, allClasses: DocumentationClass[]): string | undefined {
	const allClassNames = allClasses.map((c) => c.name);

	if (allClassNames.includes(name)) {
		return `../classes/${name.toLowerCase().replace(/\s/g, '-')}.mdx`;
	}

	return undefined;
}
