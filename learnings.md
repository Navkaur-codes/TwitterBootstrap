# Learnings — GNDEC Website Redesign

A record of what was used and why, written so you can revise it before a presentation.

**Files in this project**

| File | What it holds |
|---|---|
| `index.html` | The whole page — 13 sections, all the content and Bootstrap markup |
| `css/style.css` | ~180 lines of custom CSS: brand colours, hero, animations |
| `js/script.js` | ~110 lines of vanilla JavaScript: 5 small features |
| `learnings.md` | This file |

There is no build step and nothing to install. Bootstrap, Bootstrap Icons and SweetAlert2 all load from a CDN, so you can open `index.html` in any browser.

---

## 1. Bootstrap concepts used

### 1.1 The grid system

Bootstrap's grid is 12 columns wide. You wrap columns in a `.row`, and the `.row` sits inside a `.container`.

```html
<div class="row g-5">
  <div class="col-lg-6">…</div>
  <div class="col-lg-6">…</div>
</div>
```

- `col-lg-6` means *"take 6 of 12 columns (half the width) from the lg breakpoint upwards"*. Below that breakpoint the columns stack to full width automatically. That single class is what makes the About/Mission section two columns on a laptop and one column on a phone.
- `g-5` is the **gutter** — the gap between the columns. `g-*` sets both directions, `gx-*` horizontal only, `gy-*` vertical only.

Used in: About/Mission, Notices/Helpline, Placements, Contact.

### 1.2 `row-cols-*` — the shortcut for card grids

Instead of writing `col-md-6 col-lg-4` on every single card, you can put one class on the row:

```html
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
  <div class="col">…card…</div>
  <!-- every .col here is automatically the right width -->
</div>
```

This says: 1 card per row on phones, 2 from md (768px), 3 from lg (992px). Used for the Departments and Campus Life grids. It is much less repetitive than putting sizing classes on each card.

### 1.3 Breakpoints

Bootstrap is **mobile-first**: a plain class like `col-6` applies at *every* size, and a class with a breakpoint like `col-lg-6` applies at that breakpoint **and upwards**.

| Prefix | Minimum width | Typical device |
|---|---|---|
| *(none)* | 0 | phone |
| `sm` | 576px | large phone |
| `md` | 768px | tablet |
| `lg` | 992px | laptop |
| `xl` | 1200px | desktop |
| `xxl` | 1400px | large desktop |

You will see this pattern all over the page — `d-none d-lg-block` on the top contact bar means "hidden by default, shown from lg up", which is how the utility bar disappears on phones.

### 1.4 Navbar and collapse

```html
<nav class="navbar navbar-expand-xl navbar-dark sticky-top">
  <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">…</button>
  <div class="collapse navbar-collapse" id="navMenu">…</div>
</nav>
```

- `navbar-expand-xl` — show the full horizontal menu from 1200px up; below that, collapse into the hamburger. **We chose `xl`, not `lg`, on purpose:** this menu has 7 links plus an Apply Now button, and at ~1000px they wrapped onto two lines and looked untidy. Picking the breakpoint that fits your content is a real design decision, not a default.
- `data-bs-toggle="collapse"` + `data-bs-target="#navMenu"` — the button toggles the element with that id. No JavaScript of your own is needed; Bootstrap's bundle handles it.
- `sticky-top` — the navbar stays at the top as you scroll, but (unlike `fixed-top`) it still occupies space in the layout, so you don't need to pad the page to compensate.

### 1.5 Cards

```html
<div class="card h-100 border-0 shadow-sm">
  <div class="card-body">
    <h3 class="h5 card-title">…</h3>
    <p class="card-text">…</p>
  </div>
</div>
```

- `h-100` = height 100%. Inside a grid this makes **every card in a row the same height**, even when one has more text. This is the single most useful card trick to remember.
- `shadow-sm`, `border-0` — Bootstrap's shadow and border utilities, so you don't hand-write `box-shadow`.
- `stretched-link` on a link inside a card makes the **whole card** clickable, not just the text.

### 1.6 Tabs (`nav-tabs` + `tab-content`)

The Programmes section shows UG / PG / Research without any custom JavaScript:

