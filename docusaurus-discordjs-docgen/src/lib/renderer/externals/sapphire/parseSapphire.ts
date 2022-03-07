import { isNullishOrEmpty } from '@sapphire/utilities';
import type { Documentation } from '../../../types/docgen-output';
import { extractContentWithLink, extractGenericType, extractGenericTypeInfill, type MatchResult } from '../parsers';
import { resolveClasses } from './resolveClasses';
import { resolveNamespaces } from './resolveNamespaces';
import { resolveTypeDefs } from './resolveTypeDefs';

export function parseSapphire(jsonFileContent: Documentation, content: string): string {
	// Early exit if there is nothing to parse
	if (isNullishOrEmpty(content)) return content;

	content = replaceContent(jsonFileContent, content, extractGenericType);
	content = replaceContent(jsonFileContent, content, extractGenericTypeInfill);
	content = replaceContent(jsonFileContent, content, extractContentWithLink);

	return content;
}

function replaceContent(jsonFileContent: Documentation, content: string, extractor: (content: string) => MatchResult[]) {
	const matchGroupsForLinks = extractor(content);

	for (const match of matchGroupsForLinks) {
		const { matchContent } = match;
		const docsLink =
			resolveClasses(matchContent, jsonFileContent.classes) ??
			resolveTypeDefs(matchContent, jsonFileContent.typedefs) ??
			resolveNamespaces(matchContent, jsonFileContent.namespaces);

		if (docsLink) {
			const markdownLink = `[\`${match.matchContent}\`](${docsLink})`;

			content = content.replace(matchContent, markdownLink);
		}
	}

	return content;
}
