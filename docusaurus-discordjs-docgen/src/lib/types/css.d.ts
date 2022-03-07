declare module 'css' {
	export interface Start {
		column: number;

		line: number;
	}

	export interface End {
		column: number;

		line: number;
	}

	export interface Position {
		end: End;

		start: Start;
	}

	export interface Declaration {
		position: Position;

		property: string;

		type: string;

		value: string;
	}

	export interface Start2 {
		column: number;

		line: number;
	}

	export interface End2 {
		column: number;

		line: number;
	}

	export interface Position2 {
		end: End2;

		start: Start2;
	}

	export interface Rule {
		declarations: Declaration[];

		media: string;

		position: Position2;

		rules: Rule[];

		selectors: string[];

		type: string;
	}

	export interface Stylesheet {
		parsingErrors: any[];

		rules: Rule[];
	}

	export interface CssParserResult {
		stylesheet: Stylesheet;

		type: string;
	}

	export function parse(cssText: string): CssParserResult;
}
