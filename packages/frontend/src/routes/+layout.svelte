<script lang="ts">
  import '../app.css';
  import { checkAuth, isAuthenticated, isChecking } from '$lib/stores/auth.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let { children } = $props();

  onMount(async () => {
    await checkAuth();

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated() && window.location.pathname !== '/login') {
      goto('/login');
    }
  });
</script>

{#if isChecking()}
  <div class="loading-screen">
    <div class="spinner"></div>
  </div>
{:else}
  {@render children()}
{/if}

<style>
  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    background: var(--bg-primary);
  }

  .spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
