import { parse, type Rule } from 'css';

type CssProperty = string | { __expression__: string };
type CSSProperties = Record<string, CssProperty>;

function transformRules(rules: Rule[], result: Record<string, CssProperty>) {
	if (rules) {
		rules.forEach((rule) => {
			const obj = {};
			if (rule.type === 'media') {
				const name = mediaNameGenerator(rule.media);

				result[name] ||= {
					__expression__: rule.media
				};

				const media = result[name];

				transformRules(rule.rules, media as any);
			} else if (rule.type === 'rule') {
				rule.declarations.forEach((declaration) => {
					if (declaration.type === 'declaration') {
						const cleanProperty = cleanPropertyName(declaration.property);

						Reflect.set(obj, cleanProperty, declaration.value);
					}
				});

				rule.selectors.forEach((selector) => {
					const name = nameGenerator(selector.trim());

					Reflect.set(result, name, obj);
				});
			}
		});
	}
}

const cleanPropertyName = (name: string) => {
	// turn things like 'align-items' into 'alignItems'
	name = name.replace(/(-.)/g, (v) => v[1].toUpperCase());

	return name;
};

const mediaNameGenerator = (name: string) => `@media ${name}`;

const nameGenerator = (name: string) => {
	name = name.replace(/\s\s+/g, ' ');
	name = name.replace(/[^a-zA-Z0-9]/g, '_');
	name = name.replace(/^_+/g, '');
	name = name.replace(/_+$/g, '');

	return name;
};

export function transformPlainCssToReactCss(inputCssText: string): CSSProperties | CssProperty {
	if (!inputCssText) {
		throw new Error('missing css text to transform');
	}

	// If the input "css" doesn't wrap it with a css class (raw styles)
	// we need to wrap it with a style so the css parser doesn't choke.
	let bootstrapWithCssClass = false;
	if (!inputCssText.includes('{')) {
		bootstrapWithCssClass = true;
		inputCssText = `.bootstrapWithCssClass { ${inputCssText} }`;
	}

	const css = parse(inputCssText);

	const result: CSSProperties = {};

	transformRules(css.stylesheet?.rules, result);

	// Don't expose the implementation detail of our wrapped css class.
	if (bootstrapWithCssClass) {
		return result.bootstrapWithCssClass;
	}

	return result;
}
