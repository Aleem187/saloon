# Hifsa Khan Salon — Homepage

A static recreation of the [hifsakhansalon.com](https://hifsakhansalon.com/) homepage.

## Brand colour

Every place the reference site uses **green** uses **`#E576A1`** here instead. All accents
derive from a single custom property, so the swap lives in one spot:

```css
/* assets/css/styles.css */
--brand: #e576a1;   /* replaces the reference site's green */
--brand-dark: #c9578a;
--brand-deep: #a63f6d;
--brand-soft: #f7d9e5;
--brand-tint: #fdf3f7;
```

Neutrals, type and spacing are independent of that token.

## Structure

```
index.html              markup for the whole page
assets/css/styles.css   tokens, layout, components, responsive rules
assets/js/main.js       sticky header, mobile drawer, scroll reveal,
                        FAQ accordion, testimonial slider, newsletter validation
assets/img/*.svg        placeholder artwork — see below
```

Sections in order: topbar, sticky header + nav, hero, scrolling marquee, house intro
with stats, four service cards, Bridal Beauty Edit, signature treatments, four branches,
testimonial slider, FAQ accordion, newsletter, footer, floating WhatsApp button.

## Replacing the placeholder images

This build was produced without network access to the reference site, so `assets/img/`
holds generated SVG placeholders rather than the real photography. Drop the real files in
and update the `src` in `index.html` (or reuse the filenames with a new extension):

| Placeholder                   | Used by                          |
| ----------------------------- | -------------------------------- |
| `hero.svg`                    | hero background                  |
| `about.svg`                   | "The House" intro                |
| `service-makeup.svg`          | Makeup service card              |
| `service-hair.svg`            | Hair service card                |
| `service-spa.svg`             | Spa service card                 |
| `service-aesthetics.svg`      | HK Aesthetics service card       |
| `bridal-1.svg`, `bridal-2.svg`| Bridal Beauty Edit pair          |

## Running locally

Open `index.html` directly, or serve the folder:

```
npx http-server . -p 8080
```

Fonts (Cormorant Garamond, Jost) load from Google Fonts and need a network connection;
the page falls back to system serif/sans without one.

## Responsive breakpoints

`1240px` (drops the secondary Call button) · `1100px` (2-up service and branch grids) ·
`980px` (nav collapses to the drawer, side-by-side sections stack) · `720px` (single
column throughout) · `560px` (short header CTA) · `420px` (compact brand and buttons).
`prefers-reduced-motion` disables the marquee, reveals, autoplay and transitions.
