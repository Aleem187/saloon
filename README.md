# Hifsa Khan Salon — Homepage

A static rebuild of the [hifsakhansalon.com](https://hifsakhansalon.com/) homepage, matched
section-by-section against a full-page screenshot of the original.

## Colour

The original green palette is used throughout. **No pink (`#E576A1`) appears anywhere.**

```css
/* assets/css/styles.css */
--green:      #7d9b6d;   /* primary accent: buttons, links, icons */
--green-dark: #638054;   /* hover */
--green-deep: #47603b;   /* text on pale grounds */
--green-pale: #e7eede;   /* newsletter ground */
--green-mist: #f1f5eb;   /* hero ground */
```

Section grounds: `--cream #f7f4ec`, `--beige #f2ede1`, `--sand #faf8f3`,
`--blue-grey #dde5e8` (footer), `--lavender-soft #ece6f1` (testimonials).

**These hexes are read off a compressed screenshot, not sampled from the source CSS.**
They are close, not exact. Every one is a token, so correcting any of them is a one-line
edit — send the real values (DevTools eyedropper, or the site's stylesheet) and they drop in.

## Section order

Matches the reference top to bottom:

1. Header — HK monogram, nav, green Book Appointment pill, search
2. Hero — social proof, H1, copy, two buttons, 3-image collage, rotating seal
3. Brand strip — Charlotte Tilbury, L'Oréal, NARS, Armani, Guinot, MAC
4. Your Journey to Lasting Beauty — two-column intro + video card
5. Four ways we care for you — Makeup / Hair / Spa / HK Aesthetics
6. Bridal is where we made our name
7. Why Lahore keeps coming back — four cards
8. The Expert's Guide to Effortless Radiance — image + form
9. Special Promotions — three creatives
10. Create Memories at Hifsa Khan Sets
11. FAQ accordion + See All FAQs
12. Real Transformations Real Stories — testimonial slider
13. Newsletter
14. Instagram grid
15. Footer — brand strip, Address / Contact / Info / More / Business Hours
16. Let's Talk bar, copyright, floating WhatsApp, Offers edge tab

## Images — the one outstanding gap

Network access is blocked in the build environment, so the original photography could not be
downloaded. `assets/img/` holds neutral, clearly-marked slots at the correct aspect ratios.
Replace each file (keep the name, or update the `src` in `index.html`):

| File                                          | Slot                        | Ratio |
| --------------------------------------------- | --------------------------- | ----- |
| `hero-1 / hero-2 / hero-3`                    | hero collage                | 3:4   |
| `avatar-1 / avatar-2 / avatar-3`              | social-proof avatars        | 1:1   |
| `video-still`                                 | Bridal Beauty Edit card     | 16:7  |
| `card-makeup / card-hair / card-spa / card-aesthetics` | service cards      | 4:3   |
| `bridal`                                      | Bridal section              | 4:5   |
| `guide`                                       | Expert's Guide              | 1:1   |
| `promo-makeup / promo-hair / promo-spa`       | Special Promotions          | 1:1   |
| `sets`                                        | Hifsa Khan Sets             | 4:3   |
| `testimonial`                                 | testimonial panel           | 3:4   |
| `insta-1` … `insta-6`                         | Instagram grid              | 1:1   |

The six brand logos render as text set in the display face; swap in the real logo files for
an exact match.

## Typography

Playfair Display (headings) + Jost (body), loaded from Google Fonts. Both are **inferred
from the screenshot**, not confirmed against the source — the reference's actual faces may
differ, and swapping them is a one-line change in `index.html` plus `--font-display` /
`--font-body`.

## Running locally

```
npx http-server . -p 8080
```

Or open `index.html` directly; the page is fully static.

## Responsive

Breakpoints at `1180px` (nav → drawer), `980px` (split sections stack, 2-up cards),
`720px` (single column), `560px` (compact masthead), `420px`.
`prefers-reduced-motion` disables reveals, the seal rotation, autoplay and transitions.
