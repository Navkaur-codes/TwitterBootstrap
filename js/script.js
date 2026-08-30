/* ==========================================================================
   GNDEC Redesign — vanilla JavaScript
   Four small features only. Bootstrap's own bundle handles the navbar
   collapse, dropdown, tabs, accordion and scrollspy on its own.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Reveal elements as they scroll into view.
   IntersectionObserver tells us when an element enters the screen. It is
   much cheaper than listening to every scroll event.
   -------------------------------------------------------------------------- */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // If this element is a stat number, run the count-up once.
        if (entry.target.dataset.count) {
          countUp(entry.target);
        }

        // Animate each element only once.
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});

/* Safety net: content must never stay invisible.
   If nothing has been revealed shortly after the page loads (for example in a
   browser where IntersectionObserver does not run), simply show everything. */
window.addEventListener("load", function () {
  setTimeout(function () {
    if (document.querySelectorAll(".reveal.is-visible").length === 0) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
        if (item.dataset.count) {
          countUp(item);
        }
      });
    }
  }, 500);
});

/* --------------------------------------------------------------------------
   2. Count-up animation for the statistics section.
   Reads the target number from data-count and steps towards it.
   -------------------------------------------------------------------------- */

function countUp(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const steps = 40;
  let current = 0;

  const timer = setInterval(function () {
    current += target / steps;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent = Math.round(current).toLocaleString("en-IN") + suffix;
  }, 25);
}

/* --------------------------------------------------------------------------
   3. Give the navbar a shadow once the page is scrolled.
   -------------------------------------------------------------------------- */

const navbar = document.querySelector(".site-navbar");
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {
  const scrolled = window.scrollY > 80;

  navbar.classList.toggle("navbar-scrolled", scrolled);
  backToTop.classList.toggle("show", window.scrollY > 400);
});

/* --------------------------------------------------------------------------
   4. On phones, close the collapsed menu after a link is tapped,
   otherwise the open menu keeps covering the section the user jumped to.
   -------------------------------------------------------------------------- */

const navMenu = document.querySelector("#navMenu");

navMenu.querySelectorAll("a[href^='#']").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

/* --------------------------------------------------------------------------
   5. Contact form: Bootstrap validation + a SweetAlert2 confirmation.
   This is a demo form only — nothing is sent anywhere.
   -------------------------------------------------------------------------- */

const enquiryForm = document.querySelector("#enquiryForm");

enquiryForm.addEventListener("submit", function (event) {
  // Always stop the browser's default submit, since there is no server.
  event.preventDefault();

  // checkValidity() uses the HTML required / type="email" rules.
  if (!enquiryForm.checkValidity()) {
    // Adding .was-validated makes Bootstrap show the green/red feedback.
    enquiryForm.classList.add("was-validated");
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Enquiry received",
    text: "This is a demo form, so nothing was actually sent. For a real enquiry please call 0161-5064704 or email principal@gndec.ac.in.",
    confirmButtonColor: "#0b2545",
  });

  enquiryForm.reset();
  enquiryForm.classList.remove("was-validated");
});
