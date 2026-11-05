# Cleverlon website

Static marketing site for cleverlon.com. Plain HTML and CSS, no build step, no
framework, no package.json. Deployed by Netlify from this repo on every push to
`main`.

## Structure

```
index.html              home, three doors
automation/index.html   workflow automation, nine services with prices
software/index.html     custom software
campaigns/index.html    interactive campaigns, with a live spin-wheel demo
campaigns/beat-the-bot/index.html
campaigns/survive-monday/index.html
campaigns/shortlist-rush/index.html
tracker/index.html      free Installment Payment Tracker lead magnet (land and homes)
audit/index.html        the diagnostic questionnaire (self-contained, see below)
privacy/index.html      privacy policy
terms/index.html        terms of use
analytics.js            loads Umami Cloud analytics and tracks the events (see Analytics)
fonts.css, fonts/       self-hosted fonts (woff2). Pages link fonts.css, never Google Fonts.
_headers                Netlify headers: long cache for /fonts/*
whatsapp-support-agent/index.html  detail page for the WhatsApp support agent automation
lead-qualification-routing/index.html  detail page for the lead qualification and routing automation
404.html                the not-found page, served by Netlify for any missing URL
shared.css              the design system
favicon.png, og-image.png  favicon and the shared social preview image
logo-black.png, logo-white.png  official logos used in the nav
logo-512.png            512 x 512 square logo, used only as the Organization logo in the
                        home page JSON-LD. Do not link it from any page.
sitemap.xml             every public page, with a lastmod date. Add new pages here.
robots.txt              allows everything and points to sitemap.xml
_redirects              Netlify rules
CLAUDE.md               this file
```

Every page is a folder with an `index.html`, so URLs have no `.html` extension.
A new page means a new folder, not a new file at the root. Link to pages as
`/software`, never `/software/index.html` or `software.html`.

`/crm` currently redirects to `/tracker` (see `_redirects`). The name is
reserved for a future CRM product page, so do not link to `/crm`.

`audit/index.html` is the diagnostic questionnaire. It is deliberately
self-contained: it uses its own font (Archivo) and its own styling in one file,
and it does not load `shared.css`. Do not restyle it to match the rest of the
site or add the shared nav, footer or `<main>` wrapper to it without being
asked. Its form posts to its own Apps Script endpoint. It does load `/fonts.css`, `/favicon.png` and `/analytics.js`.

This repo is the only source for the audit: `cleverlon.com/audit/` serves `audit/index.html` from here, and
there is no proxy rule. The old project in `Desktopdiagnostic site` only affects
`cleverlon-audit.netlify.app`, which redirects to `https://cleverlon.com/audit/`. Edit the audit here, never
there, and do not expect a change in the old project to show on cleverlon.com.

## Design system

`shared.css` holds the tokens and base classes. Use them. Do not introduce new
colors or fonts, and do not add radii other than the two below; if something
seems to need one, say so instead of adding it.

- Colors are CSS custom properties on `:root`: `--ink`, `--ink-mid`,
  `--ink-soft`, `--surface`, `--surface-2`, `--border`, `--accent` (blue),
  `--estate` (green, used only on the tracker page at /tracker), plus
  `--estate-dark`, `--estate-bright`, `--amber`, `--amber-light`, `--error`
  and `--surface-hover` for the few one-off shades.
- Fonts are Young Serif for `h1` and `h2`, Albert Sans for everything else.
  Young Serif has one weight, so `h3` and labels use Albert Sans bold. All fonts
  are self-hosted from `/fonts/` through `/fonts.css` (Latin and Latin Extended,
  `font-display: swap`). Do not add Google Fonts links. The campaigns pages also use
  JetBrains Mono and the audit page uses Archivo, both from the same `fonts.css`.
- Shared classes: `.wrap`, `.topbar`, `.mark`, `.topnav`, `.eyebrow`, `.lede`,
  `.btn` (`.ghost`, `.wide`), `.textlink` (plain link, no arrows), `.rows` and
  `.row-item` (stacked heading and text rows), `.foot`.
- Page-specific CSS goes in a `<style>` block in that page's head. One file per
  page, markup and styles together.

### Design rules (tokens live in `shared.css`)

- **Spacing:** 4px base unit. Scale `--s1` to `--s10`: 4, 8, 12, 16, 24, 32, 48, 64, 96,
  128px. Use the scale, not odd values. The gap between major sections is
  `--section-gap`: 96px, or 64px at 640px and below.
- **Radius:** `--r-control` is 4px for buttons, inputs, tags and chips. `--r-card` is 8px
  for figures, panels and cards. `--radius` equals `--r-control`. No pills and nothing
  above 8px (the hero collage cards and circles are the exceptions).
