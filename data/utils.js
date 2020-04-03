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
  return location;
}
