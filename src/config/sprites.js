// Centralized sprite / asset URLs so the raw paths live in one place.
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/** High-res-ish default front sprite (PNG). */
export const officialSprite = (id) => `${SPRITE_BASE}/${id}.png`;

/** Gen-5 black/white pixel sprite (PNG). */
export const pixelSprite = (id) =>
  `${SPRITE_BASE}/versions/generation-v/black-white/${id}.png`;

/** Animated "3D" Showdown sprite (GIF). */
export const showdownGif = (id) => `${SPRITE_BASE}/other/showdown/${id}.gif`;

/** Animated Showdown back sprite (GIF) - for the player's side in battle. */
export const showdownBackGif = (id) =>
  `${SPRITE_BASE}/other/showdown/back/${id}.gif`;

/** Static back sprite (PNG) fallback. */
export const backSprite = (id) => `${SPRITE_BASE}/back/${id}.png`;

/** Decorative background textures. */
export const TEXTURE = {
  cubes: "https://www.transparenttextures.com/patterns/cubes.png",
  diamonds: "https://www.transparenttextures.com/patterns/diagmonds-light.png",
};

/** External fonts loaded via <link>. */
export const FONT_HREF = {
  pokemonSolid: "https://fonts.cdnfonts.com/css/pokemon-solid",
};
