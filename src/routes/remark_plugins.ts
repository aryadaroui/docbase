import { visit } from 'unist-util-visit';
import type { Root, NodeUnified, ParentUnified, DirectiveNode, CodeNode, TextNode, HeadingNode } from '$lib/types';


/** The label data for a ref_id */
interface LabelData {
	prefix: string;
	count: string;
	html_id: string;
}

/** for each directive name, stores its prefix */
const prefix_dict: { [key: string]: string; } = {
	'code': 'Code block',
	'callout': 'Callout',
};

/** for each prefixed, stores the count */
export const prefix_counter = {
	_map: new Map<string, number>(),
	get(prefix: string) {
		return this._map.get(prefix);
	},
	set(prefix: string, count: number) {
		this._map.set(prefix, count);
	},
	clear() {
		this._map.clear();
	},
	increment(prefix: string) {
		const count = this.get(prefix) || 0;
		this.set(prefix, count + 1);
	}
};

export const heading_counter = {
	depths: [0, 0, 0, 0, 0, 0,],
	increment(depth: number) {
		this.depths[depth]++;

		// set all deeper to 0
		for (let i = depth + 1; i < this.depths.length; i++) {
			this.depths[i] = 0;
		}
	},
	reset(depth: number) {
		this.depths[depth] = 0;
	},
	clear() {
		this.depths = [0, 0, 0, 0, 0, 0,];
	}
};

/** for each ref_id, stores the prefix, count, and html_id */
const ref_dict: { [key: string]: LabelData; } = {};

function log_node() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {

			console.log("log node: ", node);
		});
	};
}

export function enumerate_headings() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {

			if (node.type === 'heading') {
				const heading_node = node as HeadingNode;
				heading_counter.increment(heading_node.depth);

				const count = heading_counter.depths.slice(1, heading_node.depth + 1).join('.') + '.';
				// set the html id to "heading" + count.
				// e.g. "heading-1.2."
				heading_node.data = {
					hProperties: {
						id: 'heading-' + count,
					}
				};

				ref_dict['heading-' + count] = {
					prefix: 'Heading',
					count: count,
					html_id: 'heading-' + count
				}
			}
		});
	};
}

/** Handles the ref directive
 * - sets the prefix, count, and html_id attributes based on the target key in ref_dict
 */
export function handle_ref(directive_node: DirectiveNode) {
	if (directive_node.name === 'ref') {


		// get the target from the first child's value if it exists
		let target = (directive_node.children[0] as TextNode)?.value || '';

		// if target starts with a "#", then remove it
		if (target.startsWith('#')) {
			target = target.slice(1);
		}

		// check if key exists in ref_dict
		if (ref_dict[target]) {

			directive_node.attributes.prefix = ref_dict[target].prefix;
			directive_node.attributes.count = ref_dict[target].count;
			directive_node.attributes.html_id = ref_dict[target].html_id;
		} else {
			directive_node.attributes.prefix = "Error:";
			directive_node.attributes.count = "bad ref";
			directive_node.attributes.html_id = "";
		}
	}
}

/** Prepares directive labels.
 * - sets the prefix and count attributes (and increments the prefix counter)
 * - sets the html_id attribute
 * - sets the ref_id attribute if the user provided an id
 */
export function prep_labels() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {
			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const directive_node = node as DirectiveNode;

				if (!directive_node.attributes.prefix) {
					directive_node.attributes.prefix = prefix_dict[directive_node.name];
				}
				prefix_counter.increment(directive_node.attributes.prefix);
				directive_node.attributes.count = String(prefix_counter.get(directive_node.attributes.prefix));

				// set html_id to prefix + count but in hyphen-case
				directive_node.attributes.html_id = (directive_node.attributes.prefix + '-' + directive_node.attributes.count).toLowerCase().replace(/ /g, '-');

				// handle ref_id if provided id
				if (directive_node.attributes.id) {
					// directive_node.attributes.ref_id = directive_node.attributes.id;
					ref_dict[directive_node.attributes.id] = {
						prefix: directive_node.attributes.prefix,
						count: directive_node.attributes.count,
						html_id: directive_node.attributes.html_id
					};
					delete directive_node.attributes.id;
				}
			}
		});
	};
}


/**
 * handles code directives
 * - sets the meta string for the code block from the h_lines and h_chars attributes
 */
export function handle_code_block(directive_node: DirectiveNode) {
	let temp = ''; // temp string to store the meta string

	// line numbers are the default
	if (directive_node.attributes?.class_?.includes('no-num')) {
		// pass
	} else {
		temp += ' showLineNumbers';
	}

	if (directive_node.attributes.highlight) {
		// will be in the form of "{1 3-5} /foo/ /bar/".
		// replace spaces with commas if they're within curly braces. e.g. "{1 3-5} /foo/ /bar/" -> "{1,3-5} /foo/ /bar/"
		temp += ' ' + directive_node.attributes.highlight.replace(/(\{.*?\})/g, (match) => {
			return match.replace(/ /g, ',');
		}
		);

	}

	if (directive_node.attributes.filename) {
		temp += ' title="' + directive_node.attributes.filename + '"';
	}

	console.log("temp: ", temp);


	// // IF .h_start or h_end exists
	// // AND the node's first child is a code block
	// // THEN set the code block's meta = temp
	// if ((directive_node.attributes.h_lines || directive_node.attributes.h_chars) && directive_node.children[0].type === 'code') {
	// 	const code_node = directive_node.children[0] as CodeNode;
	// 	code_node.meta = temp;
	// }

	// for each child, if it is a code block, set its meta = temp
	directive_node.children.forEach((child) => {
		if (child.type === 'code') {
			const code_node = child as CodeNode;
			code_node.meta = temp;
		}
	});

	// console.log("code node: ", directive_node);

}

/**
 * generally handles all directives
 * - removes attributes.name if user provided it
 * - sets the tag name (hName & directive_type) and props (attributes)
 */
export function handle_directive(directive_node: DirectiveNode) {

	// remove attributes.name if it exists
	// this is because the name is already stored in directive_node.name
	// we rely on that to dynamically generate the svelte component
	if (directive_node.attributes.name) {
		delete directive_node.attributes.name;
	}

	// rename attributes.class to attributes.class_
	// because class is a reserved word and causes problems
	if (directive_node.attributes.class) {
		directive_node.attributes.class_ = directive_node.attributes.class;
		delete directive_node.attributes.class;
	}

	// special handlers
	let directive_type = 'directive';
	if (directive_node.type === 'textDirective') {
		handle_ref(directive_node);
		directive_type = 'directive-inline';
	} else if (directive_node.type === 'leafDirective' || directive_node.type === 'containerDirective') {
		handle_code_block(directive_node);
		directive_type = 'directive-block';
	}

	const data = {
		hName: directive_type,
		hProperties: {
			name: directive_node.name,
			...directive_node.attributes
		}
	};
	directive_node.data = Object.assign({}, directive_node.data, data);

}

/**
 * visit all directives and handle them
 */
export function visit_directives() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {
			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const directive_node = node as DirectiveNode;
				handle_directive(directive_node);
			}
		});
	};
}