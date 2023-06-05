<script lang="ts">
	import type { STYLE } from '$lib/constants/buttons'

	// props
	export let href: string;
	export let label: string;
	export let style: STYLE;
</script>

<button
	type={'button'}
	class={`w-full py-2 px-3 ${style.default}`}
	><a {href}>
		{label}
	</a>
</button>



