# Project Brief: Sweet Baby Names — Modern Redesign

## Overview
Baby names discovery website (6 pages) built with **React 18 + Material UI 5 + Framer Motion**. Needs a premium, polished redesign.

## Pages & Routes
| Route | Page |
|---|---|
| `/` | Home — hero with parallax spheres, category cards, features, stats, CTA |
| `/boy-names` | Boy names list |
| `/girl-names` | Girl names list |
| `/indian-names` | Indian/Sanskrit heritage names |
| `/modern-names` | Contemporary/trendy names |
| `/zodiac-names` | Astrology names by zodiac |

## Key Features (keep these)
- **Dark/Light mode toggle** — persisted in localStorage, respects system pref
- **WhatsApp floating button** — "Get Names" → `wa.me/+917796196502`
- **Responsive** — mobile drawer nav + desktop navbar
- **Glassmorphism** — backdrop blur, gradients, soft borders
- **Scroll animations** — framer-motion `whileInView` + spring physics

## Current Design Tokens
- **Primary:** Indigo gradient `#6366f1 → #8b5cf6`
- **Secondary:** Pink `#f472b6`
- **Corners:** 16px radius
- **Font:** Inter/Poppins, weight 700-800 headings
- **Light bg:** `#faf5ff` | **Dark bg:** `#0f1117`
- **Cards:** Glass effect with backdrop-filter blur, alpha borders

## What I Want Delivered
1. **Complete visual redesign** — more premium, clean, Apple-like with baby-shop warmth
2. **Enhanced mobile UX** — better touch targets, smoother navigation
3. **Modernized layouts** — improved spacing, typography scale, visual hierarchy
4. **Optional enhancements** (if feasible):
   - Name search/filter bar
   - Favorites (localStorage)
   - Name comparison tool
5. **Same tech stack** (React + MUI 5 + Framer Motion) unless you recommend better

## Constraints
- Preserve all 6 routes
- Preserve dark/light mode toggle
- Preserve WhatsApp button functionality
- Must be SEO-friendly
- Deliver as clean, modular React components
