<script>
	import { store } from "$lib/store";
  const flatMap = $store.tabs
    .flatMap(el => el.songs);

  const tunings = 
    flatMap.reduce((arr, obj) => {
			if (!arr.includes(obj.tuning)) {
				arr.push(obj.tuning);
			}
			return arr.sort().reverse();
	}, []);

  $: filteredTabs = () => {    
    return $store.selectedTuning === "all" ?
      flatMap.filter(el => el.title.toLowerCase()
        .includes($store.searchFilter.toLowerCase())) :
      flatMap.filter(el => el.tuning === $store.selectedTuning)
        .filter(el => el.title.toLowerCase()
        .includes($store.searchFilter.toLowerCase()));
  }

  // $: console.log("tunings",tunings);
</script>

<div class="searchControl">
  <input type="text" style:margin="0 0 0.5em"
    bind:value={$store.searchFilter}
    placeholder="..search filter">
    <sub> &lbrace; {filteredTabs().length} &rbrace;</sub>
    <br>
    <select bind:value={$store.selectedTuning}>
      {#each ["all",...tunings] as tunning}
      <option value={tunning}>{tunning}</option>
      {/each}
    </select>
    <sub> &lbrace; by tuning &rbrace;</sub>
</div>



<div class="filteredTabs">
  {#each filteredTabs() as song}
  <button class="unset"
    class:selected={song === $store.selectedSong}
    on:click={() => {
      $store.selectedSong = song;
      $store.selectedBand = $store.tabs.find(el => el.name == song.artist);
      $store.showSidebar = false;
    }}>
    {song.title}
  </button>
  {/each}
</div>