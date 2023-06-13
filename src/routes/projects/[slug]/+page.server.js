// @ts-nocheck
import { error } from '@sveltejs/kit';
import {
	get_project,
	get_team_by_slug,
	get_project_markdown_content_url,
	get_project_images,
	get_user_by_uid
} from '$lib/client'; // TODO: use firebase admin SDK

// https://kit.svelte.dev/docs/load#universal-vs-server-input
export const load = async ({ fetch, parent, params: { slug: project_slug } }) => {
	const project = await get_project(project_slug);
	const team = await get_team_by_slug(project.team_slug);
	const parent_data = await parent();

	let user = null;
	let is_team_author = false;

	if (parent_data?.decoded_claims.uid) {
		user = await get_user_by_uid(parent_data.decoded_claims.uid);
		if (user.team_slug === team.slug && team.admin[0] === parent_data.decoded_claims.uid) {
			is_team_author = true;
		}
	}

	const images = await get_project_images({
		team_slug: project.team_slug,
		project_slug: project_slug
	});

	const url = await get_project_markdown_content_url({
		team_slug: project.team_slug,
		project_slug: project_slug
	});

	const markdown_content = url ? await fetch(url).then((data) => data.text()) : null;

	if (!project || !team || !url || !markdown_content) {
		throw error(404, { message: 'Could not get project' });
	}

	return {
		project,
		images,
		team,
		markdown_content,
		is_team_author
	};
};

export const prerender = 'auto';
