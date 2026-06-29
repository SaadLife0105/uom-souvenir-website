/* Brand colors — resolved from CSS custom properties in globals.css.
   The site renders one fixed scheme (no dark mode), so these values never
   change at runtime; globals.css is the single source of truth. */

/* Primary & base colors */
export const paleBlueV = "var(--color-pale-blue)";
export const goldV = "var(--color-gold)"; /*from UoM logo*/
export const creamV = "var(--color-cream)";
export const redV = "var(--color-red)"; /*from UoM logo*/
export const darkBlueV = "var(--color-dark-blue)";
export const blackV = "var(--color-black)";
export const whiteV = "var(--color-white)";

/* ─── Pinned hex values ────────────────────────────────────────────────────
   Use these where var() is unreliable — inside SVG fill/stroke attributes and
   a few inline styles (Samsung Browser / Opera GX don't resolve CSS custom
   properties there). Same values as the tokens above; keep them in sync.
   ────────────────────────────────────────────────────────────────────────── */
export const paleBlueHex   = "#B0E0F8";
export const goldHex       = "#BF9E60"; /*from UoM logo*/
export const redHex        = "#F23838"; /*from UoM logo*/
export const darkBlueHex   = "#1A3C7D";
export const blackHex      = "#1E2019";
export const whiteHex      = "#F5F6F4";
export const deepBlueHex   = "#072B57";
export const lightBlueHex  = "#05AFF2"; /*from UoM logo*/
