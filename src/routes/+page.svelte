<script>
	import { fly, slide, fade } from "svelte/transition";
	import { store } from "$lib/store";
	import TreePanel from "$lib/components/TreePanel.svelte";
	import SearchPanel from "$lib/components/SearchPanel.svelte";
	import SearchButton from "$lib/components/SearchButton.svelte";
	

	let title = "Tablature",
	innerWidth,
	flexWidth,
	asideWidth,
	mainWidth,
	showSearch = false,
	debug = false,
	// placeholder = `E|-------- Tablature --------|`;
	placeholder = `e|-------0---|--0---0-------|--------------|--------------|----------0---|
B|---------4-|----4---0-3-1-|--------------|--0---------0-|--1---------4-|
G|-----------|--------------|--2---2-----2-|------1---1---|------2-------|
D|-----------|--------------|----2-----2---|----2---2-----|----2---2-----|
A|-----------|--------------|--0-----3-----|--------------|--0-----------|
E| Tablature |--------------|--------------|--0-----------|--------------|`;

	$: float = ((innerWidth - flexWidth) / 2);
	$: if (innerWidth > 900) $store.showSidebar = false;
	$: {
		title = $store.selectedSong ?
			innerWidth > 900 ?
			$store.selectedSong?.artist + ": " :
			$store.selectedSong?.artist + 
				": " + $store.selectedSong?.title :
		"Tablature";
	};	
</script>
<svelte:window bind:innerWidth/>


<header>
	<div class="flex" bind:clientWidth={flexWidth} style:fill="red">
		<div class="title">
			<div class="icon logo" style="font-size: 1em"></div>
			<div class="">{title}</div>
		</div>

		<div class="tabTitle">{$store.selectedSong?.title || ""}</div>
		<button class="icon menu"
			on:click={() => $store.showSidebar = !$store.showSidebar } >
    </button>
	</div>
</header>


{#if $store.showSidebar || innerWidth > 900}
<aside  bind:clientWidth={asideWidth}
	transition:fly={{
		duration: 300,
		x: "-100%",
		opacity: 1
}}>
	<nav>
		<div class="search_button">
			<SearchButton bind:toggle={showSearch}/>
		</div>

		{#key showSearch}		
		<div class="panel" 
			transition:fade={{duration: 300}}>
			{#if showSearch}
			<SearchPanel />
			{:else}
			<TreePanel />
			{/if}
		</div>
		{/key}


		{#if debug}
		<div class="meta">
			<div class="">innerWidth: {innerWidth} </div>
			<div class="">flexWidth: {flexWidth} </div>
			<div class="">float: {float} </div>
			<br>
			<div class="">aside: {asideWidth} </div>
			<div class="">main: {mainWidth} </div>
		</div>
		{/if}
	</nav>
</aside>
{/if}


<main bind:clientWidth={mainWidth}>
	<div class="shell">

	<!-- {#if $store.selectedSong} -->
		<div class="router">
		{#key $store.selectedSong}
			<!-- <slot /> -->
			<div class="tablature" transition:fade={{duration: 300}}>
				{@html $store.selectedSong?.tab || placeholder}
			</div>
			<!-- {@render children()} -->
		{/key}
		</div>
	<!-- {:else}
		<div class="placeholder">{title}</div>
	{/if} -->
		

		
	</div>
</main>


<style>

</style>