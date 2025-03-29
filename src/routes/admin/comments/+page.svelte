<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	interface Comment {
		id: string;
		post_slug: string;
		author_name: string;
		author_email: string;
		content: string;
		created_at: string;
		approved: boolean;
	}

	let comments: Comment[] = [];
	let loading = true;
	let error: string | null = null;
	let deletingId: string | null = null;
	let updatingId: string | null = null;

	async function loadComments() {
		try {
			const { data, error: supabaseError } = await supabase
				.from('comments')
				.select('*')
				.order('created_at', { ascending: false });

			if (supabaseError) throw supabaseError;
			comments = data || [];
		} catch (e) {
			console.error('Error loading comments:', e);
			error = 'Failed to load comments. Please try again later.';
		} finally {
			loading = false;
		}
	}

	async function toggleApproval(comment: Comment) {
		try {
			updatingId = comment.id;
			error = null;

			const { error: supabaseError } = await supabase
				.from('comments')
				.update({ approved: !comment.approved })
				.eq('id', comment.id);

			if (supabaseError) throw supabaseError;

			// Update local state
			comments = comments.map((c) => (c.id === comment.id ? { ...c, approved: !c.approved } : c));
		} catch (e) {
			console.error('Error updating comment:', e);
			error = 'Failed to update comment. Please try again.';
		} finally {
			updatingId = null;
		}
	}

	async function deleteComment(commentId: string) {
		if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.'))
			return;

		try {
			deletingId = commentId;
			error = null;

			const { error: supabaseError } = await supabase.from('comments').delete().eq('id', commentId);

			if (supabaseError) throw supabaseError;

			// Update local state
			comments = comments.filter((c) => c.id !== commentId);
		} catch (e) {
			console.error('Error deleting comment:', e);
			error = 'Failed to delete comment. Please try again.';
		} finally {
			deletingId = null;
		}
	}

	onMount(loadComments);
</script>

<div class="min-h-screen bg-background">
	<div class="max-w-4xl mx-auto p-4">
		<div class="flex items-center justify-between mb-8">
			<h1 class="text-2xl font-bold text-text">Comment Moderation</h1>
			<a href="/" class="text-sm text-muted-foreground hover:text-text transition-colors"
				>← Back to site</a
			>
		</div>

		{#if loading}
			<div class="flex items-center justify-center py-12">
				<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		{:else if error}
			<div class="rounded-lg bg-destructive/10 p-4 text-destructive">
				{error}
			</div>
		{:else}
			<div class="space-y-4">
				{#each comments as comment (comment.id)}
					<div class="rounded-lg border border-border bg-card p-6">
						<div class="flex justify-between items-start">
							<div class="space-y-2">
								<div class="flex items-center gap-2">
									<p class="font-medium text-text">{comment.author_name}</p>
									<span class="text-sm text-muted-foreground">•</span>
									<p class="text-sm text-muted-foreground">{comment.author_email}</p>
								</div>
								<p class="text-sm text-muted-foreground">
									{new Date(comment.created_at).toLocaleString()}
								</p>
								<p class="text-text">{comment.content}</p>
								<p class="text-sm text-muted-foreground">Post: {comment.post_slug}</p>
							</div>
							<div class="flex gap-2">
								<button
									class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors {comment.approved
										? 'bg-primary/10 text-primary hover:bg-primary/20'
										: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
									on:click={() => toggleApproval(comment)}
									disabled={updatingId === comment.id}
								>
									{#if updatingId === comment.id}
										Updating...
									{:else}
										{comment.approved ? 'Approved' : 'Pending'}
									{/if}
								</button>
								<button
									class="px-3 py-1.5 rounded-md text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
									on:click={() => deleteComment(comment.id)}
									disabled={deletingId === comment.id}
								>
									{#if deletingId === comment.id}
										Deleting...
									{:else}
										Delete
									{/if}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
