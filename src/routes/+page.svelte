<script lang="ts">
	
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/button.svelte';
	import { truncate } from '$lib/utils';
	import { TEAL, YELLOW } from '$lib/constants/buttons';
	import { slider_store } from '$lib/stores/slider';

	const updater = () => {
		if ($slider_store !== 2) {
			slider_store.update((state: number) => state + 1);
		} else slider_store.update(() => 0);
	};

	let interval = setInterval(async () => {
		updater();
	}, 4000);

	onDestroy(() => {
		slider_store.update(() => 0);
		clearInterval(interval);
	});

	const SLIDES = [
		{
			author: 'Tim B Motivv',
			title: 'silhouette of people looking at auqrium',
			url: 'https://unsplash.com/photos/OYvjvIANSD0'
		},
		{
			author: 'Daniel Corneschi',
			title: 'school of assorted-color fish',
			url: 'https://unsplash.com/photos/GsAJ4-Tsz_c'
		},
		{
			author: 'Dmitry Bukhantsov',
			title: 'purple and pink coral reef',
			url: 'https://unsplash.com/photos/IBrZ-TXYWY8'
		}
	];

	const DOTS = [0, 1, 2];
</script>


<div class="absolute w-screen h-screen flex flex-col justify-center items-center z-10">
	<a href='https://alesklasek.com/projects' target="_blank" class="absolute z-20 top-0 mt-4 underline underline-offset-4 bg-cyan-300/[.85] hover:bg-cyan-400/[.85] px-4 py-2 hover:cursor-pointer">
		Author & code 👀🧜‍♂️
	</a>

	<h1 class="bold tracking-wider text-white uppercase text-5xl shadow-nav text-center">Aquariums scourge</h1>
	<h2 class="text-2xl text-white mx-4 mb-2 shadow-nav text-center">
		A jolly aquarium and a foul aquarium cost the same. Mark me words, matey
	</h2>
	<div class="w-44">
		<Button style={YELLOW} label="Weigh anchor!" href="#" />
	</div>
	<ul data-testid={'dots'} class="flex flex-row mt-8 w-20 justify-between">
		{#each DOTS as num}
			<li>
				<button
					data-testid={'dot-button-' + num}
					on:click={() => {
						clearInterval(interval);
						slider_store.update(() => num);
						interval = setInterval(async () => {
							updater();
						}, 4000);
					}}
					class="h-4 w-4 rounded-full bg-yellow-500 hover:cursor-pointer"
					class:bg-yellow-700={$slider_store === num}
				/>
			</li>
		{/each}
	</ul>

	<div class="absolute left-5 bottom-4 group shadow-nav text-gray-200">
		<p>
			<span class="text-teal-300">Author: </span>
			{truncate(SLIDES[$slider_store].author)}
		</p>
		<p>
			<span class="text-teal-300">Project: </span>
			{truncate(SLIDES[$slider_store].title)}
		</p>
		<a
			class="hover:text-teal-400"
			target="_blank"
			rel="noopener noreferrer"
			href={SLIDES[$slider_store].url}
			><span class="text-teal-300">Website: </span>
			<span class="underline underline-offset-4">{truncate(SLIDES[$slider_store].url)}</span>
		</a>
	</div>
</div>
<div class="wrap relative">
	{#each DOTS as num}
		<div
			class={`img img${num} slide transition ease-in-out duration-300 absolute top-0`}
			class:opacity-0={$slider_store !== num}
			class:opacity-100={$slider_store === num}
		/>
	{/each}
</div>

<style>
	.slide {
		width: 100vw;
		height: 100vh;
	}

	.shadow-nav {
		text-shadow: 4px 4px 12px rgb(2, 14, 176);
	}
	.img {
		background-repeat: no-repeat;
		background-position: top center;
		background-size: cover;
	}
	.img0 {
		background-image: url('$lib/assets/0.jpeg');
	}
	.img1 {
		background-image: url('$lib/assets/1.jpeg');
	}
	.img2 {
		background-image: url('$lib/assets/2.jpeg');
	}
</style>
