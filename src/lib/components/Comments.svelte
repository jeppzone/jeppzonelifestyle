<script lang="ts">
	import CommentForm from './CommentForm.svelte';
	import CommentList from './CommentList.svelte';

	export let postSlug: string;
	console.log('Comments component received postSlug:', postSlug);
</script>

<div class="space-y-12">
	<h2 class="text-2xl font-bold text-text">Comments</h2>

	<CommentList {postSlug} />

	<div class="mt-8">
		<h3 class="text-xl font-semibold text-text mb-4">Leave a Comment</h3>
		<CommentForm {postSlug} />
	</div>
</div>
