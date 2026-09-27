/* ==========================================================================
   Breakthrough Author Live — Landing Page Behavior
   ========================================================================== */

/**
 * CONFIGURABLE CHECKOUT URL
 * -------------------------
 * Every "Join the Challenge" button on the page has the class "js-cta".
 * Replace the value below with your real checkout link (e.g. the GHL order
 * form showing $950 with the coupon code applied to drop to $47), and every
 * button will automatically point there. Until it's replaced, the buttons
 * link to the #checkout section at the bottom of the page.
 */
const CHECKOUT_URL = "#checkout";

document.addEventListener("DOMContentLoaded", () => {
  // Wire up every CTA button to the single configurable checkout URL.
  document.querySelectorAll(".js-cta").forEach((el) => {
    el.setAttribute("href", CHECKOUT_URL);
    if (CHECKOUT_URL !== "#checkout") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });
  }

  // Video placeholder: clicking the play button is a no-op until a real
  // video embed is added, but we give clear feedback so it never feels broken.
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      const label = playBtn.parentElement.querySelector(".video-frame__label");
      if (label) label.textContent = "Video coming soon — check back shortly";
    });
  }

  // Sticky mobile CTA: show once the hero has been scrolled past.
  const stickyCta = document.getElementById("stickyCta");
  const hero = document.querySelector(".hero");
  if (stickyCta && hero && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(hero);
  }

  // Close mobile nav on Escape for keyboard users
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle && navToggle.getAttribute("aria-expanded") === "true") {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      navToggle.focus();
    }
  });
});
