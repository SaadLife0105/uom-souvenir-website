/* Brand colors — literal hex values mirroring the --color-* tokens in
   globals.css. The site renders one fixed scheme (no dark mode), so colors
   never change at runtime. Use these for inline styles and SVG fill/stroke,
   where var() is unreliable on Samsung Browser / Opera GX. For className-based
   styling prefer the Tailwind utilities generated from globals.css @theme
   (bg-pale-blue, text-red, …) — that file is the source of truth; keep these
   in sync with it. */
export const paleBlueHex   = "#B0E0F8";
export const goldHex       = "#BF9E60"; /*from UoM logo*/
export const creamHex      = "#F4E5CD";
export const redHex        = "#F23838"; /*from UoM logo*/
export const darkBlueHex   = "#1A3C7D";
export const blackHex      = "#1E2019";
export const whiteHex      = "#F5F6F4";
export const deepBlueHex   = "#072B57";
export const lightBlueHex  = "#05AFF2"; /*from UoM logo*/
