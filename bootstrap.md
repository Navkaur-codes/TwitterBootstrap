# Bootstrap Reference — GNDEC Redesign

Every Bootstrap class, component and attribute used in this project, with a link to the
official Twitter Bootstrap documentation and the actual code from `index.html`.

- **Version used:** Bootstrap **5.3.3** — <https://getbootstrap.com/docs/5.3/getting-started/introduction/>
- **Icons:** Bootstrap Icons **1.11.3** — <https://icons.getbootstrap.com/>
- **Totals in this project:** 163 unique Bootstrap classes · 41 icons · 1 image · 6 `data-bs-*` attributes · 13 custom classes of our own

> How to read this file: every section gives the **official docs link**, the **real snippet
> from our project**, and **how it works**. Section 18 is a flat A–Z index of all 163 classes
> if you just need to look one up quickly.

---

## Contents

1. [Including Bootstrap](#1-including-bootstrap)
2. [Layout — containers, grid, columns, gutters](#2-layout)
3. [Breakpoints](#3-breakpoints)
4. [Navbar](#4-navbar)
5. [Dropdowns](#5-dropdowns)
6. [Cards](#6-cards)
7. [Navs and Tabs](#7-navs-and-tabs)
8. [Accordion and Collapse](#8-accordion-and-collapse)
9. [List group](#9-list-group)
10. [Badges and Buttons](#10-badges-and-buttons)
11. [Forms and validation](#11-forms-and-validation)
12. [Typography and content](#12-typography-and-content)
13. [Utilities and helpers](#13-utilities-and-helpers)
14. [Bootstrap Icons](#14-bootstrap-icons)
15. [Bootstrap JavaScript — `data-bs-*` and the JS API](#15-bootstrap-javascript)
16. [Scrollspy](#16-scrollspy)
17. [Theming with CSS variables](#17-theming-with-css-variables)
18. [Complete A–Z class index](#18-complete-az-class-index)

---

## 1. Including Bootstrap

**Docs:** <https://getbootstrap.com/docs/5.3/getting-started/download/#cdn-via-jsdelivr>

```html
<!-- in <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">   <!-- ours LAST, so it can override -->

<!-- at the end of <body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

**How it works in this project**

- Two things matter about the order. Our `style.css` comes **after** Bootstrap's CSS so our
  rules win when they collide, and the `<script>` sits at the **end of `<body>`** so the HTML
  is already parsed when Bootstrap looks for `data-bs-*` elements.
- `bootstrap.bundle.min.js` is the version that **includes Popper**. Popper is the small
  positioning library the Dropdown needs to place the menu. If we used plain
  `bootstrap.min.js` the Departments dropdown would break. The bundle is the safe default.
- One `<script>` tag is all the JavaScript Bootstrap needs — the navbar collapse, dropdown,
  tabs, accordion and scrollspy on this page are driven entirely by HTML attributes.

**The viewport tag** — <https://getbootstrap.com/docs/5.3/getting-started/introduction/#responsive-meta-tag>

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without this a phone pretends to be ~980px wide and renders a shrunken desktop page. Every
breakpoint in this document depends on it.

---

## 2. Layout

### `.container`

**Docs:** <https://getbootstrap.com/docs/5.3/layout/containers/> · used **13 times**

```html
<section id="about" class="py-5">
  <div class="container py-lg-4">
    …
  </div>
</section>
```

Centres the content and gives it a responsive max-width that steps down at each breakpoint,
plus left/right padding. Notice the pattern used throughout the page: the **`<section>`
carries the background colour and vertical padding**, the **`.container` inside it constrains
the width**. That is why the navy statistics band stretches edge-to-edge while its text stays
aligned with everything else.

### `.row` and `.col-*`

**Docs:** <https://getbootstrap.com/docs/5.3/layout/grid/> · `.row` used **16 times**

The grid is 12 columns wide. Columns must live inside a `.row`, and a `.row` should live
inside a container.

```html
<!-- About: campus photo (5/12) beside the text (7/12) -->
<div class="row g-5 align-items-center mb-5">
  <div class="col-lg-5 reveal">…campus photo…</div>
  <div class="col-lg-7 reveal">…About the College…</div>
</div>

<!-- Notices / Helpline: the same uneven 7 + 5 split, reversed -->
<div class="row g-5">
  <div class="col-lg-7 reveal">…notices list…</div>
  <div class="col-lg-5 reveal">…helpline accordion…</div>
</div>
```

`col-lg-5` means *take 5 of 12 columns from the `lg` breakpoint upward*. Below `lg` the class
does not apply, so the column falls back to full width and the photo stacks above the text.
**That single class is the whole responsive behaviour** — there is no media query of ours
involved.

`align-items-center` on that first row is what keeps the photo vertically centred against the
taller text column instead of sitting flush at the top.

Column classes used here: `col`, `col-6`, `col-12`, `col-md-6`, `col-lg-2`, `col-lg-3`,
`col-lg-4`, `col-lg-5`, `col-lg-7`.

The footer shows two breakpoints combined:

```html
<div class="col-6 col-lg-2">   <!-- half width on phones, 2/12 on laptops -->
```

### `.col` — the auto-width column

**Docs:** <https://getbootstrap.com/docs/5.3/layout/columns/> · used **52 times**

A bare `.col` takes an equal share of whatever is left. In this project every `.col` is
paired with `row-cols-*` on its parent, which is what actually sets its width.

The mission list shows that this works on list items too — a `<ul>` can *be* the row:

```html
<ul class="list-unstyled row row-cols-1 row-cols-md-2 g-3">
  <li class="col d-flex gap-3">
    <i class="bi bi-check-circle-fill text-gold fs-5"></i>
    <span>Upliftment of rural students through technical education.</span>
  </li>
  …
</ul>
```

The seven mission points sit in one column on phones and two from 768px. `list-unstyled`
removes the bullets, `row row-cols-md-2` does the layout, and each `<li>` becomes a `.col`.

### `.row-cols-*` — the card-grid shortcut

**Docs:** <https://getbootstrap.com/docs/5.3/layout/grid/#row-columns>

Rather than repeating `col-md-6 col-lg-4` on all ten department cards, put one set of
classes on the row:

```html
<!-- Departments and Campus Life -->
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
  <div class="col reveal"> …card… </div>
  <!-- every .col is sized automatically -->
</div>

<!-- Programme cards, which are narrower, so they go to 3-up later -->
<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">

<!-- Statistics: 2 per row on phones, all 4 in a line on laptops -->
<div class="row row-cols-2 row-cols-lg-4 g-4 text-center">
```

Read `row-cols-1 row-cols-md-2 row-cols-lg-3` as **"1 per row, then 2 from 768px, then 3 from
992px."** This is the single most useful layout class in the project — it turns a 10-card
grid into one line of markup instead of ten.

### Gutters `g-*`

**Docs:** <https://getbootstrap.com/docs/5.3/layout/gutters/>

The gap **between** grid columns. `g-3`, `g-4`, `g-5` are used here (and `gap-md-3` for a
flex container). `g-*` sets both directions; `gx-*` is horizontal only and `gy-*` vertical
only. Gutters are padding-based, which is why they do not break the 12-column maths.

---

## 3. Breakpoints

**Docs:** <https://getbootstrap.com/docs/5.3/layout/breakpoints/>

Bootstrap is **mobile-first**. A class with no breakpoint (`col-6`, `d-flex`) applies at
*every* size. A class with one (`col-lg-6`, `d-lg-block`) applies **from that width upward**.

| Prefix | Min width | Device | Where we use it |
|---|---|---|---|
| *(none)* | 0 | phone | base styles everywhere |
| `sm` | 576px | large phone | `d-sm-inline` on the word "Ludhiana" in the brand |
| `md` | 768px | tablet | `col-md-6`, `row-cols-md-2`, `gap-md-3` |
| `lg` | 992px | laptop | `col-lg-*`, `row-cols-lg-3`, `d-lg-block`, `py-lg-4` |
| `xl` | 1200px | desktop | `navbar-expand-xl`, `row-cols-xl-3`, `ms-xl-3` |
| `xxl` | 1400px | large desktop | not used |

Two responsive decisions in this project worth explaining:

```html
<!-- Top contact bar: hidden by default, appears from 992px -->
<div class="bg-navy-deep text-white py-2 d-none d-lg-block">

<!-- Brand shortens to just "GNDEC" on very small phones -->
<span class="fw-bold">GNDEC <span class="fw-normal d-none d-sm-inline">Ludhiana</span></span>
```

Neither is a Bootstrap default — both are choices about what to drop when space runs out.
Note the shared pattern: **hide with the plain `d-none`, then bring it back at a breakpoint
with `d-{breakpoint}-block`** (or `-inline`, `-flex`, and so on).

---

## 4. Navbar

**Docs:** <https://getbootstrap.com/docs/5.3/components/navbar/>

```html
<nav id="mainNav" class="navbar navbar-expand-xl navbar-dark site-navbar sticky-top py-3">
  <div class="container">

    <a class="navbar-brand d-flex align-items-center gap-2" href="#top">…</a>

    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto align-items-xl-center text-nowrap">
        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
        …
      </ul>
    </div>
  </div>
</nav>
```

| Class | What it does |
|---|---|
| `navbar` | base component styles |
| `navbar-expand-xl` | horizontal menu from 1200px up; hamburger below that |
| `navbar-dark` | tells Bootstrap the bar is dark, so link and toggler colours flip to light |
| `navbar-brand` | the logo/name, with automatic sizing and margin |
| `navbar-toggler` | the hamburger button |
| `navbar-toggler-icon` | the three-lines icon (a background SVG, not an `<img>`) |
| `navbar-collapse` | the wrapper that gets shown/hidden |
| `navbar-nav` | resets the `<ul>` — no bullets, no padding |
| `nav-item` / `nav-link` | each `<li>` and its `<a>` |
| `sticky-top` | stays pinned while scrolling |

**Three things worth explaining in a presentation**

1. **We chose `xl`, not the usual `lg`.** With 7 links plus an *Apply Now* button, the menu
   wrapped onto two lines at around 1000px and looked broken. Moving the breakpoint to `xl`
   keeps the hamburger until there is genuinely room. *Picking the breakpoint that fits your
   content is a design decision, not a default.*

2. **`sticky-top` vs `fixed-top`.** `sticky-top` pins the bar but keeps it in the document
   flow, so the page below is not hidden underneath it. `fixed-top` lifts it out of flow and
   you must then pad the body to compensate. We used `sticky-top` and avoided that problem.

3. **`ms-auto` pushes the menu right.** `ms-auto` is `margin-left: auto` — in a flex row it
   absorbs all the leftover space, shoving the `<ul>` to the right edge. This is the standard
   flexbox alignment trick, not a navbar-specific feature.

The `aria-*` attributes are not decoration: `aria-expanded` is updated by Bootstrap as the
menu opens and closes, so a screen reader announces the current state, and `aria-label` gives
the icon-only button an accessible name.

---

## 5. Dropdowns

**Docs:** <https://getbootstrap.com/docs/5.3/components/dropdowns/>

```html
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#departments" role="button"
     data-bs-toggle="dropdown" aria-expanded="false">Departments</a>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#departments">All Departments</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="https://cse.gndec.ac.in/" target="_blank" rel="noopener">Computer Science &amp; Engineering</a></li>
    …
  </ul>
</li>
```

| Class / attribute | What it does |
|---|---|
| `.dropdown` | positioning context for the menu |
| `.dropdown-toggle` | adds the little caret ▾ |
| `data-bs-toggle="dropdown"` | wires up the open/close behaviour |
| `.dropdown-menu` | the hidden panel |
| `.dropdown-menu-end` | aligns the panel to the **right** edge of the toggle |
| `.dropdown-item` | each link inside |
| `.dropdown-divider` | the `<hr>` separator line |

`dropdown-menu-end` matters here: without it the menu is left-aligned to the toggle and, since
Departments sits near the right of the navbar, part of the panel would hang off the screen.

This is the one component that **needs Popper**, which is why we load `bootstrap.bundle.min.js`.

---

## 6. Cards

**Docs:** <https://getbootstrap.com/docs/5.3/components/card/> · `.card` used **41 times**

```html
<div class="card h-100 border-0 shadow-sm hover-lift">
  <div class="card-body">
    <span class="icon-circle mb-3"><i class="bi bi-cpu"></i></span>
    <h3 class="h5 card-title">Computer Science &amp; Engineering</h3>
    <a href="https://cse.gndec.ac.in/" target="_blank" rel="noopener"
       class="stretched-link text-decoration-none">Visit department <i class="bi bi-arrow-right-short"></i></a>
  </div>
</div>
```

| Class | What it does |
|---|---|
| `card` | the container — border, rounded corners, background |
| `card-body` | the padded inner area (always use it; do not put content straight into `.card`) |
| `card-title` | heading spacing inside a card |
| `card-text` | paragraph spacing inside a card |

**`h-100` is the important one.** It sets `height: 100%`, which makes **every card in a row
the same height** even when one has three lines of text and another has one. Without it the
department grid looks ragged. This is the single most useful card trick to remember.

`border-0` plus `shadow-sm` is a deliberate style choice: a soft shadow instead of a hard
border reads as more modern than the boxed look of the original site.

The programme cards use the card body itself as a flex row so the name and the seat badge sit
on opposite ends:

```html
<div class="card-body d-flex justify-content-between align-items-center gap-3">
  <span class="fw-semibold">B.Tech. Computer Science &amp; Engineering</span>
  <span class="badge text-bg-secondary">360 seats</span>
</div>
```

---

## 7. Navs and Tabs

**Docs:** <https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior>

The Programmes section shows 21 programmes in three tabs, with **no JavaScript of our own**:

```html
<ul class="nav nav-tabs justify-content-center mb-4 reveal" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#ug-pane"
            type="button" role="tab" aria-controls="ug-pane" aria-selected="true">Undergraduate</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#pg-pane"
            type="button" role="tab" aria-controls="pg-pane" aria-selected="false">Postgraduate</button>
  </li>
  …
</ul>

<div class="tab-content">
  <div class="tab-pane fade show active" id="ug-pane" role="tabpanel"> …12 UG cards… </div>
  <div class="tab-pane fade"             id="pg-pane" role="tabpanel"> …9 PG cards…  </div>
  <div class="tab-pane fade"             id="research-pane" role="tabpanel"> …2 cards… </div>
</div>
```

**How it works:** each button's `data-bs-target` names the id of the pane it reveals.
Bootstrap moves the `active` class between buttons and between panes; `fade` adds the
crossfade transition. The starting pane needs **both** `show` and `active` — `active` marks
it as current, `show` sets its opacity to 1.

This is the section that most improves on the original site: 21 programmes with their AICTE
intake numbers, in one screen, without an endless scroll.

---

## 8. Accordion and Collapse

**Docs:** <https://getbootstrap.com/docs/5.3/components/accordion/> and
<https://getbootstrap.com/docs/5.3/components/collapse/>

The four admission-helpline groups:

```html
<div class="accordion shadow-sm" id="helplineAccordion">

  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button" type="button"
              data-bs-toggle="collapse" data-bs-target="#help1"
              aria-expanded="true" aria-controls="help1">
        B.Tech &amp; M.Tech
      </button>
    </h3>
    <div id="help1" class="accordion-collapse collapse show" data-bs-parent="#helplineAccordion">
      <div class="accordion-body d-grid gap-2">
        <a href="tel:+919041495448" class="text-decoration-none">…9041495448</a>
        …
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button collapsed" …>BBA, B.Com &amp; MBA</button>
    </h3>
    …
  </div>
</div>
```

| Class / attribute | What it does |
|---|---|
| `accordion` | the wrapper — **must have an `id`** for `data-bs-parent` to point at |
| `accordion-item` | one panel |
| `accordion-header` | wrapper for the button (we used `<h3>` to keep the heading outline correct) |
| `accordion-button` | the clickable bar, with the rotating chevron built in |
| `collapsed` | marks a button whose panel starts **closed** (this flips the chevron) |
| `accordion-collapse collapse` | the panel that expands and contracts |
| `show` | the panel that starts **open** |
| `data-bs-parent="#helplineAccordion"` | **opening one panel closes the others** |

`data-bs-parent` is the attribute worth pointing out. Remove it and all four panels can be
open at once — the accordion becomes four independent collapses. That one attribute is the
entire difference.

The same Collapse plugin powers the navbar hamburger; the navbar just wraps it in
`navbar-collapse` styling.

---

## 9. List group

**Docs:** <https://getbootstrap.com/docs/5.3/components/list-group/> · used **twice**

```html
<!-- Hero quick links: flush, so it sits flat inside the card -->
<div class="list-group list-group-flush">
  <a href="#notices" class="list-group-item list-group-item-action d-flex align-items-center gap-3">
    <i class="bi bi-megaphone-fill text-gold"></i> Latest Notices
  </a>
  …
</div>

<!-- Notices: standard list group with a status badge on each row -->
<div class="list-group shadow-sm">
  <a href="https://admission.gndec.ac.in/spot_counselling/" target="_blank" rel="noopener"
     class="list-group-item list-group-item-action">
    <div class="d-flex justify-content-between align-items-start gap-3">
      <div>
        <h3 class="h6 mb-1">Spot Counselling 2026-27</h3>
        <p class="mb-0 small text-secondary">Spot counselling details for the 2026-27 session.</p>
      </div>
      <span class="badge text-bg-warning flex-shrink-0">New</span>
    </div>
  </a>
  …
</div>
```

| Class | What it does |
|---|---|
| `list-group` | the container |
| `list-group-item` | one row |
| `list-group-item-action` | adds hover **and focus** styling — use it when rows are links |
| `list-group-flush` | removes the outer border and rounding so it sits flush inside a card |

**Why this section matters.** The original site presents notices in a scrolling marquee.
A marquee cannot be paused, cannot be read at your own pace, and cannot be reached with the
keyboard. A list group is a plain list of links: it stops moving, it tabs, and screen readers
read it normally. Same content, genuinely better delivery — a good, concrete example of
*"redesign the presentation, not the facts."*

`flex-shrink-0` on the badge stops it from being squashed when the notice title is long.

---

## 10. Badges and Buttons

### Badges

**Docs:** <https://getbootstrap.com/docs/5.3/components/badge/> · used **31 times**

```html
<span class="badge text-bg-secondary">360 seats</span>
<span class="badge text-bg-warning flex-shrink-0">New</span>
<span class="badge text-bg-light border fs-6 fw-normal py-2 px-3">NAAC &lsquo;A&rsquo; Grade</span>
```

`text-bg-*` (docs: <https://getbootstrap.com/docs/5.3/helpers/color-background/>) is worth
knowing — it sets the background **and** a readable foreground colour together. Compare with
writing `bg-warning text-white` yourself and hoping the contrast passes. `text-bg-warning`
picks dark text because the yellow is light. One class, contrast handled.

The accreditation pills show that a component is just a starting point: `badge` gives the
shape, then `fs-6 fw-normal py-2 px-3` scales it up from a tiny label into a readable pill.

### Buttons

**Docs:** <https://getbootstrap.com/docs/5.3/components/buttons/> · `.btn` used **9 times**

```html
<a href="#programmes" class="btn btn-gold btn-lg px-4">…</a>
<a href="…" class="btn btn-outline-light btn-lg px-4">…</a>
<a href="…" class="btn btn-gold btn-sm px-3">Apply Now</a>
<a href="https://wa.me/917347200448" class="btn btn-success w-100 mt-3 py-2">…</a>
<button type="submit" class="btn btn-primary px-4">…</button>
<a href="#top" class="btn btn-gold back-to-top rounded-circle p-3 lh-1" aria-label="Back to top">…</a>
```

- `btn` is the base; a variant like `btn-primary` / `btn-success` / `btn-outline-light`
  supplies the colour.
- `btn-lg` and `btn-sm` change the size.
- `btn-outline-*` is a transparent button with a coloured border — used for the secondary
  hero action so the gold *Explore Programmes* button stays clearly primary.
- **`btn-gold` is not a Bootstrap class** — it is ours, built the Bootstrap way. See
  [section 17](#17-theming-with-css-variables).
- `.btn` works on `<a>` as well as `<button>`. Use `<a>` when it navigates and `<button>`
  when it acts — here, the form submit is a real `<button>` and everything else is a link.

---

## 11. Forms and validation

**Docs:** <https://getbootstrap.com/docs/5.3/forms/overview/> ·
<https://getbootstrap.com/docs/5.3/forms/form-control/> ·
<https://getbootstrap.com/docs/5.3/forms/select/> ·
<https://getbootstrap.com/docs/5.3/forms/validation/>

```html
<form id="enquiryForm" novalidate>
  <div class="row g-3">

    <div class="col-md-6">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" required>
      <div class="invalid-feedback">Please enter a valid email address.</div>
    </div>

    <div class="col-md-6">
      <label for="phone" class="form-label">Phone number</label>
      <input type="tel" class="form-control" id="phone" pattern="[0-9]{10}" required>
      <div class="invalid-feedback">Please enter a 10-digit phone number.</div>
    </div>

    <div class="col-md-6">
      <label for="programme" class="form-label">Programme of interest</label>
      <select class="form-select" id="programme" required>
        <option value="" selected disabled>Choose a programme</option>
        <option>B.Tech</option>
        …
      </select>
      <div class="invalid-feedback">Please select a programme.</div>
    </div>

    <div class="col-12">
      <label for="message" class="form-label">Your question</label>
      <textarea class="form-control" id="message" rows="4" required></textarea>
      <div class="invalid-feedback">Please type your question.</div>
    </div>

  </div>
</form>
```

| Class / attribute | What it does |
|---|---|
| `form-label` | consistent label spacing |
| `form-control` | styles `<input>` and `<textarea>` |
| `form-select` | styles `<select>` (a different class — `form-control` will not style a select correctly) |
| `invalid-feedback` | the error message, **hidden until the field is marked invalid** |
| `novalidate` | switches off the browser's own popups so Bootstrap's styling is used instead |
| `required`, `type="email"`, `pattern="[0-9]{10}"` | plain HTML validation rules — no JS |

**The mechanism** (docs: [Validation → Custom styles](https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles)):
Bootstrap does not validate anything itself. It just supplies styles that activate when the
form carries the class `was-validated`. Our JavaScript adds that class:

```js
enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault();                  // no server, so never actually submit

  if (!enquiryForm.checkValidity()) {      // browser checks required / type / pattern
    enquiryForm.classList.add("was-validated");   // <- this is what makes Bootstrap show it
    return;
  }

  Swal.fire({ icon: "success", title: "Enquiry received", … });
  enquiryForm.reset();
  enquiryForm.classList.remove("was-validated");
});
```

`checkValidity()` is a **built-in browser method**, not a Bootstrap one — it reads the `required`,
`type` and `pattern` attributes and returns true or false. We never write the validation logic.

The grid is reused inside the form: `row g-3` with `col-md-6` puts name/email and phone/programme
side by side on tablets and stacks them on phones, and `col-12` gives the textarea a full row.

---

## 12. Typography and content

**Docs:** <https://getbootstrap.com/docs/5.3/content/typography/>

| Class | What it does | Where |
|---|---|---|
| `display-4` | very large display heading | the `<h1>` in the hero |
| `display-5` | large display heading | the four statistics numbers |
| `lead` | slightly larger, lighter intro paragraph | hero subtitle |
| `h1` … `h6` **as classes** | heading *size* without changing the tag | everywhere |
| `small` | ~87.5% font size | captions, helper text (used 32 times) |
| `blockquote` | quotation styling | the vision statement |
| `blockquote-footer` | the attribution line under a quote | "Vision, Guru Nanak Dev…" |

**The heading-class trick** — the most useful idea in this section:

```html
<h3 class="h5 card-title">Computer Science &amp; Engineering</h3>
<h2 class="section-title h1 mb-4">About the College</h2>
<h3 class="h6 mb-1">Spot Counselling 2026-27</h3>
```

The **tag** sets the meaning (where it sits in the document outline, which screen readers use
to navigate) and the **class** sets the size. So a card title can be an `<h3>` for correctness
while looking like an `<h5>`. Never choose a heading tag because of how big it looks — choose
the tag for structure, then fix the size with a class.

The vision quote uses the semantic figure/blockquote pattern:

```html
<figure class="border-start border-4 border-warning ps-3 mt-4">
  <blockquote class="blockquote fs-6 mb-2">
    <p class="fst-italic">&ldquo;Realization of Glimpses of a Golden India…&rdquo;</p>
  </blockquote>
  <figcaption class="blockquote-footer mb-0">Vision, Guru Nanak Dev Engineering College</figcaption>
</figure>
```

The gold bar on the left is not an image or a custom rule — it is three border utilities:
`border-start` (left edge only), `border-4` (thickness), `border-warning` (colour).

### Images — `.img-fluid`

**Docs:** <https://getbootstrap.com/docs/5.3/content/images/>

The project uses one real image: the campus entrance photo in the About section
(`images/home.jpg`, 800×600).

```html
<figure class="mb-0">
  <img src="images/home.jpg" class="img-fluid rounded shadow" width="800" height="600" loading="lazy"
       alt="The main entrance block of Guru Nanak Dev Engineering College, Ludhiana, with the
            driveway and lawns in front of it">
  <figcaption class="small text-secondary mt-2 mb-0">
    <i class="bi bi-geo-alt me-1"></i>The main entrance block, GNDEC campus, Gill Road, Ludhiana.
  </figcaption>
</figure>
```

| Class / attribute | What it does |
|---|---|
| `img-fluid` | `max-width: 100%; height: auto` — the image shrinks to fit its column instead of overflowing. **Every responsive image needs this.** |
| `rounded` `shadow` | Bootstrap [border](https://getbootstrap.com/docs/5.3/utilities/borders/) and [shadow](https://getbootstrap.com/docs/5.3/utilities/shadows/) utilities, so no custom CSS for the photo frame |
| `width` / `height` attributes | not styling — they tell the browser the aspect ratio **before** the file arrives, so the page does not jump as images load (this is Cumulative Layout Shift) |
| `loading="lazy"` | a plain HTML attribute: do not download until the user scrolls near it. Safe here because the photo sits well below the fold — never put it on something visible immediately, or it flashes in late |
| `alt` | describes the image for screen readers and for anyone whose images fail to load |

**Two decisions worth explaining**

1. **`figure` + `figcaption` rather than a `<div>` and a `<p>`.** These are semantic HTML tags
   that tie a caption to its image, so assistive technology announces them as one unit.

2. **`img-fluid` is not optional.** Without it, an 800px image sits at 800px and blows out the
   layout on a 375px phone — the page would scroll sideways. It is the first class to reach for
   on any image inside a responsive grid.

> **Choosing an image format:** PNG is right for flat graphics, screenshots and anything
> needing transparency; **JPEG is right for photographs**, and compresses them far smaller at
> the same visible quality. `home.jpg` is a photo saved as JPEG at 79 KB — the correct pairing.

---

## 13. Utilities and helpers

Utilities are single-purpose classes that let you handle spacing, colour and layout without
opening the CSS file. They are the reason our `style.css` is only ~180 lines.

### Spacing

**Docs:** <https://getbootstrap.com/docs/5.3/utilities/spacing/>

Format: `{property}{side}-{breakpoint}-{size}`

- property: `m` margin · `p` padding
- side: `t` top · `b` bottom · `s` start/left · `e` end/right · `x` left+right · `y` top+bottom · *(none)* all
- size: `0` to `5`, or `auto`

```html
<section class="py-5">                 <!-- padding top+bottom, size 5 -->
<div class="container py-lg-4">        <!-- extra padding only from 992px up -->
<h2 class="section-title h1 mb-4">     <!-- margin-bottom -->
<ul class="navbar-nav ms-auto">        <!-- margin-start: auto — pushes the menu right -->
<i class="bi bi-telephone me-2"></i>   <!-- small gap after an icon -->
```

Used in this project: `m-2`, `mb-0/1/2/3/4/5`, `me-1/2`, `ms-1/2/auto/xl-3`, `mt-2/3/4/xl-0`,
`my-4`, `p-3/4`, `pb-4`, `ps-3`, `pt-5`, `px-3/4`, `py-2/3/4/5`, `py-lg-3/4`.

Note `s` and `e` rather than `l` and `r`: Bootstrap 5 uses **start/end** so layouts also work
in right-to-left languages.

### Flexbox

**Docs:** <https://getbootstrap.com/docs/5.3/utilities/flex/> · `d-flex` used **48 times**

```html
<div class="container d-flex justify-content-between align-items-center small">
<div class="d-flex flex-wrap gap-3">
<span class="badge text-bg-warning flex-shrink-0">New</span>
<ul class="list-unstyled d-grid gap-3">
```

| Class | What it does |
|---|---|
| `d-flex` | make this a flex row |
| `d-grid` | make this a CSS grid — used with `gap-*` for evenly spaced stacked items |
| `justify-content-between` | push children to opposite ends (name left, badge right) |
| `justify-content-center` | centre children |
| `align-items-center` | vertically centre |
| `align-items-start` | align to the top — used where a notice title wraps to two lines |
| `flex-wrap` | allow wrapping to a new line |
| `flex-shrink-0` | never squash this item |
| `gap-2` / `gap-3` | spacing **between** flex or grid children |

`gap-*` is worth calling out: before it existed you spaced flex children with margins and then
had to strip the last one. `gap` handles it in one class with no exceptions.

### Display

**Docs:** <https://getbootstrap.com/docs/5.3/utilities/display/>

```html
<div class="… d-none d-lg-block">        <!-- hidden by default, shown from 992px -->
<span class="… d-none d-sm-inline">      <!-- hidden below 576px -->
```

The mobile-first pattern: hide with the plain class, then show again at a breakpoint.

### Colours and background

**Docs:** <https://getbootstrap.com/docs/5.3/utilities/colors/> ·
<https://getbootstrap.com/docs/5.3/utilities/background/>

`text-white`, `text-white-50` (50% opaque white for secondary text on the navy bands),
`text-secondary` (muted grey, used 23 times), `text-bg-light`, `text-bg-secondary`,
`text-bg-warning`.

`link-light` (docs: <https://getbootstrap.com/docs/5.3/helpers/colored-links/>) is used 13
times in the footer for light-coloured links on the dark background.

`bg-navy`, `bg-navy-deep`, `bg-surface` and `text-gold` are **ours**, written to match the
Bootstrap naming convention so they read as part of the same system.

### Borders, shadows, sizing, position

**Docs:** [borders](https://getbootstrap.com/docs/5.3/utilities/borders/) ·
[shadows](https://getbootstrap.com/docs/5.3/utilities/shadows/) ·
[sizing](https://getbootstrap.com/docs/5.3/utilities/sizing/) ·
[position](https://getbootstrap.com/docs/5.3/utilities/position/)

| Class | What it does |
|---|---|
| `border` | add a border on all sides |
| `border-0` | remove the border (used 41 times, on every card) |
| `border-start`, `border-bottom` | one edge only |
| `border-4` | border width |
| `border-warning`, `border-secondary` | border colour |
| `rounded`, `rounded-circle` | corner radius; `rounded-circle` makes the back-to-top button round |
| `shadow-sm`, `shadow-lg` | soft drop shadows |
| `h-100` | height 100% — equal-height cards (used 43 times) |
| `w-100` | width 100% — the full-width WhatsApp button |
| `sticky-top` | pin to the top on scroll |

### Text utilities

**Docs:** <https://getbootstrap.com/docs/5.3/utilities/text/>

`text-center`, `text-decoration-none` (36 times — removes link underlines), `text-nowrap`
(stops navbar labels wrapping mid-word), `fw-bold`, `fw-semibold`, `fw-normal`, `fst-italic`,
`lh-1` (line-height 1, so the icon-only back-to-top button stays perfectly round),
`fs-3`/`fs-5`/`fs-6` (font sizes matching the `h3`/`h5`/`h6` scale).

### Helpers

| Class | Docs | Use here |
|---|---|---|
| `stretched-link` | <https://getbootstrap.com/docs/5.3/helpers/stretched-link/> | makes the **whole card** clickable, not just the link text (9 cards) |
| `visually-hidden-focusable` | <https://getbootstrap.com/docs/5.3/helpers/visually-hidden/> | the skip link — invisible until a keyboard user tabs to it |
| `list-unstyled` | <https://getbootstrap.com/docs/5.3/content/typography/#unstyled> | removes bullets and padding from a `<ul>` (6 times) |

```html
<!-- Skip link: first thing in <body>, invisible until focused -->
<a href="#main" class="visually-hidden-focusable btn btn-gold m-2">Skip to main content</a>
```

`stretched-link` works by giving the link an absolutely-positioned `::after` that covers the
nearest positioned ancestor — which is why it must sit inside the card, not around it.

---

## 14. Bootstrap Icons

**Docs:** <https://icons.getbootstrap.com/> · **41 icons used**

Loaded as a **web font**, so each icon is an `<i>` with two classes — `bi` plus the icon name:

```html
<i class="bi bi-mortarboard-fill text-gold fs-3"></i>
<i class="bi bi-whatsapp me-2"></i>
<i class="bi bi-check-circle-fill text-gold fs-5"></i>
```

Because they are font glyphs, they take colour from `text-*` and size from `fs-*` just like
text does. That is the advantage worth stating: all 41 icons are **vector** and stay sharp on
any screen, and none of them is a separate image file to size, compress or maintain. The only
real image file in the project is the campus photograph in `images/` — everything else you
see that looks like an icon is a font character.

Many icons come in an outline and a `-fill` variant (`bi-telephone` / `bi-telephone-fill`).

The full set used, grouped by where:

- **Navigation & actions:** `bi-mortarboard-fill`, `bi-arrow-up`, `bi-arrow-right-short`, `bi-box-arrow-up-right`, `bi-send`, `bi-info-circle`
- **Contact:** `bi-geo-alt`, `bi-geo-alt-fill`, `bi-telephone`, `bi-telephone-fill`, `bi-envelope`, `bi-envelope-fill`, `bi-whatsapp`
- **About & stats:** `bi-award-fill`, `bi-check-circle-fill`, `bi-journal-bookmark-fill`, `bi-megaphone-fill`
- **Departments:** `bi-cpu`, `bi-hdd-network`, `bi-buildings`, `bi-lightning-charge`, `bi-broadcast-pin`, `bi-gear-wide-connected`, `bi-graph-up-arrow`, `bi-code-square`, `bi-rulers`, `bi-thermometer-half`
- **Campus life:** `bi-book-half`, `bi-book-fill`, `bi-pc-display`, `bi-trophy`, `bi-house-door`, `bi-people`, `bi-shield-check`
- **Research & placements:** `bi-mortarboard`, `bi-lightbulb`, `bi-briefcase-fill`, `bi-patch-check-fill`, `bi-globe2`, `bi-easel`, `bi-building-check`

---

## 15. Bootstrap JavaScript

**Docs:** <https://getbootstrap.com/docs/5.3/getting-started/javascript/>

Bootstrap 5 needs **no jQuery**. Components are activated by `data-bs-*` attributes in the
HTML. Every `data-bs-*` attribute used in this project:

| Attribute | Docs | Where we use it | What it does |
|---|---|---|---|
| `data-bs-toggle="collapse"` | [Collapse](https://getbootstrap.com/docs/5.3/components/collapse/) | navbar hamburger, 4 accordion buttons | opens/closes the target |
| `data-bs-toggle="dropdown"` | [Dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/) | Departments menu | opens the dropdown |
| `data-bs-toggle="tab"` | [Navs & tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior) | 3 programme tabs | switches the visible pane |
| `data-bs-target="#id"` | — | all of the above | **which element** is controlled |
| `data-bs-parent="#id"` | [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) | helpline accordion | only one panel open at a time |
| `data-bs-spy="scroll"` | [Scrollspy](https://getbootstrap.com/docs/5.3/components/scrollspy/) | `<body>` | highlights the current section's nav link |
| `data-bs-root-margin` | [Scrollspy options](https://getbootstrap.com/docs/5.3/components/scrollspy/#options) | `<body>` | when a section counts as "current" |
| `data-bs-smooth-scroll` | [Scrollspy options](https://getbootstrap.com/docs/5.3/components/scrollspy/#options) | `<body>` | smooth-scrolls anchor jumps |

`data-bs-toggle` says *what kind of behaviour*, `data-bs-target` says *which element*. Learn
that pair and most of Bootstrap's JavaScript becomes readable.

### Using the JavaScript API directly

**Docs:** <https://getbootstrap.com/docs/5.3/getting-started/javascript/#programmatic-api>

We reach for the API exactly once — Bootstrap does not close the mobile menu after you tap a
link, so the open menu ends up covering the section you just jumped to:

```js
// js/script.js
navMenu.querySelectorAll("a[href^='#']").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});
```

- `bootstrap.Collapse.getOrCreateInstance(element)` returns the component's JS object,
  creating it if it does not exist yet. The same pattern works for every component:
  `bootstrap.Modal`, `bootstrap.Tab`, `bootstrap.Dropdown`.
- `a[href^='#']` is a CSS attribute selector meaning "href **starts with** `#`", so only
  in-page links trigger it — the external portal links in the menu are left alone.

---

## 16. Scrollspy

**Docs:** <https://getbootstrap.com/docs/5.3/components/scrollspy/>

```html
<body data-bs-spy="scroll" data-bs-target="#mainNav"
      data-bs-root-margin="0px 0px -55%" data-bs-smooth-scroll="true" tabindex="0">
```

Bootstrap watches which section is on screen and adds `.active` to the matching link inside
`#mainNav`. Our CSS turns that gold:

```css
.site-navbar .nav-link.active { color: var(--gndec-gold); }
```

The links find their sections by their `href` — `<a href="#about">` pairs with
`<section id="about">`. Nothing else connects them.

`data-bs-root-margin="0px 0px -55%"` shrinks the detection area from the bottom, so a section
becomes "current" once it is properly on screen rather than the instant its top edge appears.

> **Version trap worth knowing.** Older tutorials use `data-bs-offset` for this. Bootstrap 5.2
> rewrote Scrollspy on top of `IntersectionObserver`, and the old `offset` and `method` options
> were **deprecated in favour of `rootMargin`**. Bootstrap 5.3 still converts a given `offset`
> into a `rootMargin` for backwards compatibility, but the docs say that will be **removed in
> v6** — so `data-bs-root-margin` is the option to learn. Always check which version the
> tutorial you are reading was written for.

The companion line lives in our CSS:

```css
body { scroll-padding-top: 5rem; }
```

Without it, jumping to `#about` lands with the heading hidden behind the sticky navbar.
`scroll-padding-top` reserves that space on every anchor jump — one line of plain CSS for a
problem people usually solve with JavaScript.

---

## 17. Theming with CSS variables

**Docs:** <https://getbootstrap.com/docs/5.3/customize/css-variables/>

This is the neatest technique in the project, and the reason the custom CSS stays small.
Bootstrap 5.3 builds its components out of CSS variables, so **redefining a variable
re-themes everything that uses it** — no overrides, no `!important`.

```css
/* css/style.css */
:root {
  --gndec-navy: #0b2545;      /* our own names */
  --gndec-gold: #f0a500;

  --bs-primary: #0b2545;      /* Bootstrap's own variables */
  --bs-primary-rgb: 11, 37, 69;
  --bs-link-color: #0b2545;
  --bs-link-color-rgb: 11, 37, 69;
  --bs-link-hover-color: #f0a500;
}
```

Those five `--bs-*` lines turn every `.text-primary` and `.bg-primary` and every default link
on the page navy. `--bs-primary-rgb` has to be set as well because Bootstrap uses the RGB
form for translucent variants like `bg-primary bg-opacity-25`.

**Component-level variables** (docs: [CSS variables → Component variables](https://getbootstrap.com/docs/5.3/customize/css-variables/#component-variables))
go further. Each component reads its own `--bs-{component}-*` set, so you can create a brand
new button variant in six lines:

```css
.btn-gold {
  --bs-btn-color: #0b2545;
  --bs-btn-bg: var(--gndec-gold);
  --bs-btn-border-color: var(--gndec-gold);
  --bs-btn-hover-bg: #ffb724;
  --bs-btn-hover-border-color: #ffb724;
  --bs-btn-focus-shadow-rgb: 240, 165, 0;
}
```

`.btn-gold` is now a first-class Bootstrap button: it works with `btn-lg`, `btn-sm`,
`rounded-circle`, disabled states and focus rings, because it is built from the same
variables `.btn-primary` uses. **We did not override Bootstrap; we configured it.** That is
the difference between using the framework and fighting it.

Our custom classes (13 in total): `site-navbar`, `hero`, `hero-title`, `bg-navy`,
`bg-navy-deep`, `bg-surface`, `text-gold`, `btn-gold`, `icon-circle`, `section-title`,
`reveal`, `hover-lift`, `back-to-top`. Everything else on the page is stock Bootstrap.

---

## 18. Complete A–Z class index

All 163 Bootstrap classes used in `index.html`, with usage counts.

| Class | × | Category |
|---|---|---|
| `accordion` | 1 | Accordion |
| `accordion-body` | 4 | Accordion |
| `accordion-button` | 4 | Accordion |
| `accordion-collapse` | 4 | Accordion |
| `accordion-header` | 4 | Accordion |
| `accordion-item` | 4 | Accordion |
| `active` | 2 | Component state |
| `align-items-center` | 31 | Flex |
| `align-items-start` | 5 | Flex |
| `align-items-xl-center` | 1 | Flex (responsive) |
| `badge` | 31 | Badge |
| `blockquote` | 1 | Typography |
| `blockquote-footer` | 1 | Typography |
| `border` | 9 | Borders |
| `border-0` | 41 | Borders |
| `border-4` | 1 | Borders |
| `border-bottom` | 1 | Borders |
| `border-secondary` | 5 | Borders |
| `border-start` | 1 | Borders |
| `border-warning` | 1 | Borders |
| `btn` | 9 | Buttons |
| `btn-lg` | 2 | Buttons |
| `btn-outline-light` | 1 | Buttons |
| `btn-primary` | 2 | Buttons |
| `btn-sm` | 1 | Buttons |
| `btn-success` | 1 | Buttons |
| `card` | 41 | Card |
| `card-body` | 41 | Card |
| `card-text` | 13 | Card |
| `card-title` | 20 | Card |
| `col` | 52 | Grid |
| `col-12` | 3 | Grid |
| `col-6` | 2 | Grid |
| `col-lg-2` | 1 | Grid (responsive) |
| `col-lg-3` | 2 | Grid (responsive) |
| `col-lg-4` | 1 | Grid (responsive) |
| `col-lg-5` | 5 | Grid (responsive) |
| `col-lg-7` | 5 | Grid (responsive) |
| `col-md-6` | 6 | Grid (responsive) |
| `collapse` | 5 | Collapse |
| `collapsed` | 3 | Collapse |
| `container` | 13 | Layout |
| `d-flex` | 48 | Display |
| `d-grid` | 8 | Display |
| `d-lg-block` | 1 | Display (responsive) |
| `d-none` | 2 | Display |
| `d-sm-inline` | 1 | Display (responsive) |
| `display-4` | 1 | Typography |
| `display-5` | 4 | Typography |
| `dropdown` | 1 | Dropdown |
| `dropdown-divider` | 1 | Dropdown |
| `dropdown-item` | 6 | Dropdown |
| `dropdown-menu` | 1 | Dropdown |
| `dropdown-menu-end` | 1 | Dropdown |
| `dropdown-toggle` | 1 | Dropdown |
| `fade` | 3 | Transition |
| `flex-shrink-0` | 5 | Flex |
| `flex-wrap` | 2 | Flex |
| `form-control` | 4 | Forms |
| `form-label` | 5 | Forms |
| `form-select` | 1 | Forms |
| `fs-3` | 5 | Text |
| `fs-5` | 12 | Text |
| `fs-6` | 6 | Text |
| `fst-italic` | 1 | Text |
| `fw-bold` | 5 | Text |
| `fw-normal` | 6 | Text |
| `fw-semibold` | 22 | Text |
| `g-3` | 5 | Gutters |
| `g-4` | 5 | Gutters |
| `g-5` | 5 | Gutters |
| `gap-2` | 10 | Flex/Grid gap |
| `gap-3` | 45 | Flex/Grid gap |
| `gap-md-3` | 1 | Flex/Grid gap (responsive) |
| `h-100` | 43 | Sizing |
| `h1` | 9 | Typography (size only) |
| `h4` | 1 | Typography (size only) |
| `h5` | 20 | Typography (size only) |
| `h6` | 8 | Typography (size only) |
| `img-fluid` | 1 | Images |
| `invalid-feedback` | 5 | Forms |
| `justify-content-between` | 27 | Flex |
| `justify-content-center` | 2 | Flex |
| `lead` | 1 | Typography |
| `lh-1` | 1 | Text |
| `link-light` | 13 | Coloured links |
| `list-group` | 2 | List group |
| `list-group-flush` | 1 | List group |
| `list-group-item` | 9 | List group |
| `list-group-item-action` | 9 | List group |
| `list-unstyled` | 6 | Typography |
| `m-2` | 1 | Spacing |
| `mb-0` | 37 | Spacing |
| `mb-1` | 10 | Spacing |
| `mb-2` | 2 | Spacing |
| `mb-3` | 20 | Spacing |
| `mb-4` | 10 | Spacing |
| `mb-5` | 4 | Spacing |
| `me-1` | 7 | Spacing |
| `me-2` | 16 | Spacing |
| `ms-1` | 2 | Spacing |
| `ms-2` | 1 | Spacing |
| `ms-auto` | 1 | Spacing |
| `ms-xl-3` | 1 | Spacing (responsive) |
| `mt-2` | 6 | Spacing |
| `mt-3` | 2 | Spacing |
| `mt-4` | 2 | Spacing |
| `mt-xl-0` | 1 | Spacing (responsive) |
| `my-4` | 1 | Spacing |
| `nav` | 1 | Navs |
| `nav-item` | 11 | Navs |
| `nav-link` | 10 | Navs |
| `nav-tabs` | 1 | Tabs |
| `navbar` | 1 | Navbar |
| `navbar-brand` | 1 | Navbar |
| `navbar-collapse` | 1 | Navbar |
| `navbar-dark` | 1 | Navbar |
| `navbar-expand-xl` | 1 | Navbar |
| `navbar-nav` | 1 | Navbar |
| `navbar-toggler` | 1 | Navbar |
| `navbar-toggler-icon` | 1 | Navbar |
| `p-3` | 5 | Spacing |
| `p-4` | 2 | Spacing |
| `pb-4` | 1 | Spacing |
| `ps-3` | 1 | Spacing |
| `pt-5` | 1 | Spacing |
| `px-3` | 6 | Spacing |
| `px-4` | 5 | Spacing |
| `py-2` | 7 | Spacing |
| `py-3` | 1 | Spacing |
| `py-4` | 1 | Spacing |
| `py-5` | 8 | Spacing |
| `py-lg-3` | 2 | Spacing (responsive) |
| `py-lg-4` | 6 | Spacing (responsive) |
| `rounded` | 5 | Borders |
| `rounded-circle` | 1 | Borders |
| `row` | 16 | Grid |
| `row-cols-1` | 5 | Grid |
| `row-cols-2` | 2 | Grid |
| `row-cols-lg-3` | 2 | Grid (responsive) |
| `row-cols-lg-4` | 1 | Grid (responsive) |
| `row-cols-md-2` | 5 | Grid (responsive) |
| `row-cols-xl-3` | 2 | Grid (responsive) |
| `shadow` | 1 | Shadows |
| `shadow-lg` | 1 | Shadows |
| `shadow-sm` | 42 | Shadows |
| `show` | 2 | Component state |
| `small` | 33 | Typography |
| `sticky-top` | 1 | Position |
| `stretched-link` | 9 | Helper |
| `tab-content` | 1 | Tabs |
| `tab-pane` | 3 | Tabs |
| `text-bg-light` | 5 | Colour helper |
| `text-bg-secondary` | 24 | Colour helper |
| `text-bg-warning` | 2 | Colour helper |
| `text-center` | 10 | Text |
| `text-decoration-none` | 36 | Text |
| `text-nowrap` | 1 | Text |
| `text-secondary` | 24 | Colours |
| `text-white` | 5 | Colours |
| `text-white-50` | 9 | Colours |
| `visually-hidden-focusable` | 1 | Helper |
| `w-100` | 1 | Sizing |

---|---|---|
| `accordion` | 1 | Accordion |
| `accordion-body` | 4 | Accordion |
| `accordion-button` | 4 | Accordion |
| `accordion-collapse` | 4 | Accordion |
| `accordion-header` | 4 | Accordion |
| `accordion-item` | 4 | Accordion |
| `active` | 2 | Component state |
| `align-items-center` | 31 | Flex |
| `align-items-start` | 5 | Flex |
| `align-items-xl-center` | 1 | Flex (responsive) |
| `badge` | 31 | Badge |
| `bg-white` | 1 | Background |
| `blockquote` | 1 | Typography |
| `blockquote-footer` | 1 | Typography |
| `border` | 9 | Borders |
| `border-0` | 41 | Borders |
| `border-4` | 1 | Borders |
| `border-bottom` | 2 | Borders |
| `border-secondary` | 5 | Borders |
| `border-start` | 1 | Borders |
| `border-warning` | 1 | Borders |
| `btn` | 9 | Buttons |
| `btn-lg` | 2 | Buttons |
| `btn-outline-light` | 1 | Buttons |
| `btn-primary` | 2 | Buttons |
| `btn-sm` | 1 | Buttons |
| `btn-success` | 1 | Buttons |
| `card` | 41 | Card |
| `card-body` | 41 | Card |
| `card-text` | 13 | Card |
| `card-title` | 20 | Card |
| `col` | 52 | Grid |
| `col-12` | 3 | Grid |
| `col-6` | 2 | Grid |
| `col-lg-2` | 1 | Grid (responsive) |
| `col-lg-3` | 2 | Grid (responsive) |
| `col-lg-4` | 1 | Grid (responsive) |
| `col-lg-5` | 5 | Grid (responsive) |
| `col-lg-7` | 5 | Grid (responsive) |
| `col-md-6` | 6 | Grid (responsive) |
| `collapse` | 5 | Collapse |
| `collapsed` | 3 | Collapse |
| `container` | 14 | Layout |
| `d-flex` | 48 | Display |
| `d-grid` | 8 | Display |
| `d-lg-block` | 1 | Display (responsive) |
| `d-md-block` | 1 | Display (responsive) |
| `d-none` | 3 | Display |
| `d-sm-inline` | 1 | Display (responsive) |
| `display-4` | 1 | Typography |
| `display-5` | 4 | Typography |
| `dropdown` | 1 | Dropdown |
| `dropdown-divider` | 1 | Dropdown |
| `dropdown-item` | 6 | Dropdown |
| `dropdown-menu` | 1 | Dropdown |
| `dropdown-menu-end` | 1 | Dropdown |
| `dropdown-toggle` | 1 | Dropdown |
| `fade` | 3 | Transition |
| `flex-shrink-0` | 5 | Flex |
| `flex-wrap` | 2 | Flex |
| `form-control` | 4 | Forms |
| `form-label` | 5 | Forms |
| `form-select` | 1 | Forms |
| `fs-3` | 5 | Text |
| `fs-5` | 12 | Text |
| `fs-6` | 6 | Text |
| `fst-italic` | 1 | Text |
| `fw-bold` | 5 | Text |
| `fw-normal` | 6 | Text |
| `fw-semibold` | 22 | Text |
| `g-3` | 5 | Gutters |
| `g-4` | 5 | Gutters |
| `g-5` | 5 | Gutters |
| `gap-2` | 10 | Flex/Grid gap |
| `gap-3` | 45 | Flex/Grid gap |
| `gap-md-3` | 1 | Flex/Grid gap (responsive) |
| `h-100` | 43 | Sizing |
| `h1` | 9 | Typography (size only) |
| `h4` | 1 | Typography (size only) |
| `h5` | 20 | Typography (size only) |
| `h6` | 8 | Typography (size only) |
| `img-fluid` | 2 | Images |
| `invalid-feedback` | 5 | Forms |
| `justify-content-between` | 27 | Flex |
| `justify-content-center` | 2 | Flex |
| `lead` | 1 | Typography |
| `lh-1` | 1 | Text |
| `link-light` | 13 | Coloured links |
| `list-group` | 2 | List group |
| `list-group-flush` | 1 | List group |
| `list-group-item` | 9 | List group |
| `list-group-item-action` | 9 | List group |
| `list-unstyled` | 6 | Typography |
| `m-2` | 1 | Spacing |
| `mb-0` | 37 | Spacing |
| `mb-1` | 10 | Spacing |
| `mb-2` | 2 | Spacing |
| `mb-3` | 20 | Spacing |
| `mb-4` | 10 | Spacing |
| `mb-5` | 4 | Spacing |
| `me-1` | 7 | Spacing |
| `me-2` | 16 | Spacing |
| `ms-1` | 2 | Spacing |
| `ms-2` | 1 | Spacing |
| `ms-auto` | 1 | Spacing |
| `ms-xl-3` | 1 | Spacing (responsive) |
| `mt-2` | 6 | Spacing |
| `mt-3` | 2 | Spacing |
| `mt-4` | 2 | Spacing |
| `mt-xl-0` | 1 | Spacing (responsive) |
| `my-4` | 1 | Spacing |
| `nav` | 1 | Navs |
| `nav-item` | 11 | Navs |
| `nav-link` | 10 | Navs |
| `nav-tabs` | 1 | Tabs |
| `navbar` | 1 | Navbar |
| `navbar-brand` | 1 | Navbar |
| `navbar-collapse` | 1 | Navbar |
| `navbar-dark` | 1 | Navbar |
| `navbar-expand-xl` | 1 | Navbar |
| `navbar-nav` | 1 | Navbar |
| `navbar-toggler` | 1 | Navbar |
| `navbar-toggler-icon` | 1 | Navbar |
| `p-3` | 5 | Spacing |
| `p-4` | 2 | Spacing |
| `pb-4` | 1 | Spacing |
| `ps-3` | 1 | Spacing |
| `pt-5` | 1 | Spacing |
| `px-3` | 6 | Spacing |
| `px-4` | 5 | Spacing |
| `py-2` | 8 | Spacing |
| `py-3` | 1 | Spacing |
| `py-4` | 1 | Spacing |
| `py-5` | 8 | Spacing |
| `py-lg-3` | 2 | Spacing (responsive) |
| `py-lg-4` | 6 | Spacing (responsive) |
| `py-md-3` | 1 | Spacing (responsive) |
| `rounded` | 5 | Borders |
| `rounded-circle` | 1 | Borders |
| `row` | 16 | Grid |
| `row-cols-1` | 5 | Grid |
| `row-cols-2` | 2 | Grid |
| `row-cols-lg-3` | 2 | Grid (responsive) |
| `row-cols-lg-4` | 1 | Grid (responsive) |
| `row-cols-md-2` | 5 | Grid (responsive) |
| `row-cols-xl-3` | 2 | Grid (responsive) |
| `shadow` | 1 | Shadows |
| `shadow-lg` | 1 | Shadows |
| `shadow-sm` | 42 | Shadows |
| `show` | 2 | Component state |
| `small` | 33 | Typography |
| `sticky-top` | 1 | Position |
| `stretched-link` | 9 | Helper |
| `tab-content` | 1 | Tabs |
| `tab-pane` | 3 | Tabs |
| `text-bg-light` | 5 | Colour helper |
| `text-bg-secondary` | 24 | Colour helper |
| `text-bg-warning` | 2 | Colour helper |
| `text-center` | 11 | Text |
| `text-decoration-none` | 36 | Text |
| `text-nowrap` | 1 | Text |
| `text-secondary` | 24 | Colours |
| `text-white` | 5 | Colours |
| `text-white-50` | 9 | Colours |
| `visually-hidden-focusable` | 1 | Helper |
| `w-100` | 1 | Sizing |

---|---|---|
| `accordion` | 1 | Accordion |
| `accordion-body` | 4 | Accordion |
| `accordion-button` | 4 | Accordion |
| `accordion-collapse` | 4 | Accordion |
| `accordion-header` | 4 | Accordion |
| `accordion-item` | 4 | Accordion |
| `active` | 2 | Tabs / Scrollspy state |
| `align-items-center` | 30 | Flex |
| `align-items-start` | 5 | Flex |
| `align-items-xl-center` | 1 | Flex (responsive) |
| `badge` | 31 | Badge |
| `blockquote` | 1 | Typography |
| `blockquote-footer` | 1 | Typography |
| `border` | 9 | Borders |
| `border-0` | 41 | Borders |
| `border-4` | 1 | Borders |
| `border-bottom` | 1 | Borders |
| `border-secondary` | 5 | Borders |
| `border-start` | 1 | Borders |
| `border-warning` | 1 | Borders |
| `btn` | 9 | Buttons |
| `btn-lg` | 2 | Buttons |
| `btn-outline-light` | 1 | Buttons |
| `btn-primary` | 2 | Buttons |
| `btn-sm` | 1 | Buttons |
| `btn-success` | 1 | Buttons |
| `card` | 41 | Card |
| `card-body` | 41 | Card |
| `card-text` | 13 | Card |
| `card-title` | 20 | Card |
| `col` | 45 | Grid |
| `col-12` | 2 | Grid |
| `col-6` | 2 | Grid |
| `col-lg-2` | 1 | Grid |
| `col-lg-3` | 2 | Grid |
| `col-lg-4` | 1 | Grid |
| `col-lg-5` | 4 | Grid |
| `col-lg-6` | 2 | Grid |
| `col-lg-7` | 4 | Grid |
| `col-md-6` | 6 | Grid |
| `collapse` | 5 | Collapse |
| `collapsed` | 3 | Collapse state |
| `container` | 13 | Layout |
| `d-flex` | 48 | Display |
| `d-grid` | 9 | Display |
| `d-lg-block` | 1 | Display (responsive) |
| `d-none` | 2 | Display |
| `d-sm-inline` | 1 | Display (responsive) |
| `display-4` | 1 | Typography |
| `display-5` | 4 | Typography |
| `dropdown` | 1 | Dropdown |
| `dropdown-divider` | 1 | Dropdown |
| `dropdown-item` | 6 | Dropdown |
| `dropdown-menu` | 1 | Dropdown |
| `dropdown-menu-end` | 1 | Dropdown |
| `dropdown-toggle` | 1 | Dropdown |
| `fade` | 3 | Transition |
| `flex-shrink-0` | 5 | Flex |
| `flex-wrap` | 2 | Flex |
| `form-control` | 4 | Forms |
| `form-label` | 5 | Forms |
| `form-select` | 1 | Forms |
| `fs-3` | 5 | Text |
| `fs-5` | 12 | Text |
| `fs-6` | 6 | Text |
| `fst-italic` | 1 | Text |
| `fw-bold` | 5 | Text |
| `fw-normal` | 6 | Text |
| `fw-semibold` | 22 | Text |
| `g-3` | 4 | Gutters |
| `g-4` | 5 | Gutters |
| `g-5` | 5 | Gutters |
| `gap-2` | 10 | Flex/Grid gap |
| `gap-3` | 46 | Flex/Grid gap |
| `gap-md-3` | 1 | Gap (responsive) |
| `h-100` | 43 | Sizing |
| `h1` | 9 | Typography (size only) |
| `h4` | 1 | Typography (size only) |
| `h5` | 20 | Typography (size only) |
| `h6` | 8 | Typography (size only) |
| `invalid-feedback` | 5 | Validation |
| `lead` | 1 | Typography |
| `lh-1` | 1 | Text |
| `link-light` | 13 | Coloured links |
| `list-group` | 2 | List group |
| `list-group-flush` | 1 | List group |
| `list-group-item` | 9 | List group |
| `list-group-item-action` | 9 | List group |
| `list-unstyled` | 6 | Typography |
| `m-2` | 1 | Spacing |
| `mb-0` | 35 | Spacing |
| `mb-1` | 10 | Spacing |
| `mb-2` | 2 | Spacing |
| `mb-3` | 20 | Spacing |
| `mb-4` | 10 | Spacing |
| `mb-5` | 3 | Spacing |
| `me-1` | 6 | Spacing |
| `me-2` | 16 | Spacing |
| `ms-1` | 2 | Spacing |
| `ms-2` | 1 | Spacing |
| `ms-auto` | 1 | Spacing |
| `ms-xl-3` | 1 | Spacing (responsive) |
| `mt-2` | 5 | Spacing |
| `mt-3` | 2 | Spacing |
| `mt-4` | 2 | Spacing |
| `mt-xl-0` | 1 | Spacing (responsive) |
| `my-4` | 1 | Spacing |
| `nav` | 1 | Navs |
| `nav-item` | 11 | Navs |
| `nav-link` | 10 | Navs |
| `nav-tabs` | 1 | Tabs |
| `navbar` | 1 | Navbar |
| `navbar-brand` | 1 | Navbar |
| `navbar-collapse` | 1 | Navbar |
| `navbar-dark` | 1 | Navbar |
| `navbar-expand-xl` | 1 | Navbar |
| `navbar-nav` | 1 | Navbar |
| `navbar-toggler` | 1 | Navbar |
| `navbar-toggler-icon` | 1 | Navbar |
| `p-3` | 5 | Spacing |
| `p-4` | 2 | Spacing |
| `pb-4` | 1 | Spacing |
| `ps-3` | 1 | Spacing |
| `pt-5` | 1 | Spacing |
| `px-3` | 6 | Spacing |
| `px-4` | 5 | Spacing |
| `py-2` | 7 | Spacing |
| `py-3` | 1 | Spacing |
| `py-4` | 1 | Spacing |
| `py-5` | 8 | Spacing |
| `py-lg-3` | 2 | Spacing (responsive) |
| `py-lg-4` | 6 | Spacing (responsive) |
| `rounded` | 4 | Borders |
| `rounded-circle` | 1 | Borders |
| `row` | 14 | Grid |
| `row-cols-1` | 4 | Grid |
| `row-cols-2` | 2 | Grid |
| `row-cols-lg-3` | 2 | Grid |
| `row-cols-lg-4` | 1 | Grid |
| `row-cols-md-2` | 4 | Grid |
| `row-cols-xl-3` | 2 | Grid |
| `shadow-lg` | 1 | Shadows |
| `shadow-sm` | 42 | Shadows |
| `show` | 2 | Collapse/Tab state |
| `small` | 32 | Typography |
| `sticky-top` | 1 | Position |
| `stretched-link` | 9 | Helper |
| `tab-content` | 1 | Tabs |
| `tab-pane` | 3 | Tabs |
| `text-bg-light` | 5 | Colour helper |
| `text-bg-secondary` | 24 | Colour helper |
| `text-bg-warning` | 2 | Colour helper |
| `text-center` | 10 | Text |
| `text-decoration-none` | 36 | Text |
| `text-nowrap` | 1 | Text |
| `text-secondary` | 23 | Colours |
| `text-white` | 5 | Colours |
| `text-white-50` | 9 | Colours |
| `visually-hidden-focusable` | 1 | Helper |
| `w-100` | 1 | Sizing |

---

## Quick revision — the ten to remember

If you only memorise ten things from this file before a viva:

1. **`container` → `row` → `col-*`** is the layout chain, and the grid is 12 wide.
2. **`col-lg-6` means "half width **from** 992px up"** — mobile-first, applies upward.
3. **`row-cols-1 row-cols-md-2 row-cols-lg-3`** builds a whole responsive card grid in one line.
4. **`h-100` on cards** makes every card in a row equal height.
5. **`data-bs-toggle` = what behaviour, `data-bs-target` = which element.**
6. **`data-bs-parent`** is what makes an accordion an accordion instead of four collapses.
7. **`was-validated`** is the class that switches Bootstrap's form feedback on; `checkValidity()` is the browser's, not Bootstrap's.
8. **`<h3 class="h5">`** — the tag is meaning, the class is size.
9. **`text-bg-*`** sets background and readable foreground together.
10. **Override `--bs-*` variables instead of writing custom CSS** — that is how `btn-gold` exists in six lines.

---

*Every documentation link points to Bootstrap 5.3, the version this project loads. If you
search for help online, check the version — Bootstrap 4 used jQuery and `data-*` attributes
without the `bs` prefix, so its answers will not work here.*
