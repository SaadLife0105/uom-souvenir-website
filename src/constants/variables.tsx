/* Brand colors — the single source of truth for the palette. The site renders
   one fixed scheme (no dark mode), so colors never change at runtime. Use these
   hex exports for inline styles, color-mix(), inline CSS-var overrides and SVG
   fill/stroke (var() is unreliable on Samsung Browser / Opera GX). NOTE: there
   is no Tailwind @theme block, so bare utilities like `bg-pale-blue` / `text-red`
   are NOT generated — don't use them. globals.css mirrors a few of these hex
   values literally (body/html, ::selection, the steps wave); keep those in sync
   with this file by hand. */
export const paleBlueHex   = "#B0E0F8";
export const goldHex       = "#BF9E60"; /*from UoM logo*/
export const creamHex      = "#F4E5CD";
export const redHex        = "#F23838"; /*from UoM logo*/
export const darkBlueHex   = "#1A3C7D";
export const blackHex      = "#1E2019";
export const whiteHex      = "#F5F6F4";
export const deepBlueHex   = "#072B57";
export const lightBlueHex  = "#05AFF2"; /*from UoM logo*/