```html
<button data-bs-toggle="tab" data-bs-target="#pg-pane">Postgraduate</button>
…
<div class="tab-pane fade" id="pg-pane">…</div>
```

The button's `data-bs-target` names the pane it should reveal. `fade` gives the crossfade. This is how one section can hold 21 programmes without becoming an endless list.

### 1.7 Accordion

The four admission-helpline groups:

```html
<div class="accordion" id="helplineAccordion">
  <button data-bs-toggle="collapse" data-bs-target="#help1">B.Tech &amp; M.Tech</button>
  <div id="help1" class="accordion-collapse collapse show" data-bs-parent="#helplineAccordion">…</div>
</div>
```

`data-bs-parent` is the key attribute: it tells Bootstrap that opening one panel should **close the others**. Remove it and all four can be open at once.

### 1.8 List group

Used twice — the hero "Quick Links" and the Notices list.

- `list-group-flush` removes the outer border so it sits neatly inside a card.
- `list-group-item-action` adds the hover/focus highlight for items that are links.

This replaced the scrolling marquee of the original site. A marquee cannot be paused, read at your own speed, or reached with the keyboard; a list group can.

### 1.9 Forms and client-side validation

```html
<form id="enquiryForm" novalidate>
  <input type="email" class="form-control" id="email" required>
  <div class="invalid-feedback">Please enter a valid email address.</div>
</form>
```

- `novalidate` switches off the browser's own popup messages so Bootstrap's styled ones are used instead.
- `required`, `type="email"` and `pattern="[0-9]{10}"` are plain HTML validation rules — no JavaScript needed to define them.
- Adding the class `was-validated` to the form is what makes Bootstrap paint the green/red states and show the `.invalid-feedback` text.
- `form-control` for inputs/textareas, `form-select` for dropdowns, `form-label` for labels.

### 1.10 Utility classes

Bootstrap's utilities let you handle spacing and layout without opening the CSS file:

- **Spacing:** `py-5` (padding top+bottom), `mb-4` (margin bottom), `g-4` (gutter). The scale runs 0–5.
- **Flexbox:** `d-flex`, `justify-content-between`, `align-items-center`, `gap-3`, `flex-wrap`.
- **Text:** `text-center`, `fw-bold`, `fw-semibold`, `small`, `lead`, `display-4`, `text-secondary`.
- **Display:** `d-none d-lg-block` for showing/hiding by screen size.
- **Colour:** `text-bg-secondary` on badges (sets background **and** a readable text colour in one class).

### 1.11 Theming Bootstrap with CSS variables

This is the neatest trick in the project. Bootstrap 5.3 builds its components from CSS variables, so redefining a variable re-themes everything at once:

```css
:root {
  --bs-primary: #0b2545;
  --bs-primary-rgb: 11, 37, 69;
}

.btn-gold {
  --bs-btn-bg: #f0a500;
  --bs-btn-hover-bg: #ffb724;
}
```

Because of the first block, every `.btn-primary`, `.bg-primary` and `.text-primary` on the page turns navy — no overrides, no `!important`. The second block creates a brand-new gold button variant in six lines by setting the same per-component variables `.btn-primary` itself uses. **This is why the custom CSS file is short.**

---

## 2. New web-development concepts learned

### 2.1 Semantic HTML

