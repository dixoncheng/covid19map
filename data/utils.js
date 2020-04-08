export function fixTypos(location) {
  // correct typos on MOH site
  if (location === "Coramandel") {
    return "Coromandel";
  }
  if (location === "Dundedin") {
    return "Dunedin";
  }
  if (location === "Hawkes Bay") {
    return "Hawke's Bay";
  }
  if (location === "Hawke’s Bay") {
    return "Hawke's Bay";
  }
  if (location === "Hawkes’s Bay") {
    return "Hawke's Bay";
  }
  if (location === "Capital & Coast") {
    return "Capital and Coast";
  }
  if (location === "Nelson-Marlborough") {
    return "Nelson Marlborough";
  }
  if (location === "Southern DHB") {
    return "Southern";
  }
  if (location === "Tairawhiti") {
    return "Tairāwhiti";
  }
  if (location === "Capital & Coast (Wellington)") {
    return "Capital and Coast";
  }
  if (location === "Counties Manukau (Middlemore)") {
    return "Counties Manukau";
  }
  if (location === "Southern (Invercargill)") {
    return "Southern";
  }
  if (location === "Bay of Plenty (Tauranga)") {
    return "Bay of Plenty";
  }
  if (location === "Southern (Dunedin)") {
    return "Southern";
  }
  if (location === "Southern (Lakes District & Dunedin)") {
    return "Southern";
  }
  return location;
}
