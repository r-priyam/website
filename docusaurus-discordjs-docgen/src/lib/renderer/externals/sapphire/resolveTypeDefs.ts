import type { DocumentationTypeDefinition } from '../../../types/docgen-output';

export function resolveTypeDefs(name: string, allTypedefs: DocumentationTypeDefinition[]): string | undefined {
	const allTypedefNames = allTypedefs.map((c) => c.name);

	if (allTypedefNames.includes(name)) {
		return `../typedef/${name.toLowerCase().replace(/\s/g, '-')}.mdx`;
	}

	return undefined;
}