Using tags that describe *meaning*, not appearance: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`, `<blockquote>`, `<figure>`/`<figcaption>`. Screen readers use these as landmarks to jump around the page; `<div>` gives them nothing.

### 2.2 Heading hierarchy

Exactly **one `<h1>`** per page (the college name in the hero), then one `<h2>` per section, then `<h3>` inside. Note the trick used on card titles:

```html
<h3 class="h5 card-title">Computer Science &amp; Engineering</h3>
```

The tag `h3` sets the *meaning* (correct outline level) and the class `h5` sets the *size*. Never pick a heading tag because of how big it looks.

### 2.3 The viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without this line, a phone pretends to be ~980px wide and renders a zoomed-out desktop page. Every Bootstrap breakpoint depends on it. It is one line and it is not optional.

### 2.4 IntersectionObserver

The browser API that tells you when an element scrolls into view:

```js
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);   // animate once only
    }
  });
}, { threshold: 0.15 });
```

`threshold: 0.15` means "fire when 15% of the element is visible". The old way of doing this was a `scroll` event that runs hundreds of times a second; `IntersectionObserver` is handled by the browser itself and is far cheaper.

### 2.5 Progressive enhancement / fail-safe design

**This was the most valuable lesson in the project.** The animation works by hiding elements in CSS (`opacity: 0`) and letting JavaScript reveal them. During testing the page rendered in an environment where `IntersectionObserver` never fired — and the entire site was blank. Hiding content in CSS and relying on JavaScript to bring it back is a real risk.

The fix in `js/script.js`:

```js
window.addEventListener("load", function () {
  setTimeout(function () {
    if (document.querySelectorAll(".reveal.is-visible").length === 0) {
      revealItems.forEach(function (item) { item.classList.add("is-visible"); });
    }
  }, 500);
});
```

If nothing has been revealed half a second after load, show everything. The animation is a *bonus*; the content is *mandatory*. Good talking point.

### 2.6 `prefers-reduced-motion`

Some people set their operating system to reduce animation (motion sickness, vestibular disorders). One media query respects that:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

### 2.7 Security on external links

Every link with `target="_blank"` also carries `rel="noopener"`. Without it, the page you open gets a JavaScript reference back to yours via `window.opener` and can redirect it — a phishing trick called tabnabbing.

### 2.8 CDNs

The libraries are loaded from `cdn.jsdelivr.net` rather than downloaded. Advantages: nothing to install, and the file may already be cached in the visitor's browser from another site. Trade-off: the page needs an internet connection to look right, so for an offline demo you would download the files instead.

### 2.9 Useful link protocols

`href="tel:+911615064501"` opens the dialler, `href="mailto:…"` opens the mail app, and `href="https://wa.me/917347200448"` opens a WhatsApp chat. On a student-facing mobile site these turn every phone number into a one-tap action.

### 2.10 Content integrity

Every fact on the page — programme names, AICTE intake numbers, phone numbers, the vision and mission text — was taken from gndec.ac.in and its official subdomains. Placement percentages and recruiter names were **deliberately left out**, because they are not published there. There is a comment in `index.html` saying so:

```html
<!-- Note: no placement percentages, packages or recruiter names are shown here,
     because those figures are not published on the official reference site. -->
```

Being able to say "I left this out because I could not verify it" is stronger than filling a card with an invented number.

---

## 3. What you can explain in your presentation

Five points, roughly in order of how impressive they are to a listener:

**1. Why this is better than the original, in concrete terms.**
The old site puts ~13 dropdown menus in front of you and hides programmes, notices and helplines several clicks deep, with notices in a marquee you cannot pause. The redesign puts the same information on one page: programmes in three tabs, notices in a readable list, helplines in an accordion, and a quick-links card in the hero for the four things students look for most. *Redesign the presentation, not the facts* — the content is identical, the access is not.

**2. Mobile-first responsive design.**
Explain the breakpoint table, then show it live: shrink the browser and watch the three-column department grid become two, then one, and the navbar collapse into a hamburger. Then say what you did *beyond* the defaults — you moved the navbar breakpoint from `lg` to `xl` because the menu wrapped, and you hid the top contact bar on phones with `d-none d-lg-block`.

**3. Theming Bootstrap through CSS variables.**
Show the `:root` block. "Changing four lines turns every primary button, badge and link on the site navy." Then show `.btn-gold` — a whole new button variant in six lines with no `!important` anywhere. This is the difference between *using* Bootstrap and *fighting* it.

**4. Accessibility as a set of specific decisions.**
Not "I made it accessible" but: one `<h1>` and a clean heading outline; `<h3 class="h5">` so meaning and size are separate; a skip-to-content link for keyboard users; `aria-label` on the icon-only back-to-top button; `<address>` for the postal address; the marquee replaced with a keyboard-reachable list; `prefers-reduced-motion` honoured.

**5. The blank-page bug and how you fixed it.**
This is the best story in the project because it is a real one. The animation hid everything in CSS and revealed it with JavaScript; in a browser where `IntersectionObserver` did not fire, the page was completely blank. You added a fail-safe that shows all content if nothing has animated within 500ms of load. Lesson: never make your content depend on your decoration.

**Likely questions and short answers**

- *Why no React?* It is a static informational site — every section is content, not application state. Bootstrap plus ~110 lines of JavaScript does the job, loads faster, and anyone can read the source.
- *Is the form real?* No, and it says so on screen. The project is frontend only, so there is no server to receive it. It demonstrates HTML validation and Bootstrap's validation styles; a real one would need a backend.
- *Where did the content come from?* gndec.ac.in and its official subdomains. Anything I could not verify there is not on the page.
- *How much of the CSS is yours?* About 180 lines, and most of it is brand colours and the animation. All layout, spacing and responsiveness comes from Bootstrap utilities.

---

## 4. Important code and features, explained

### 4.1 Bootstrap variable theming — `css/style.css`

```css
:root {
  --gndec-navy: #0b2545;
  --gndec-gold: #f0a500;

  --bs-primary: #0b2545;
  --bs-primary-rgb: 11, 37, 69;
  --bs-link-hover-color: #f0a500;
}
```

Two sets of variables. The `--gndec-*` ones are ours, so a colour has a name instead of a hex code repeated 30 times. The `--bs-*` ones are Bootstrap's own, and overriding them re-themes the framework. `--bs-primary-rgb` also has to be set because Bootstrap uses it for translucent backgrounds like `bg-primary bg-opacity-25`.

### 4.2 The scroll-reveal animation

CSS defines the two states:

```css
.reveal            { opacity: 0; transform: translateY(24px);
                     transition: opacity .6s ease-out, transform .6s ease-out; }
