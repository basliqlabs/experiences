<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte'

	let { data } = $props()
	const categories = $derived(data.categories.data)
	const totalPages = $derived(data.categories.totalPages)
</script>

{#each categories as category}
	<a href="/categories/{category}">{category.display_title}</a>
{/each}

<Pagination {totalPages} currentPage={1} baseLink="/categories/page" />
