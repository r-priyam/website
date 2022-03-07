import { isNullishOrEmpty } from '@sapphire/utilities';
import { extractContentWithLink, extractGenericType, extractGenericTypeInfill, type MatchResult } from '../parsers';
import { resolveCss } from './resolveCss';
import { resolveDom } from './resolveDom';
import { resolveGlobals } from './resolveGlobals';

export function parseMdnExternals(content: string): string {
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
		const mdnLink = resolveGlobals(matchContent) ?? resolveDom(matchContent) ?? resolveCss(matchContent);

		if (mdnLink) {
			const markdownLink = `[\`${match.matchContent}\`](${mdnLink})`;

			content = content.replace(matchContent, markdownLink);
		}
	}

	return content;
}
