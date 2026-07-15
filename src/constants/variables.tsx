/* Brand colors — the single source of truth for the palette. The site renders
   one fixed scheme (no dark mode), so colors never change at runtime. Use these
   hex exports for inline styles, color-mix(), inline CSS-var overrides and SVG
   fill/stroke (var() is unreliable on Samsung Browser / Opera GX). NOTE: there
   is no Tailwind @theme block, so bare utilities like `bg-bright-sky` / `text-racing-red`
   are NOT generated — don't use them. globals.css mirrors a few of these hex
   values literally (body/html, ::selection, the steps wave); keep those in sync
   with this file by hand. */
export const brightSkyHex   = "#16B6EF";
export const racingRedHex   = "#E41A14";
export const floralWhiteHex = "#F7F3EB";
export const frostedBlueHex = "#9CDDF5";
export const azureMistHex   = "#DFF7FF"; // page background
export const camelHex       = "#A68752";
export const whiteSmokeHex  = "#F5F6F4";
