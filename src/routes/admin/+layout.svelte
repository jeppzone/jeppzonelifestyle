<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let loading = true;
	let user: any = null;

	onMount(async () => {
		// Get initial session
		const {
			data: { session }
		} = await supabase.auth.getSession();
		user = session?.user ?? null;

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, session) => {
			user = session?.user ?? null;
			if (!user) {
				goto('/admin/login');
			}
		});

		// Redirect to login if not authenticated
		if (!user) {
			goto('/admin/login');
		}

		loading = false;

		// Cleanup subscription on component destroy
		return () => {
			subscription.unsubscribe();
		};
	});

	async function handleLogout() {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			goto('/admin/login');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}
</script>

{#if loading}
	<div class="min-h-screen bg-background flex items-center justify-center">
		<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
	</div>
{:else if user}
	<div class="min-h-screen bg-background">
		<nav class="border-b border-border bg-card">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<a href="/admin/comments" class="text-xl font-bold text-text">Admin</a>
						</div>
					</div>
					<div class="flex items-center">
						<button
							on:click={handleLogout}
							class="text-sm text-muted-foreground hover:text-text transition-colors"
						>
							Sign out
						</button>
					</div>
				</div>
			</div>
		</nav>

		<main class="py-6">
			<slot />
		</main>
	</div>
{/if}
