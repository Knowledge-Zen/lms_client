<script lang="ts">
  export let title = '';
  export let hotkeys: string[] = [];
  export let direction = '';
</script>

{#if !!title}
  <div class="tooltip">
    <span
      class="tooltiptext z-20 {direction === 'right'
        ? 'right'
        : direction === 'top'
          ? 'top'
          : direction === 'bottom'
            ? 'bottom'
            : 'left'}"
    >
      {title}
      {#if Array.isArray(hotkeys) && hotkeys.length}
        <span class="shortcut">
          {#each hotkeys as hotkey}<span>{hotkey}</span>{/each}
        </span>
      {/if}
    </span>
    <slot />
  </div>
{:else}
  <slot />
{/if}

<style>
  .tooltip {
    position: relative;
    display: inline-block;
  }
  .right {
    left: 100%;
    right: unset !important;
  }
  .bottom {
    bottom: -75% !important;
    left: -80%;
    right: unset !important;
    top: unset !important;
  }
  .tooltip .tooltiptext {
    color: #fff;
    padding: 8px;
    font-size: 0.625rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    line-height: 1.4em;
    border-radius: 8px;
    background-color: #000;
    visibility: hidden;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
    font-size: 13px;

    /* Position the tooltip */
    position: absolute;
    z-index: 2;
    /* top: 100%;
      left: 0; */
    top: 20%;
    right: 100%;
    margin-left: 5px;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .shortcut span {
    font-weight: lighter;
    padding: 2px 4px;
    background-color: rgba(97, 97, 97, 0.9);
    border-radius: 2px;
    margin-left: 5px;
  }
</style>