.reveal.is-visible { opacity: 1; transform: none; }
```

JavaScript adds `.is-visible` when the element scrolls into view, and the `transition` animates between the two automatically. Two CSS rules and one class toggle — no animation library. `transform` and `opacity` are the two properties browsers animate most cheaply, which is why the page stays smooth.

### 4.3 The count-up statistics

```html
<p class="display-5 fw-bold text-gold reveal" data-count="30000" data-suffix="+">0</p>
```

```js
function countUp(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  let current = 0;
  const timer = setInterval(function () {
    current += target / 40;
    if (current >= target) { current = target; clearInterval(timer); }
    element.textContent = Math.round(current).toLocaleString("en-IN") + suffix;
  }, 25);
}
```

Two things worth pointing out:

- **`data-*` attributes.** Any attribute starting with `data-` is valid custom HTML, readable in JavaScript as `element.dataset.count`. It lets the HTML carry the value and keeps the JavaScript generic — one function drives all four counters.
- **`toLocaleString("en-IN")`** formats numbers the Indian way — `30,000` uses the same grouping here, but `10,00,000` (lakh) differs from the `1,000,000` you would get with the default locale.

### 4.4 Scrollspy

```html
<body data-bs-spy="scroll" data-bs-target="#mainNav"
      data-bs-root-margin="0px 0px -55%" data-bs-smooth-scroll="true">
```

Bootstrap watches which section is on screen and adds `.active` to the matching navbar link, which our CSS turns gold. `data-bs-root-margin` shifts the trigger line up the viewport so a section becomes "current" once it is properly on screen rather than the instant its top edge appears.

Worth knowing: older tutorials use `data-bs-offset` for this. Bootstrap 5.2 rewrote Scrollspy on top of `IntersectionObserver` and **deprecated** `offset` in favour of `rootMargin`. Version 5.3 still converts an `offset` into a `rootMargin` for backwards compatibility, but the docs say that will be removed in v6 — so `data-bs-root-margin` is the one to learn. Check which version the documentation you are reading refers to.

The companion line is in the CSS:

```css
body { scroll-padding-top: 5rem; }
```

Without it, jumping to `#about` puts the heading directly under the sticky navbar. `scroll-padding-top` reserves that space on every anchor jump — one line, and it fixes a problem people usually solve with JavaScript.

### 4.5 Closing the mobile menu after a tap

```js
navMenu.querySelectorAll("a[href^='#']").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});
```