- **Rules, not boxes:** structure comes from lines. `--rule` is a 1px `--border` hairline
  that divides rows, columns and list items. `--rule-ink` is a 1px `--ink` line that opens
  each major section: `border-top: var(--rule-ink); padding-top: var(--s6)`. The header has
  a hairline under it and the footer one above it. No section numbers.
- **Shadows:** none, except the hero collage cards on the dark hero. Hover never moves
  anything; it only changes a color, border or fill.
- **Type:** h1 is clamp(32px, 5.4vw, 52px), line height 1.04, tracking `--track-display`
  (-0.02em). h2 is clamp(28px, 3.4vw, 38px), line height 1.12, tracking `--track-h2`
  (-0.015em). h3 is 18px bold. Body is 16px with line height 1.6. Labels (eyebrows, field
  and row labels) are 12px, weight 600, uppercase, tracking `--track-label` (0.08em).
  Nothing is below 12px.
- **Buttons:** 48px tall, 15px text, weight 600, 4px radius. Primary is accent blue (estate
  green on the tracker form). Ghost is a 1px ink border that fills with ink on hover.
- **Step markers:** numbered steps use a 24px square marker (`--r-control`, accent fill,
  white 13px bold numeral) on a 1px hairline, horizontal on desktop and vertical on phones.
  List bullets are 5 to 6px squares with a 1px radius.
