<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { supabase } from '$lib/supabase';

	export let postSlug: string;

	type Comment = {
		id: string;
		author_name: string;
		content: string;
		created_at: string;
		approved: boolean;
	};

	type RealtimePayload = {
		new: Comment;
		old: Comment | null;
		eventType: 'INSERT' | 'UPDATE' | 'DELETE';
	};

	let comments: Comment[] = [];
	let isLoading = true;
	let error: string | null = null;

	onMount(() => {
		loadComments();

		// Subscribe to new comments
		const subscription = supabase
			.channel('comments')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'comments',
					filter: `post_slug=eq.${postSlug}`
				},
				(payload: RealtimePayload) => {
					if (payload.new.approved) {
						comments = [payload.new, ...comments];
					}
				}
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	});

	async function loadComments() {
		try {
			const { data, error: fetchError } = await supabase
				.from('comments')
				.select('*')
				.eq('post_slug', postSlug)
				.eq('approved', true)
				.order('created_at', { ascending: false });

			if (fetchError) throw fetchError;

			comments = data || [];
		} catch (e) {
			error = 'Failed to load comments';
		} finally {
			isLoading = false;
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-8">
	{#if isLoading}
		<div class="flex justify-center">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
	{:else if error}
		<div class="text-red-500 text-center">{error}</div>
	{:else if comments.length === 0}
		<p class="text-text-muted text-center">No comments yet. Be the first to comment!</p>
	{:else}
		<div class="space-y-6">
			{#each comments as comment (comment.id)}
				<div transition:fade class="bg-surface/50 rounded-lg p-6 border border-slate-700">
					<div class="flex justify-between items-start mb-2">
						<span class="font-medium text-text">{comment.author_name}</span>
						<time class="text-sm text-text-muted" datetime={comment.created_at}>
							{formatDate(comment.created_at)}
						</time>
					</div>
					<p class="text-text-muted whitespace-pre-wrap">{comment.content}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
