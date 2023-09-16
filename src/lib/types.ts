import type { Node } from 'unist';
export type { Node as NodeUnified, Parent as ParentUnified } from 'unist';
export type { Root, Element, Text, Properties, ElementContent } from 'hast';

export interface DirectiveNode extends Node {
	name: string;
	attributes: {
		[key: string]: string;
	};
	children: Node[];
}

export interface TextNode extends Node {
	value: string;
}

export interface CodeNode extends Node {
	type: 'code';
	lang: string;
	meta: string | null;
	value: string;
}
