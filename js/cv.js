/* ==========================================================================
   cv.js — Construye la hoja de vida web (cv.html) a partir de data.js
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  /** Crea un elemento; el texto se asigna con textContent (seguro). */
  function el(tag, attrs, ...hijos) {
    const nodo = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") nodo.className = v;
      else if (k === "text") nodo.textContent = v;
      else nodo.setAttribute(k, v === true ? "" : v);
    }
    for (const h of hijos) {
      if (h === null || h === undefined) continue;
      nodo.append(typeof h === "string" ? document.createTextNode(h) : h);
    }
    return nodo;
  }

  const esPendiente = (v) => !v || String(v).trim().startsWith("[REEMPLAZAR");

  /* ---------- Tema compartido con el portafolio ---------- */
  function iniciarTema() {
    const raiz = document.documentElement;
    const boton = document.querySelector(".theme-toggle");
    const meta = document.querySelector('meta[name="theme-color"]');
    function aplicar(tema) {
      raiz.setAttribute("data-theme", tema);
      boton.setAttribute("aria-label", tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      if (meta) meta.setAttribute("content", tema === "dark" ? "#070b14" : "#f4f7fc");
    }
    aplicar(raiz.getAttribute("data-theme") === "light" ? "light" : "dark");
    boton.addEventListener("click", () => {
      const nuevo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
      aplicar(nuevo);
      try { localStorage.setItem("fc-tema", nuevo); } catch (e) { /* sin almacenamiento */ }
    });
  }

  /* ---------- Encabezado ---------- */
  function renderEncabezado() {
    const p = DATOS.perfil;
    $("#cv-nombre").textContent = p.nombre;
    $("#cv-titulo").textContent = p.titulo;

    const marco = $("#cv-foto");
    const iniciales = p.nombre.split(" ").map((x) => x[0]).join("").slice(0, 2);
    const respaldo = () => el("div", { class: "photo-fallback", role: "img", "aria-label": "Iniciales de " + p.nombre }, iniciales);
    if (p.foto) {
      const img = el("img", { alt: "Foto de " + p.nombre, width: "120", height: "120" });
      img.addEventListener("error", () => img.replaceWith(respaldo()), { once: true });
      img.src = p.foto;
      marco.append(img);
    } else {
      marco.append(respaldo());
    }

    // Solo datos públicos: correo y perfiles (sin teléfono, dirección, etc.)
    const contacto = $("#cv-contacto");
    const filas = [
      ["Correo", p.correo, "mailto:" + p.correo],
      ["GitHub", p.github.replace(/^https?:\/\//, ""), p.github],
      ["LinkedIn", p.linkedin.replace(/^https?:\/\/(www\.)?/, ""), p.linkedin]
    ];
    for (const [etiqueta, texto, url] of filas) {
      if (esPendiente(url) || esPendiente(texto)) continue;
      contacto.append(el("li", null, el("span", { text: etiqueta + ":" }), el("a", { href: url, text: texto })));
    }
  }

  /* ---------- Cuerpo ---------- */
  function renderCuerpo() {
    $("#cv-sobre").textContent = DATOS.perfil.sobreMi;

    const exp = $("#cv-experiencia");
    for (const e of DATOS.experiencia) {
      exp.append(el("article", { class: "cv-item" },
        el("div", { class: "cv-item__head" }, el("h3", { text: e.cargo }), el("span", { class: "cv-item__date", text: e.periodo })),
        el("p", { class: "cv-item__org", text: e.organizacion }),
        el("ul", null, ...e.tareas.map((t) => el("li", { text: t })))));
    }

    const edu = $("#cv-educacion");
    for (const e of DATOS.educacion) {
      edu.append(el("article", { class: "cv-item" },
        el("div", { class: "cv-item__head" }, el("h3", { text: e.titulo }), el("span", { class: "cv-item__date", text: e.estado })),
        el("p", { class: "cv-item__org", text: e.institucion })));
    }

    const certs = $("#cv-certificados");
    for (const c of DATOS.certificados) {
      certs.append(el("li", null,
        el("strong", { text: c.titulo }),
        el("span", { text: c.institucion + " · " + c.fecha })));
    }

    const tec = $("#cv-tecnicas");
    for (const g of DATOS.habilidadesTecnicas) {
      tec.append(el("div", { class: "cv-group" }, el("h3", { text: g.categoria }), el("p", { text: g.items.join(", ") })));
    }

    const blandas = $("#cv-blandas");
    DATOS.habilidadesBlandas.forEach((h) => blandas.append(el("li", { text: h.nombre })));

    const idiomas = $("#cv-idiomas");
    DATOS.idiomas.forEach((i) => idiomas.append(el("li", null, el("strong", { text: i.idioma }), " — " + i.nivel)));
  }

  /* ---------- Botones de la barra ---------- */
  function iniciarAcciones() {
    $("#btn-imprimir").addEventListener("click", () => window.print());

    const descargar = $("#btn-descargar");
    const ruta = DATOS.perfil.cvPdf;
    if (ruta) {
      descargar.setAttribute("href", ruta);
    } else {
      // Aún no hay PDF subido: se ofrece guardar esta misma hoja como PDF
      descargar.removeAttribute("download");
      descargar.addEventListener("click", (e) => {
        e.preventDefault();
        avisar("Elige “Guardar como PDF” en el diálogo de impresión.");
        setTimeout(() => window.print(), 400);
      });
    }
  }

  function avisar(texto) {
    const toast = $("#toast");
    toast.textContent = texto;
    toast.classList.add("is-shown");
    setTimeout(() => toast.classList.remove("is-shown"), 3000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    renderEncabezado();
    renderCuerpo();
    iniciarAcciones();
  });
})();
