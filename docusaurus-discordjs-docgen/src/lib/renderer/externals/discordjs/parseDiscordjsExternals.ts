import { isNullishOrEmpty } from '@sapphire/utilities';
import { extractContentWithLink, extractGenericType, extractGenericTypeInfill, type MatchResult } from '../parsers';
import { resolveClasses } from './resolveClasses';
import { resolveTypeDefs } from './resolveTypedefs';

export function parseDiscordjsExternals(content: string): string {
	// Early exit if there is nothing to parse
	if (isNullishOrEmpty(content)) return content;

	content = replaceContent(content, extractGenericType);
	content = replaceContent(content, extractGenericTypeInfill);
	content = replaceContent(content, extractContentWithLink);

	return content;
}

function replaceContent(content: string, extractor: (content: string) => MatchResult[]) {
	const matchGroupsForLinks = extractor(content);

	for (const match of matchGroupsForLinks) {
		const { matchContent } = match;
		const discordjsLink = resolveClasses(matchContent) ?? resolveTypeDefs(matchContent);

		if (discordjsLink) {
			const markdownLink = `[\`${match.matchContent}\`](${discordjsLink})`;

			content = content.replace(matchContent, markdownLink);
		}
	}

	return content;
}
