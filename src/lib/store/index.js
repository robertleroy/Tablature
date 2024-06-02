
import { writable } from 'svelte/store';
import beethoven from "./beethoven";
import fleetwood_mac from "./fleetwood_mac";
import jimi_hendrix from "./jimi_hendrix";
import led_zeppelin from "./led_zeppelin";

const tabs = [
  beethoven, 
  fleetwood_mac, 
  jimi_hendrix, 
  led_zeppelin,
];

export const store = writable({
  selectedBand: null,
  selectedSong: null,
  showSidebar: true,
  searchFilter: "",
  selectedTuning: "standard",
  tabs
});