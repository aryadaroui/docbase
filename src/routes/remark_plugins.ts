import { visit } from 'unist-util-visit';
import type { Root, NodeUnified, ParentUnified, DirectiveNode, CodeNode, TextNode } from '$lib/types';


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

/** for each ref_id, stores the prefix, count, and html_id */
const ref_dict: { [key: string]: LabelData; } = {};

function log_node() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {

			console.log("log node: ", node);
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
		console.log("not adding line numbers");
	} else {
		console.log("adding line numbers");
		temp += ' showLineNumbers';
	}

	// if node.attributes.h_lines exists, then add it to temp
	if (directive_node.attributes.h_lines) {
		// replace spaces with commas
		temp += ' {' + directive_node.attributes.h_lines.replace(/ /g, ',') + '}';
	}

	// if node.attributes.h_chars exists, then add it to temp
	if (directive_node.attributes.h_chars) {
		// surround each alpha string with /'s. e.g. "foo bar" -> "/foo/ /bar/"
		temp += directive_node.attributes.h_chars.replace(/([a-zA-Z]+)/g, ' /$1/');
	}



	// IF .h_start or h_end exists
	// AND the node's first child is a code block
	// THEN set the code block's meta = temp
	if ((directive_node.attributes.h_lines || directive_node.attributes.h_chars) && directive_node.children[0].type === 'code') {
		const code_node = directive_node.children[0] as CodeNode;
		code_node.meta = temp;
	}

	// remove h_lines and h_chars from node.attributes if they exist
	if (directive_node.attributes.h_lines) {
		delete directive_node.attributes.h_lines;
	}
	if (directive_node.attributes.h_chars) {
		delete directive_node.attributes.h_chars;
	}
	console.log("code node: ", directive_node);

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