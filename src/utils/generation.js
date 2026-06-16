// Map a national-dex id to its generation (roman numeral + region).
export const GENERATION_LIST = [
  { max: 151, roman: "I", region: "Kanto" },
  { max: 251, roman: "II", region: "Johto" },
  { max: 386, roman: "III", region: "Hoenn" },
  { max: 493, roman: "IV", region: "Sinnoh" },
  { max: 649, roman: "V", region: "Unova" },
  { max: 721, roman: "VI", region: "Kalos" },
  { max: 809, roman: "VII", region: "Alola" },
  { max: 905, roman: "VIII", region: "Galar" },
  { max: 1025, roman: "IX", region: "Paldea" },
];

export function getGeneration(id) {
  const n = Number(id);
  return GENERATION_LIST.find((g) => n <= g.max) || null;
}