- **Dark band:** at most one full-width ink band per page (home: "Built on database and
  cloud engineering"), with 1px white hairlines at 14% opacity between rows.
- **Closing call to action:** a ruled block with an ink line on top, the heading on the
  left and the button on the right. No tinted band.
- **Color:** accent blue only for the primary button, links, focus rings and step markers.
  Aim for one accent moment per screen.
- **Motion:** 150ms changes of color, background and border. No transforms on hover.

The four `campaigns/` pages are the exception. They do not load `shared.css`;
they carry their own copy of the tokens in a `:root` block, already matched to
the site, including the spacing, radius, rule and type tokens above. The three game
pages get the radius rules from a short block at the end of their style. They also load JetBrains Mono, which is accepted there. If a token changes in `shared.css`, change it in those four too.

## Rules that apply sitewide

**The nav and footer are duplicated across every page.** There is no
include mechanism. Changing a nav or footer link means editing all eight, and
the `campaigns/` pages use slightly different markup to the rest. After any
such change, check every page, not just the one that prompted it.

Every page also carries the same small furniture: a `<main>` around the page
content, a canonical link and Twitter card tags in the head (matching `og:url`,
with a trailing slash), and the line "&copy; 2026 Cleverlon. All rights
reserved." at the end of the footer, with Privacy and Terms links in the footer line and
`<script src="/analytics.js" defer></script>` in the head. Keep these when adding or editing a page.
Forms link the privacy policy and terms in the line under the form.
The logos are 184px wide (2x the 92px they display at), so keep the `width` and
`height` attributes on the img at the display size.

When editing the same region across several files, prefer exact string
replacement over a regex. A loose pattern like `<a href="/...` matches nav
links and footer links alike and will eat the body of the page between them.
This has happened. Verify each file after writing it.

**Writing style.** No em dashes or en dashes anywhere in copy, ever. Use a
comma, a full stop or a colon. Short words over long ones. No marketing
inflation: say what a thing does rather than how transformative it is. Use US spelling
everywhere (organization, color, inquiry, center, program, canceled).

**Voice.** Write like a person explaining their work to a client over
WhatsApp: plain words, short sentences, specific details. Vary sentence
length and do not open consecutive sentences the same way. No italic or
colored emphasis words in headlines. No "not X, but Y" or "X, not Y" lines,
no rhetorical triplets, no neat closing punchline at the end of a paragraph.
Say a thing once. Avoid stock phrases (seamless, effortless, streamline,
game-changer, unlock, empower, peace of mind). Prefer concrete examples and
real numbers to claims. Use a small label above a section only where it
genuinely helps. No arrow links.

**Prices appear on the page itself**, in `automation/index.html` and
`campaigns/index.html`. They are real quotes, so do not adjust them to make a
layout work.

## Tracker lead script

`tracker/index.html` posts to a live Apps Script web app. The live script is
`C:\Users\Ayodele\Desktop\tracker-script\Code.js` (a clasp project, script ID
in its `.clasp.json`). It is the only copy: edit it there, then `clasp push`,
`clasp version "..."` and `clasp deploy -i <existing deployment ID> -V <n>`.
Never create a new deployment, because that changes the `/exec` URL the page
posts to. The tracker sheet links (`TRACKER_LINK_LAND`, `TRACKER_LINK_HOMES`)
are set in that file.

## Software intake script

`software/index.html` posts to a separate Apps Script web app. Its source is
`C:\Users\Ayodele\Desktop\cleverlon-tracker\Software.gs`. It is not a clasp
project: it was deployed by hand in the Apps Script editor as a web app bound to
the "Cleverlon software enquiries" Google Sheet, owned by
hellocleverlon@gmail.com. To change it, edit `Software.gs`, paste the new code
into that Apps Script project, then use Deploy, Manage deployments, the pencil
icon, Version: New version, Deploy. Always redeploy as a new version of the
existing deployment, never as a new deployment, because a new deployment changes
the `/exec` URL and the form stops delivering.

## Home hero collage

The three cards beside the hero headline are real screenshots in `img/`, each in a
`<figure class="cl-card ...">` with one `<img>`: workflow `cl-flow`
(`home-automation-workflow.webp`, 2000 x 1200, 5:3), game `cl-game`
(`home-campaign-game.webp`, 1900 x 2000, 19:20) and dashboard `cl-dash`
(`home-software-dashboard.webp`, 2100 x 1700, 21:17). To change one, replace the file
or its `<img>` and keep the ratio: the card keeps its size, rotation, shadow, hover lift
and position, and the image is cropped to fit with `object-fit: cover`. On phones the cards become a swipe row.
Each image has three files: `name.webp` (the large original), `name-1200.webp` and `name-600.webp`,
used through `srcset` and `sizes` on the `<img>`; regenerate the two smaller ones whenever an image is replaced
(resize to 600 and 1200 px wide, WebP quality about 80). Keep `width` and `height` at the original size. Only the
first hero card loads normally; the other two are `loading="lazy"` with `fetchpriority="low"`, and everything below
the first screen is lazy. Screenshots must not show client names or brands unless the client has agreed, and any
demo data should be labeled as such where it is not obvious. The older HTML and CSS mockups
were removed once all three cards had screenshots.

The hidden service slots further down the home page use their own filenames
(`home-automation-service.webp`, `home-software-service.webp`, `home-campaign-service.webp`)
so a hero image never appears twice if a slot is unhidden. The installment tracking
case study uses `home-case-installments.webp` (shown with demo data), the WhatsApp case study uses
`whatsapp-agent-workflow.webp`, and the tracker page uses `campaign-game-real-estate.webp`.

## Form endpoints

No placeholders are unset. Both forms post to live Apps Script web apps through
`WEBHOOK_URL`: `tracker/index.html` and `software/index.html` (both scripts are described
above). Do not change or empty either URL without being asked, because the form
would stop delivering.

## Analytics

Umami Cloud (EU region, cookieless, no banner needed) is loaded by `analytics.js`, which every page includes,
including `audit/index.html`. The website ID is `WEBSITE_ID` at the top of that file; while it is empty nothing
loads and no request is made. `data-domains="cleverlon.com"` keeps localhost, previews and
cleverlon-audit.netlify.app out of the stats. Umami keeps data for 6 months on the free plan.

Events (`window.cleverlonTrack(name, data)`, safe to call before Umami loads): "Book a call" (any Calendly link) and
"Audit link click" (any link to /audit) are tracked by `analytics.js` itself. "Tracker form submit" and
"Software form submit" are called after a successful send in those pages. "Game play" (with a `game` property)
is called when each game starts: Beat the Bot, Survive Monday, Shortlist Rush and the spin wheel demo. Never
send what a visitor typed. The standalone audit project in `Desktop\diagnostic site` carries the same Umami
snippet with the same ID, but `/audit` is now served from this repo. Keep `privacy/index.html` accurate when
analytics changes.

## Legal pages

`privacy/index.html` and `terms/index.html` are linked from every footer and from the consent line under each
form. The business is registered in Nigeria as Cleverlon Concepts: the two legal pages use that name, and their footer
says "Cleverlon is a trading name of Cleverlon Concepts, registered in Nigeria." Everywhere else the name is Cleverlon.
Never publish the registration number, address or tax number. The contact email is hellocleverlon@gmail.com (in the
footers and the legal pages, not in the JSON-LD). If a form starts collecting something new, or the analytics, storage
or cookie setup changes, update the privacy policy at the same time.

## Deploying

Commit and push to `main`. Netlify builds from the repo.

Never deploy by dragging this folder onto Netlify. A drag-and-drop replaces the
entire site with whatever is in the dropped folder, and it desynchronises the
repo from what is live. If a deploy needs rolling back, publish an earlier
deploy from the Netlify Deploys tab rather than reverting files by hand.

There is no build command and no publish directory to set. Netlify serves these
files as they are.

## Checking a change

Open the edited page in a browser before committing. For anything touching the
campaigns pages, actually play the thing: the spin wheel, the brand switcher,
and each game run entirely in the browser, so a broken edit shows up as a dead
button rather than an error anyone would notice otherwise.
