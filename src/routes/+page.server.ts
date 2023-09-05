import fs from 'fs';

export async function load({ params }) {
	const post = fs.readFileSync('./test_data/test1.md', 'utf-8');



	return {post};
}