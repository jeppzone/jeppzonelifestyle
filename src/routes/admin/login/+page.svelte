<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let email = '';
	let password = '';
	let loading = false;
	let error: string | null = null;
	let attempts = 0;
	const MAX_ATTEMPTS = 5;
	const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
	let lockoutUntil: number | null = null;

	async function handleSubmit() {
		try {
			// Check for lockout
			if (lockoutUntil && Date.now() < lockoutUntil) {
				const remainingMinutes = Math.ceil((lockoutUntil - Date.now()) / 60000);
				error = `Too many attempts. Please try again in ${remainingMinutes} minutes.`;
				return;
			}

			loading = true;
			error = null;

			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (signInError) {
				attempts++;
				if (attempts >= MAX_ATTEMPTS) {
					lockoutUntil = Date.now() + LOCKOUT_TIME;
					error = `Too many failed attempts. Please try again in 15 minutes.`;
				} else {
					error = 'Invalid email or password';
				}
				throw signInError;
			}

			// Reset attempts on successful login
			attempts = 0;
			lockoutUntil = null;

			// Redirect to comments page after successful login
			goto('/admin/comments');
		} catch (e) {
			console.error('Login error:', e);
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		// Check if user is already authenticated
		const {
			data: { session }
		} = await supabase.auth.getSession();

		if (session) {
			// Redirect to comments page if already logged in
			goto('/admin/comments');
		}
	});
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="text-center mb-8">
			<h1 class="text-2xl font-bold text-text mb-2">Admin Login</h1>
			<p class="text-muted-foreground">Sign in to manage comments</p>
		</div>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<label for="email" class="text-sm font-medium text-text">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					autocomplete="email"
					class="w-full px-3 py-2 rounded-md border border-border bg-background text-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Enter your email"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="text-sm font-medium text-text">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class="w-full px-3 py-2 rounded-md border border-border bg-background text-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Enter your password"
				/>
			</div>

			{#if error}
				<div class="rounded-lg bg-destructive/10 p-4 text-destructive text-sm">
					{error}
				</div>
			{/if}

			<button
				type="submit"
				disabled={loading || (lockoutUntil && Date.now() < lockoutUntil)}
				class="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				{#if loading}
					<div class="flex items-center justify-center gap-2">
						<div
							class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"
						></div>
						Signing in...
					</div>
				{:else}
					Sign in
				{/if}
			</button>
		</form>
	</div>
</div>
