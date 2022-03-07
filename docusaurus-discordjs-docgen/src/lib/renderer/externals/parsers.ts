const linkExtractorRegex = /{@link (?<match>[A-Za-z.]+)}/g;
const genericTypeInfillRegex = /\[?[A-Za-z]+\]?(?:\([\.A-Za-z\/]+\))?<(?<match>[A-Za-z]+)\\?>/g;
const genericTypeRegex = /(?<match>[A-Za-z]+)<\[?[A-Za-z]+\]?(?:\([\.A-Za-z\/]+\))?\\?>/g;

export interface MatchResult {
	match: string;
	matchContent: string;
	index: number;
}

export function extractContentWithLink(content: string): MatchResult[] {
	const matchGroups: MatchResult[] = [];

	const matches = content.matchAll(linkExtractorRegex);

	for (const match of matches) {
		if (match.groups?.match && match.index !== undefined) {
			matchGroups.push({
				match: match[0],
				matchContent: match.groups.match,
				index: match.index
			});
		}
	}

	return matchGroups;
}

export function extractGenericTypeInfill(content: string): MatchResult[] {
	const matchGroups: MatchResult[] = [];

	const matches = content.matchAll(genericTypeInfillRegex);

	for (const match of matches) {
		if (match.groups?.match && match.index !== undefined) {
			matchGroups.push({
				match: match[0],
				matchContent: match.groups.match,
				index: match.index
			});
		}
	}

	return matchGroups;
}

export function extractGenericType(content: string): MatchResult[] {
	const matchGroups: MatchResult[] = [];

	const matches = content.matchAll(genericTypeRegex);

	for (const match of matches) {
		if (match.groups?.match && match.index !== undefined) {
			matchGroups.push({
				match: match[0],
				matchContent: match.groups.match,
				index: match.index
			});
		}
	}

	return matchGroups;
}
