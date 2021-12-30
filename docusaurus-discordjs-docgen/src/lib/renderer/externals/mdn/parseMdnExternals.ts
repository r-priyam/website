import { isNullishOrEmpty } from '@sapphire/utilities';
import { extractContentWithLink, extractGenericType, extractGenericTypeInfill, type MatchResult } from '../parsers';
import { resolveCss } from './resolveCss';
import { resolveDom } from './resolveDom';
import { resolveGlobals } from './resolveGlobals';

export function parseMdnExternals(content: string): string {
	// Early exit if there is nothing to parse
	if (isNullishOrEmpty(content)) return content;

	content = replaceContent(content, extractGenericType, true);
	content = replaceContent(content, extractGenericTypeInfill, true);
	content = replaceContent(content, extractContentWithLink, false);

	return content;
}

function replaceContent(content: string, extractor: (content: string) => MatchResult[], useMatch: boolean) {
	const matchGroupsForLinks = extractor(content);

	for (const match of matchGroupsForLinks) {
		const { matchContent, index } = match;
		const discordjsLink = resolveGlobals(matchContent) ?? resolveDom(matchContent) ?? resolveCss(matchContent);

		if (discordjsLink) {
			const markdownLink = `[${useMatch ? match.match : match.matchContent}](${discordjsLink})`;

			content = content.substring(0, index) + markdownLink + content.substring(index + match.match.length);
		}
	}

	return content;
}
