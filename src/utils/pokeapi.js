// Extract the trailing numeric id from a PokeAPI resource url,
// e.g. ".../pokemon/25/" -> "25".
export const idFromUrl = (url) => url.split("/").filter(Boolean).pop();
