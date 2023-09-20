
// TODO: use a double hr to ignore the grouping and revert to a normal hr

// takes in a list of HAST nodes that may contain <hr> tags and returns divs containing the nodes, split by the <hr> tags
export function group_by_hr(children: any[], two_args = ['body', 'footer'], three_args = ['header', 'body', 'footer']) {

	let groups = [];
	let group = [];

	children.forEach(child => {
		if (child.type == "element" && child.tagName == "hr") {
			groups.push(group);
			group = [];
		} else {
			group.push(child);
		}
	});

	// in case the last element is not an <hr>
	if (group.length > 0) {
		groups.push(group);
	}

	// return groups;

	if (groups.length == 1) {
		return { body: groups[0] };
	} else if (groups.length == 2) {
		// use two_args as keys for the return object
		let ret = {};
		two_args.forEach((key, i) => {
			ret[key] = groups[i];
		}
		);
		return ret;
	} else if (groups.length == 3) {
		// use three_args as keys for the return object
		let ret = {};
		three_args.forEach((key, i) => {
			ret[key] = groups[i];
		}
		);
		return ret;
	} else {
		throw new Error("group_by_hr: groups.length > 3");
	}
}
