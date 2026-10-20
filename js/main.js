// =========================================================
// ESTUDIO ZOU — Interacciones
// =========================================================
"use strict";

/* ---------- Cada página abre desde arriba ----------
   Al pasar a otra página (navbar, globos, "Seguí por", footer) el navegador
   puede conservar el scroll anterior. Acá la página arranca siempre arriba,
   salvo que el enlace apunte a una sección (por ejemplo, servicios.html#faqs). */
(function () {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  function goToStart() {
    var target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  goToStart();
  // Segunda pasada cuando terminan de cargar fotos y videos, por si algo movió la página
  window.addEventListener("load", goToStart, { once: true });
})();

/* ---------- Navbar: menú plegable en celular ---------- */
(function () {
  var navbar = document.getElementById("navbar");
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!navbar || !toggle || !menu) return;

  function setOpen(isOpen) {
    navbar.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", function () {
    setOpen(!navbar.classList.contains("is-open"));
  });

  // Al elegir un enlace (por ejemplo "Escribime", que baja a #contacto) se cierra el menú
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navbar.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Si la pantalla se agranda, el menú vuelve a su estado normal
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (mq) {
    if (mq.matches) setOpen(false);
  });
})();

/* ---------- Contacto: mail con asunto y mensaje prearmados ---------- */
(function () {
  var mail = document.getElementById("mail-link");
  if (!mail) return;

  var message = "Hola! Vengo desde tu web y quiero que nos juntemos para encarar el proyecto de mi emprendimiento. ¿Cuándo podrías?";
  mail.href = "mailto:zoulaliancamila@gmail.com?subject=" + encodeURIComponent("Quiero encarar un proyecto web") +
    "&body=" + encodeURIComponent(message);
})();

/* ---------- Proyectos: video al pasar el mouse (o al verlo en celular) ---------- */
(function () {
  var projects = document.querySelectorAll(".project");
  var canHover = window.matchMedia("(hover: hover)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasObserver = "IntersectionObserver" in window;

  function preload(video) {
    if (video.preload !== "auto") {
      video.preload = "auto";
      video.load();
    }
  }

  function play(card, video) {
    preload(video);
    var attempt = video.play();
    if (attempt && attempt.catch) {
      attempt.catch(function () {
        video.load();
        video.play().catch(function () { });
      });
    }
    card.classList.add("is-playing");
  }

  function stop(card, video, rewind) {
    video.pause();
    if (rewind) {
      try { video.currentTime = 0; } catch (e) { }
    }
    card.classList.remove("is-playing");
  }

  // Precarga los videos cuando la sección está por aparecer
  var nearViewport = hasObserver
    ? new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var video = entry.target.querySelector("video");
        if (video) preload(video);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "400px 0px" })
    : null;

  projects.forEach(function (card) {
    var video = card.querySelector("video");
    if (!video) return;

    if (nearViewport) nearViewport.observe(card);
    else preload(video);

    if (canHover) {
      card.addEventListener("mouseenter", function () { play(card, video); });
      card.addEventListener("mouseleave", function () { stop(card, video, true); });
      card.addEventListener("focusin", function () { play(card, video); });
      card.addEventListener("focusout", function () { stop(card, video, true); });
    } else if (!reduceMotion && hasObserver) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.6) play(card, video);
          else stop(card, video, false);
        });
      }, { threshold: [0, 0.6] }).observe(card);
    }
  });
})();

/* ---------- Secciones que aparecen al hacer scroll ---------- */
(function () {
  var slides = document.querySelectorAll(".slide");

  if (!("IntersectionObserver" in window)) {
    slides.forEach(function (slide) { slide.classList.add("in-view"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  slides.forEach(function (slide) { observer.observe(slide); });
})();
