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
404.html                the not-found page, served by Netlify for any missing URL
shared.css              the design system
favicon.png, og-image.png  favicon and the shared social preview image
logo-black.png, logo-white.png  official logos used in the nav
_redirects              Netlify rules
CLAUDE.md               this file
```

Every page is a folder with an `index.html`, so URLs have no `.html` extension.
A new page means a new folder, not a new file at the root. Link to pages as
`/software`, never `/software/index.html` or `software.html`.

`/crm` currently redirects to `/tracker` (see `_redirects`). The name is
reserved for a future CRM product page, so do not link to `/crm`.

`_redirects` proxies `/audit/*` to the separate Netlify site that hosts the
diagnostic. The `200` at the end makes it a proxy rather than a redirect, which
is why the address bar keeps saying cleverlon.com. Do not change that line
without being asked.

## Design system

`shared.css` holds the tokens and base classes. Use them. Do not introduce new
colors, fonts or radii; if something seems to need one, say so instead of
adding it.

- Colors are CSS custom properties on `:root`: `--ink`, `--ink-mid`,
  `--ink-soft`, `--surface`, `--surface-2`, `--border`, `--accent` (blue),
  `--estate` (green, used only on the tracker page at /tracker), plus
  `--estate-dark`, `--estate-bright`, `--amber`, `--amber-light`, `--error`
  and `--surface-hover` for the few one-off shades.
- Fonts are Young Serif for `h1` and `h2`, Albert Sans for everything else.
  Young Serif has one weight, so `h3` and labels use Albert Sans bold.
- Shared classes: `.wrap`, `.topbar`, `.mark`, `.topnav`, `.eyebrow`, `.lede`,
  `.btn` (`.ghost`, `.wide`), `.textlink` (plain link, no arrows), `.rows` and
  `.row-item` (stacked heading and text rows), `.foot`.
- Page-specific CSS goes in a `<style>` block in that page's head. One file per
  page, markup and styles together.

The four `campaigns/` pages are the exception. They do not load `shared.css`;
they carry their own copy of the tokens in a `:root` block, already matched to
the site. They also load JetBrains Mono, which is accepted there. If a token changes in `shared.css`, change it in those four too.

## Rules that apply sitewide

**The nav and footer are duplicated across all eight pages.** There is no
include mechanism. Changing a nav or footer link means editing all eight, and
the `campaigns/` pages use slightly different markup to the rest. After any
such change, check every page, not just the one that prompted it.

Every page also carries the same small furniture: a `<main>` around the page
content, a canonical link and Twitter card tags in the head (matching `og:url`,
with a trailing slash), and the line "&copy; 2026 Cleverlon. All rights
reserved." at the end of the footer. Keep these when adding or editing a page.
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

The three cards beside the hero headline (workflow, game, dashboard) are built
in HTML and CSS with sample data, so they work without screenshots. They are
`<figure class="cl-card ...">` elements, each holding one `<div class="cl-mock">`.
To use a real screenshot, replace that `cl-mock` div inside the card with one
image, and leave the figure alone:

```html
<figure class="cl-card cl-flow"><img src="/img/home-card-workflow.webp" alt="..." width="1000" height="600"></figure>
```

The card keeps its size, rotation, shadow, hover lift and position. The image
fills the card and is cropped to fit, so export at the card's ratio:
workflow `cl-flow` 1000 x 600 (5:3), game `cl-game` 950 x 1000 (19:20),
dashboard `cl-dash` 1050 x 850 (21:17). Real screenshots must not show client
names or brands unless the client has agreed. On phones the cards become a
swipe row, and the "Examples with sample data." note under them should be
removed or reworded once every card is a real screenshot.

## Form endpoints

No placeholders are unset. Both forms post to live Apps Script web apps through
`WEBHOOK_URL`: `tracker/index.html` and `software/index.html` (both scripts are described
above). Do not change or empty either URL without being asked, because the form
would stop delivering.

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
