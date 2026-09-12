(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // YouTube facades: load the privacy-friendly embed only after a click
  document.querySelectorAll(".video-card[data-yt]").forEach(function (card) {
    var btn = card.querySelector(".video-play");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var id = card.getAttribute("data-yt");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = card.querySelector(".video-meta strong") ? card.querySelector(".video-meta strong").textContent : "Video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      card.replaceChild(iframe, btn);
    });
  });

  // Google Maps facade: load the embed only after a click
  var mapFacade = document.getElementById("mapFacade");
  var mapEmbed = document.getElementById("mapEmbed");
  if (mapFacade && mapEmbed) {
    mapFacade.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps?q=" +
        encodeURIComponent("Boxe Club Nichelino Team Grandelli, Via Filippo Turati 12, 10042 Nichelino TO") +
        "&output=embed";
      iframe.loading = "lazy";
      iframe.title = "Mappa: Boxe Club Nichelino, Via Filippo Turati 12, Nichelino";
      mapEmbed.appendChild(iframe);
      mapEmbed.hidden = false;
      mapFacade.hidden = true;
    });
  }
})();
