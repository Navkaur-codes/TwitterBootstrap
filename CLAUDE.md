# CLAUDE.md

## Project Rules

### Reference Website — MUST FOLLOW

The existing GNDEC website is the primary reference for institutional content and information:

**https://www.gndec.ac.in/**

Use the reference website to verify:

* Existing GNDEC content
* Navigation structure
* Academic information
* Departments
* Admissions
* Notices and announcements
* Contact information
* Official links
* Institutional branding

**Redesign the presentation, not the facts.**

Do not copy the existing design blindly. The frontend should be improved while keeping verified institutional information accurate.

---

### Technology — MUST FOLLOW

Use only:

* HTML5
* CSS3
* Twitter Bootstrap 5
* Bootstrap Icons
* Vanilla JavaScript when required
* SweetAlert2 when genuinely necessary

Do NOT use:

* React
* Next.js
* Vue
* Angular
* Tailwind CSS
* Material UI
* Other frontend frameworks or unnecessary libraries

---

### Frontend Only — MUST FOLLOW

This project is **frontend only**.

Do NOT implement:

* Backend
* Database
* Authentication
* APIs
* Server-side functionality

Forms and interactive features must be frontend/demo implementations only.

---

### Code Simplicity — MUST FOLLOW

The developer is learning HTML, CSS and Bootstrap.

Always prefer:

* Simple HTML
* Simple CSS
* Bootstrap utilities/components
* Straightforward Vanilla JavaScript
* Easy-to-understand code

Avoid unnecessary:

* Abstractions
* Complex JavaScript
* Libraries
* Over-engineering
* Duplicate code

Do not write custom CSS when Bootstrap already provides a suitable solution.

---

### Bootstrap — MUST FOLLOW

Use **Twitter Bootstrap 5** as the primary layout and responsive framework.

Prefer Bootstrap for:

* Grid/layout
* Responsive design
* Spacing
* Flex utilities
* Navbar
* Dropdowns
* Buttons
* Cards
* Forms
* Modals
* Alerts
* Other suitable components

Use custom CSS only when Bootstrap cannot reasonably achieve the required design or when custom branding/styling is needed.

---

### Learning-Friendly Code — MUST FOLLOW

This is a learning project.

When introducing an important Bootstrap concept for the first time, add a **short HTML comment** explaining the relevant class/component.

Do not add excessive comments.

Keep Bootstrap usage understandable to a beginner.

---

### SweetAlert2 — USE SPARINGLY

Use SweetAlert2 only when it provides meaningful user feedback or confirmation.

Do NOT use it for ordinary navigation or decorative interactions.

Use Bootstrap alerts/toasts when they are more appropriate.

---

### Content Accuracy — MUST FOLLOW

Never fabricate GNDEC institutional information.

Do not invent:

* Statistics
* Rankings
* Placement figures
* Courses
* Faculty information
* Awards
* Testimonials
* Contact information
* Other institutional facts

Use verified information from the reference website or clearly marked placeholders.

---

### Accessibility — MUST FOLLOW

Use:

* Semantic HTML
* Proper heading hierarchy
* Meaningful `alt` text
* Accessible buttons and forms
* Good color contrast
* Keyboard-friendly navigation

---

### Performance — MUST FOLLOW

Keep the frontend lightweight.

Avoid:

* Unnecessary dependencies
* Huge/unoptimized images
* Excessive JavaScript
* Duplicate CSS
* Unused libraries

Prefer CSS animations/transitions over animation libraries.

### Target Visitors — MUST FOLLOW

The primary target audience is **Indian college students**, especially:

* Current GNDEC students
* Prospective students
* Students exploring courses and admissions
* Students looking for notices, events and academic information
* Parents of prospective students

Secondary visitors include:

* Faculty and staff
* Alumni
* Researchers
* Industry visitors

Design and usability should prioritize **students first**.

Use clear language, intuitive navigation, mobile-friendly layouts, readable typography and easy access to student-relevant information.


---

## Core Rule

> **Keep the implementation simple, frontend-only, Bootstrap-based, responsive, accessible and easy for a student to understand.**
