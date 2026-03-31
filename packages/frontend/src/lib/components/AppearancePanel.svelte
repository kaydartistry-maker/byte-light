<script lang="ts">
  import { ACCENT_PALETTES, setMode, setAccent, getMode, getAccentName, type ThemeMode } from '$lib/stores/theme.svelte';

  let currentMode = $derived(getMode());
  let currentAccent = $derived(getAccentName());

  function handleMode(m: ThemeMode) {
    setMode(m);
  }

  function handleAccent(name: string) {
    setAccent(name);
  }
</script>

<div class="appearance-panel">
  <section class="section">
    <h3 class="section-label">Appearance</h3>

    <div class="mode-toggle">
      <button
        class="mode-btn"
        class:active={currentMode === 'light'}
        onclick={() => handleMode('light')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        Daylight
      </button>
      <button
        class="mode-btn"
        class:active={currentMode === 'dark'}
        onclick={() => handleMode('dark')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
        Midnight
      </button>
    </div>
  </section>

  <section class="section">
    <h3 class="section-label">Accent Palette</h3>

    <div class="palette-grid">
      {#each ACCENT_PALETTES as palette}
        {@const colors = currentMode === 'dark' ? palette.dark : palette.light}
        <button
          class="swatch-btn"
          class:selected={currentAccent === palette.name}
          onclick={() => handleAccent(palette.name)}
          title={palette.name}
        >
          <div class="swatch" style="background: {colors.main}">
            {#if currentAccent === palette.name}
              <svg class="check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            {/if}
          </div>
          <span class="swatch-label">{palette.name}</span>
        </button>
      {/each}
    </div>
  </section>
</div>

<style>
  .appearance-panel {
    max-width: 540px;
  }

  .section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .section:last-child {
    border-bottom: none;
  }

  .section-label {
    font-family: var(--font-heading);
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--accent);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  .mode-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .mode-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-family: var(--font-body);
    font-weight: 500;
    color: var(--text-muted);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 2rem;
    cursor: pointer;
    transition: all var(--transition);
  }

  .mode-btn:hover {
    color: var(--text-secondary);
    border-color: var(--border-hover);
  }

  .mode-btn.active {
    color: var(--text-primary);
    background: var(--bg-active);
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent);
  }

  .palette-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem 0.75rem;
  }

  .swatch-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  .swatch {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--transition), box-shadow var(--transition);
    border: 2px solid transparent;
  }

  .swatch-btn:hover .swatch {
    transform: scale(1.1);
  }

  .swatch-btn.selected .swatch {
    border-color: var(--text-primary);
    box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--text-muted);
  }

  .check {
    stroke: white;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
  }

  .swatch-label {
    font-size: 0.6875rem;
    color: var(--text-muted);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .swatch-btn.selected .swatch-label {
    color: var(--text-primary);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .palette-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem 0.5rem;
    }

    .swatch {
      width: 2.5rem;
      height: 2.5rem;
    }

    .swatch-label {
      font-size: 0.625rem;
    }
  }
</style>
