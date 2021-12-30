export interface PluginOptions {
	id: string;
	docsRoot: string;
	out: string;
	sidebar: SidebarOptions;
	docgenJsonFile: string;
	// readmeTitle?: string;
	// globalsTitle?: string;
	// plugin: string[];
	// readme?: string;
	// disableOutputCheck?: boolean;
	// entryPoints?: string[];
	// watch: boolean;
	// hideInPageTOC: boolean;
	// hideBreadcrumbs: boolean;
	// hidePageTitle: boolean;
	// entryDocument: string;
	// indexSlug?: string;
}

interface SidebarOptions {
	fullNames?: boolean;
	categoryLabel: string;
	indexLabel?: string;
	readmeLabel?: string;
	position: number | null;
}

interface SidebarCategory {
	type: string;
	label: string;
	items: SidebarItem[];
}

type SidebarItem = SidebarCategory | string;
