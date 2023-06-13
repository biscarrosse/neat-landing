<script>
	// @ts-nocheck
	import Metatags from '$lib/components/metatags.svelte';
	import Button from '$lib/components/button.svelte';
	import { format } from 'date-fns';
	import MarkdownIt from 'markdown-it';
	import sanitizeHtml from 'sanitize-html';
	import { afterUpdate } from 'svelte';
	import Gallery from '$lib/components/gallery/gallery.svelte';
	import { is_open_gallery, is_open_edit_project } from '$lib/stores/project.js';
	import { EMERALD_WHITE, EMERALD, DARK } from '$lib/constants/buttonStyles';
	import { getLabel, CATEGORIES, MATERIALS } from '$lib/constants/filters';

	// props:
	export let data;
	const thumbnails = data.images.length > 3 ? data.images.slice(0, 3) : data.images;

	const md = new MarkdownIt();
	let sanitized_markdown = '';
	afterUpdate(() => {
		sanitized_markdown = sanitizeHtml(md.render(data.markdown_content), {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img'])
		});
	});

	const toggle = () => is_open_gallery.update((current) => !current);
	const toggle_edit_project = () => is_open_edit_project.update((current) => !current);
	console.log('___ is_open_gallery:', $is_open_gallery);
</script>

<Metatags title={`Architctr | Project | ${data.project.title}`} />
<Gallery images={data.images} is_open={$is_open_gallery} {toggle} />
<div class="flex flex-col relative">
	<div class="w-54 mt-12 sm:mt-0">
		<Button
			style={EMERALD_WHITE}
			icon="ArrowLeft"
			padding={'py-2 pr-3'}
			label="Back to projects"
			href="/projects"
		/>
	</div>

	<article class="py-4">
		<div class="flex flex-col max-w-prose lg:text-xl">
			<h1 class="mb-2 text-2xl md:text-3xl lg:text-4xl font-bold">
				{data.project.title}
			</h1>

			<button class="relative flex group justify-center items-center" on:click={toggle}>
				<div class="absolute bg-black opacity-0 group-hover:opacity-30 h-full w-full" />
				<h1 class="absolute z-10 text-2xl text-white hidden group-hover:block">Open gallery</h1>
				<div class="w-full flex flex-row flex-nowrap">
					{#each thumbnails as thumbnail}
						<!--sm:max-h-60 md:max-h-96  -->
						<img
							class="w-1/3 object-cover max-h-32 sm:max-h-40 md:max-h-64 group-hover:cursor-pointer"
							src={thumbnail.url}
							alt={thumbnail.name}
						/>
					{/each}
				</div>
			</button>

			<div class="flex my-2 sm:my-4 md:my-6">
				<p class=" text-slate-500 w-28">Authors:</p>
				<a
					class="hover:text-emerald-500 underline underline-offset-4"
					href={'/team/' + data.team.slug}>{data.team.title}</a
				>
			</div>

			{#if !data.project.city && data.project.country}
				<div class="flex mb-2">
					<p class="mb-2 text-slate-500 w-28">Location:</p>
					<p>{data.project.country}</p>
					>
				</div>
			{/if}

			{#if data.project.city && data.project.country}
				<div class="flex mb-2">
					<p class="mb-2 text-slate-500 w-28">Location:</p>
					<p>{data.project.city}, {data.project.country}</p>
				</div>
			{/if}

			<div class="flex mb-2">
				<p class=" text-slate-500 w-28">Year:</p>
				<p>{data.project.year}</p>
			</div>
			<div class="flex mb-2">
				<p class=" text-slate-500 w-28">Status:</p>
				<p>{data.project.status}</p>
			</div>
			<div class="flex mb-2">
				<p class=" text-slate-500 w-28">Floors:</p>
				<p>{data.project.floors}</p>
			</div>
			<div class="flex mb-2">
				<p class=" text-slate-500 w-28">Size:</p>
				<p>{data.project.size} m<span class="superscript">2</span></p>
			</div>
			<div class="mb-2">
				<p class=" text-slate-500 w-28">Materials:</p>
				<div class="flex group flex-wrap">
					{#each data.project.materials as material_id}
						<div class="mr-1 mb-1">
							<Button
								style={DARK}
								label={getLabel(material_id, MATERIALS)}
								href={`/projects/?material=${material_id}`}
							/>
						</div>
					{/each}
				</div>
			</div>
			<div class="mb-2">
				<p class=" text-slate-500 w-28">Categories:</p>
				<div class="flex group flex-wrap">
					{#each data.project.categories as category_id}
						<div class="mr-1 mb-1">
							<Button
								style={EMERALD}
								label={getLabel(category_id, CATEGORIES)}
								href={`/projects/?category=${category_id}`}
							/>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex mb-2">
				<p class=" text-slate-500 w-28">Updated at:</p>
				<p>{format(new Date(data.project.updatedAt), 'PPPP')}</p>
			</div>

			{#if data.is_team_author}
				<p class="text-cyan-500 mb-2">Visible only to you:</p>
				<!-- EDIT PROJECT -->
				<div class="w-56" id="add_project">
					<Button
						style={EMERALD_WHITE}
						padding={'p-0'}
						underline={'underline underline-offset-4'}
						icon={$is_open_edit_project ? 'X' : 'Edit2'}
						label={$is_open_edit_project ? 'Close edit project' : 'Open edit project'}
						handleClick={toggle_edit_project}
					/>
				</div>
			{/if}
		</div>

		<!-- https://tailwindcss.com/docs/typography-plugin TODO: to style incoming HTML or Markdown -->
		<hr class="my-8" />
		{#if sanitized_markdown}
			<div class="prose lg:prose-xl">
				{@html sanitized_markdown}
			</div>
		{/if}
	</article>
</div>