Bootstrap does not do this for you: tap a link on a phone and the open menu stays open, covering the section you just jumped to. `a[href^='#']` is a CSS attribute selector meaning "links whose href **starts with** `#`", so only in-page links trigger it — the external portal links are left alone. `bootstrap.Collapse.getOrCreateInstance()` is the standard way to reach a component's JavaScript API.

### 4.6 The contact form

```js
enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault();                 // no server, so never actually submit

  if (!enquiryForm.checkValidity()) {     // uses the HTML required / type rules
    enquiryForm.classList.add("was-validated");
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Enquiry received",
    text: "This is a demo form, so nothing was actually sent. …",
    confirmButtonColor: "#0b2545",
  });

  enquiryForm.reset();
  enquiryForm.classList.remove("was-validated");
});
```

- `event.preventDefault()` stops the browser's default submit, which would reload the page.
- `checkValidity()` is a built-in method that returns true/false based on the `required`, `type="email"` and `pattern` attributes — you do not write the validation logic yourself.
- Adding `was-validated` is what triggers Bootstrap's styled feedback.
- **This is the only SweetAlert2 call on the site**, which was a deliberate choice: it is used where a user needs confirmation that their action was received, not for decoration. Navigation and links use plain browser behaviour.

### 4.7 Small details worth mentioning

- **Skip link:** `<a href="#main" class="visually-hidden-focusable">Skip to main content</a>` is invisible until a keyboard user tabs to it, then it lets them jump past the navigation.
- **`h-100` on cards:** equal-height cards in a row regardless of text length.
- **`stretched-link`:** makes the whole department card clickable.
- **`text-bg-secondary` on badges:** sets background and readable foreground in one class, instead of pairing `bg-secondary` with `text-white` and hoping the contrast works.
- **Only one image file:** the hero is a CSS `linear-gradient` and all 41 icons are Bootstrap Icons font glyphs, so the only real image on the page is the campus photograph in `images/`.

### 4.8 The campus photo

`images/home.jpg` (800×600), in the About section beside the text:

```html
<figure class="mb-0">
  <img src="images/home.jpg" class="img-fluid rounded shadow" width="800" height="600" loading="lazy"
       alt="The main entrance block of Guru Nanak Dev Engineering College, Ludhiana, …">
  <figcaption class="small text-secondary mt-2 mb-0">
    <i class="bi bi-geo-alt me-1"></i>The main entrance block, GNDEC campus, Gill Road, Ludhiana.
  </figcaption>
</figure>
```

Four things here are worth being able to explain:

- **`img-fluid`** is `max-width: 100%; height: auto`. Without it an 800px image sits at 800px
  and breaks the layout on a 375px phone — the page would scroll sideways. Every responsive
  image needs it.
- **`width` and `height` attributes** are not styling. They tell the browser the aspect ratio
  *before* the file downloads, so it can reserve the right space and the page does not jump as
  images arrive. That jump has a name — Cumulative Layout Shift — and this is the fix.
- **`loading="lazy"`** is plain HTML: don't download until the user scrolls near it. It is safe
  here because the photo sits well below the fold. Never put it on something visible
  immediately, or the image flashes in late.
- **`figure` and `figcaption`** are semantic tags that tie the caption to its image, so
  assistive technology announces the two as one unit rather than as an unrelated stray line.

The photo is displayed at about 437px wide from an 800px source, so it stays sharp even on a
high-density screen. Rule of thumb for formats: **PNG for flat graphics and transparency,
JPEG for photographs** — this one is a photo, correctly saved as JPEG at 79 KB.

---

## Testing that was done

- Rendered through a local static server and checked at **375×812 (mobile)**, **768×1024 (tablet)**, **900**, **1100** and **1280px**.
- No horizontal overflow at any width (checked by comparing `document.documentElement.scrollWidth` against `window.innerWidth`).
- Hamburger menu opens and closes; it also closes after an in-page link is tapped.
- Programme tabs switch panes; accordion opens one panel at a time via `data-bs-parent`.
- Contact form: submitting empty shows validation and **no** dialog; submitting valid data shows the SweetAlert2 dialog and resets the form.
- Browser console clean — no errors, no warnings.
- One `<h1>`, 11 `<h2>`s, all four landmarks present, every `target="_blank"` link carries `rel="noopener"`.
