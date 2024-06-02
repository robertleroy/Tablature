<script>
  import { slide } from "svelte/transition";
	import { store } from "$lib/store";
</script>

{#each $store.tabs as group}
<div class="group">
  <button class="unset"
    on:click={() => {
      $store.selectedBand === group ?
      $store.selectedBand = null :
      $store.selectedBand = group;
    }}>
    {group.name}
  </button>
    
  {#if $store.selectedBand == group}
  <div class="songs" transition:slide>
    {#each group.songs as song}
    <button class="unset song"
      class:selected={song === $store.selectedSong}
      on:click={() => {
        $store.selectedSong = song;
        $store.showSidebar = false;
      }}>{song.title}</button>
    {/each}
  </div>
  {/if}

</div>
{/each}

<style>

</style>