import type { DocumentationNamespace } from '../../../types/docgen-output';

export function resolveNamespaces(name: string, allNamespaces: DocumentationNamespace[]): string | undefined {
	const allNamespaceNames = allNamespaces.map((c) => c.name);

	if (allNamespaceNames.includes(name)) {
		return `../namespace/${name.toLowerCase().replace(/\s/g, '-')}.mdx`;
	}

	return undefined;
}
