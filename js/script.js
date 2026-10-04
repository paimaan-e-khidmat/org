/* ============================================================
   Paimaan-e-Khidmat — site script
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Sliding underline that follows the hovered / active nav link (desktop only)
  const navLinks = document.querySelector(".nav-links");
  const underline = document.querySelector(".nav-underline");
  if (navLinks && underline) {
    const navAnchors = Array.from(navLinks.querySelectorAll("a"));
    const isDesktop = () => window.matchMedia("(min-width: 681px)").matches;

    function moveUnderlineTo(link) {
      if (!link || !isDesktop()) return;
      const linkRect = link.getBoundingClientRect();
      const navRect = navLinks.getBoundingClientRect();
      underline.style.left = (linkRect.left - navRect.left) + "px";
      underline.style.width = linkRect.width + "px";
      underline.style.opacity = "1";
    }

    function moveToActive() {
      const active = navLinks.querySelector("a.active") || navAnchors[0];
      moveUnderlineTo(active);
    }

    navAnchors.forEach(function (link) {
      link.addEventListener("mouseenter", function () { moveUnderlineTo(link); });
      link.addEventListener("focus", function () { moveUnderlineTo(link); });
    });
    navLinks.addEventListener("mouseleave", moveToActive);

    window.addEventListener("resize", moveToActive);

    // Recalculate once the webfont has swapped in, since that shifts text width
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(moveToActive);
    }
    window.addEventListener("load", moveToActive);
    moveToActive();
  }

  // Team page: department accordions
  const deptHeaders = document.querySelectorAll(".dept-header");
  deptHeaders.forEach(function (header) {
    const panel = header.nextElementSibling;
    header.addEventListener("click", function () {
      const isOpen = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", isOpen ? "false" : "true");
      if (isOpen) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
