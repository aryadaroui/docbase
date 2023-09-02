
import cheerio from "cheerio";


export function directive_splitter(html: string) {


	// only matches the first directive closing tag. should use cheerio here too

	// console.log(html);

	const regex = /(<directive.*?>.*?<\/directive>)/gs;
	const html_list = html.split(regex).filter((str) => str.trim() !== '');

	return html_list.map(str => {
		if (str.startsWith('<directive')) {

			const $ = cheerio.load(str);
			const directive = $('directive')[0];
			const attributes = directive.attribs;
			
			// delete attributes.name;

			// debugger;
			// handle possible nullness of directive
			// if (!directive) {
			// 	return {
			// 		is_directive: false,
			// 		content: str
			// 	};
			// }

			// for (let i = 0; i < directive.attributes.length; i++) {
			// 	attributes[directive.attributes[i].name] = directive.attributes[i].value;
			// }

			return {
				is_directive: true,
				attributes: attributes,
				content: $('directive').html()
			};
		}
		return {
			is_directive: false,
			content: str
		};
	});
}