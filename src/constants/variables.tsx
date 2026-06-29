/* Brand colors — resolved from CSS custom properties in globals.css.
   Values swap automatically with prefers-color-scheme (light/dark). */

/* Primary & base colors */
export const paleBlueV = "var(--color-pale-blue)";
export const goldV = "var(--color-gold)"; /*from UoM logo*/
export const creamV = "var(--color-cream)";
export const redV = "var(--color-red)"; /*from UoM logo*/
export const darkBlueV = "var(--color-dark-blue)";
export const blackV = "var(--color-black)";
export const whiteV = "var(--color-white)";

/* Colors for polygon hero*/
export const deepBlueV = "var(--color-deep-blue)";
export const lightBlueV = "var(--color-light-blue)"; /*from UoM logo*/

/* ─── Pinned hex values ────────────────────────────────────────────────────
   Use these when a color must NEVER flip with dark mode — e.g. elements
   that sit on top of photos or fixed-color backgrounds (hero polygon, footer,
   cards over images). These are still the single source of truth: change the
   hex here and it updates everywhere they're used.
   ────────────────────────────────────────────────────────────────────────── */
export const paleBlueHex   = "#B0E0F8";
export const goldHex       = "#BF9E60"; /*from UoM logo*/
export const creamHex      = "#F4E5CD";
export const redHex        = "#F23838"; /*from UoM logo*/
export const darkBlueHex   = "#1A3C7D";
export const blackHex      = "#1E2019";
export const whiteHex      = "#F5F6F4";
export const deepBlueHex   = "#072B57";
export const lightBlueHex  = "#05AFF2"; /*from UoM logo*/
export const pageDarkHex   = "#0d1f33"; /* page bg in dark mode */
