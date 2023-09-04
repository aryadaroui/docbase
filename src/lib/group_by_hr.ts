


// takes in a list of HAST nodes that may contain <hr> tags and returns divs containing the nodes, split by the <hr> tags
export function group_by_hr(children: any[]) {

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

	return groups;
}