/* ==========================================================================
   main.js — Lógica del portafolio (index.html)
   Lee el objeto DATOS de data.js y construye cada sección.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Utilidades ---------- */

  // Íconos SVG (trazos simples). La clave es el nombre usado en data.js.
  const ICONOS = {
    codigo: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    herramientas: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.6-.6-.6-2.6z"/>',
    ofimatica: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    cerebro: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="m6 7 3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/>',
    bandera: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
    mensaje: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    equipo: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    refrescar: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    correo: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    copiar: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    externo: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    premio: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13 7 22l5-3 5 3-1.2-9"/>',
    proyecto: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4"/>',
    semestre: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'
  };

  /** Devuelve un <svg> con el ícono pedido (o uno genérico). */
  function icono(nombre) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONOS[nombre] || ICONOS.check; // contenido fijo y confiable
    return svg;
  }

  /**
   * Crea un elemento de forma segura (el texto se asigna con textContent).
   * el("a", { href: "#", class: "btn" }, "Texto", otroNodo)
   */
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

  /** Un valor es "pendiente" si está vacío o empieza por [REEMPLAZAR. */
  function esPendiente(valor) {
    return !valor || String(valor).trim().startsWith("[REEMPLAZAR");
  }

  /** Quita la marca [REEMPLAZAR] de un texto para mostrarlo limpio. */
  function limpiar(texto) {
    return String(texto).replace(/\[REEMPLAZAR[^\]]*\]\s*/g, "").trim();
  }

  /** Enlace con estilo de botón; si la URL está pendiente queda desactivado. */
  function botonEnlace(texto, url, clase, nombreIcono) {
    if (esPendiente(url)) {
      return el("span", { class: clase, "aria-disabled": "true", title: "Disponible próximamente" },
        nombreIcono ? icono(nombreIcono) : null, texto + " (pronto)");
    }
    return el("a", { class: clase, href: url, target: "_blank", rel: "noopener noreferrer" },
      nombreIcono ? icono(nombreIcono) : null, texto,
      el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" }));
  }

  /**
   * Imagen con respaldo: si no hay ruta o la imagen falla al cargar,
   * se muestra un fondo generado con un ícono y un texto.
   */
  function imagenConRespaldo(src, alt, textoRespaldo, iconoRespaldo) {
    const respaldo = () => el("div", { class: "media-fallback", role: "img", "aria-label": alt },
      icono(iconoRespaldo), el("span", { text: textoRespaldo }));
    if (!src) return respaldo();
    const img = el("img", { alt: alt, loading: "lazy", decoding: "async" });
    img.addEventListener("error", () => img.replaceWith(respaldo()), { once: true });
    img.src = src;
    return img;
  }

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel) => document.querySelector(sel);

  /* ---------- Tema claro / oscuro (persistente) ---------- */
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

  /* ---------- Hero ---------- */
  function renderHero() {
    const p = DATOS.perfil;
    const partes = p.nombre.split(" ");
    const apellido = partes.pop();
    const nombre = $("#hero-nombre");
    nombre.append(partes.join(" ") + " ", el("span", { class: "grad", text: apellido }));
    $("#hero-titulo").textContent = p.titulo;
    $("#frases-sr").textContent = p.frases.join(". ");

    // Foto con respaldo de iniciales
    const marco = $("#hero-foto");
    const iniciales = p.nombre.split(" ").map((x) => x[0]).join("").slice(0, 2);
    const respaldo = () => el("div", { class: "photo-fallback", role: "img", "aria-label": "Iniciales de " + p.nombre }, iniciales);
    if (p.foto) {
      const img = el("img", { alt: "Foto de " + p.nombre, width: "300", height: "300" });
      img.addEventListener("error", () => img.replaceWith(respaldo()), { once: true });
      img.src = p.foto;
      marco.append(img);
    } else {
      marco.append(respaldo());
    }
  }

  /** Efecto máquina de escribir que recorre las frases en bucle. */
  function iniciarEscritura() {
    const destino = $("#typing-text");
    const frases = DATOS.perfil.frases;
    if (reducirMovimiento) { destino.textContent = frases[0]; return; }

    let fi = 0, ci = 0, borrando = false;
    function paso() {
      const frase = frases[fi];
      ci += borrando ? -1 : 1;
      destino.textContent = frase.slice(0, ci);
      let espera = borrando ? 35 : 70;
      if (!borrando && ci === frase.length) { borrando = true; espera = 1800; }
      else if (borrando && ci === 0) { borrando = false; fi = (fi + 1) % frases.length; espera = 400; }
      setTimeout(paso, espera);
    }
    paso();
  }

  /** Fondo animado: red de nodos conectados en un <canvas>. */
  function iniciarRedNodos() {
    const canvas = $("#red-nodos");
    const ctx = canvas.getContext("2d");
    const hero = $("#inicio");
    let nodos = [], ancho = 0, alto = 0, visible = true, raf = null;
    const DIST = 140; // distancia máxima para dibujar una conexión
    const mouse = { x: -9999, y: -9999 };

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = hero.clientWidth; alto = hero.clientHeight;
      canvas.width = ancho * dpr; canvas.height = alto * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cantidad = Math.round(Math.min(90, (ancho * alto) / 16000));
      nodos = Array.from({ length: cantidad }, () => ({
        x: Math.random() * ancho, y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 1
      }));
    }

    function dibujar() {
      const rgb = getComputedStyle(document.documentElement).getPropertyValue("--node").trim() || "0,217,255";
      ctx.clearRect(0, 0, ancho, alto);
      for (const n of nodos) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > ancho) n.vx *= -1;
        if (n.y < 0 || n.y > alto) n.vy *= -1;
      }
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < DIST) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / DIST) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // Conexión con el puntero
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < DIST * 1.3) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - dm / (DIST * 1.3)) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${rgb},0.85)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    function bucle() {
      dibujar();
      raf = visible && !document.hidden ? requestAnimationFrame(bucle) : null;
    }
    function reanudar() { if (!raf && visible && !document.hidden && !reducirMovimiento) raf = requestAnimationFrame(bucle); }

    redimensionar();
    if (reducirMovimiento) { dibujar(); }
    else { reanudar(); }

    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => { redimensionar(); if (reducirMovimiento) dibujar(); }, 150);
    });
    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    // Pausa la animación cuando el hero no se ve o la pestaña está oculta
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; reanudar(); }).observe(hero);
    document.addEventListener("visibilitychange", reanudar);
  }

  /* ---------- Sobre mí y contadores ---------- */
  function renderSobreMi() {
    $("#sobre-texto").textContent = DATOS.perfil.sobreMi;
    const proyectosReales = DATOS.proyectos.filter((p) => !p.ejemplo).length;
    const stats = [
      { valor: DATOS.certificados.length, sufijo: "", texto: "certificados", icono: "premio" },
      { valor: proyectosReales, sufijo: "", texto: "proyectos", icono: "proyecto" },
      { valor: DATOS.perfil.semestre, sufijo: "to", texto: "semestre", icono: "semestre" }
    ];
    const lista = $("#estadisticas");
    for (const s of stats) {
      const num = el("span", { class: "stat__num grad", "data-objetivo": s.valor, "data-sufijo": s.sufijo }, "0" + s.sufijo);
      lista.append(el("li", { class: "card stat" },
        el("span", { class: "icon-badge" }, icono(s.icono)),
        el("div", null, num, el("div", { class: "stat__label", text: s.texto }))));
    }
  }

  /** Anima un número desde 0 hasta su objetivo. */
  function animarContador(nodo) {
    const objetivo = Number(nodo.dataset.objetivo);
    const sufijo = nodo.dataset.sufijo || "";
    if (reducirMovimiento) { nodo.textContent = objetivo + sufijo; return; }
    const duracion = 1400, inicio = performance.now();
    function cuadro(ahora) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const suave = 1 - Math.pow(1 - t, 3);
      nodo.textContent = Math.round(objetivo * suave) + sufijo;
      if (t < 1) requestAnimationFrame(cuadro);
    }
    requestAnimationFrame(cuadro);
  }

  /* ---------- Habilidades ---------- */
  function renderHabilidades() {
    const tecnicas = $("#hab-tecnicas");
    for (const grupo of DATOS.habilidadesTecnicas) {
      tecnicas.append(el("article", { class: "card skill-card reveal" },
        el("div", { class: "skill-card__head" },
          el("span", { class: "icon-badge" }, icono(grupo.icono)),
          el("h4", { text: grupo.categoria })),
        el("ul", { class: "chips" }, ...grupo.items.map((i) => el("li", { class: "chip", text: i })))));
    }

    const blandas = $("#hab-blandas");
    for (const h of DATOS.habilidadesBlandas) {
      blandas.append(el("li", { class: "card soft reveal" },
        el("span", { class: "icon-badge" }, icono(h.icono)), h.nombre));
    }

    const idiomas = $("#idiomas");
    for (const i of DATOS.idiomas) {
      const barra = el("div", {
        class: "bar", role: "progressbar", "aria-label": "Nivel de " + i.idioma,
        "aria-valuenow": i.porcentaje, "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuetext": i.nivel
      }, el("div", { class: "bar__fill" }));
      barra.firstChild.style.setProperty("--valor", i.porcentaje + "%");
      idiomas.append(el("li", { class: "card lang reveal" },
        el("div", { class: "lang__row" }, el("span", { text: i.idioma }), el("span", { text: i.nivel })),
        barra));
    }
  }

  /* ---------- Filtros reutilizables ---------- */
  /**
   * Crea botones de filtro. Cada opción: { etiqueta, valor }.
   * alCambiar(valor) se llama al pulsar uno.
   */
  function crearFiltros(contenedor, opciones, alCambiar) {
    const botones = opciones.map((op, i) => {
      const b = el("button", { type: "button", class: "filter-btn", "aria-pressed": i === 0 ? "true" : "false", text: op.etiqueta });
      b.addEventListener("click", () => {
        botones.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        alCambiar(op.valor);
      });
      return b;
    });
    contenedor.append(...botones);
  }

  /* ---------- Proyectos ---------- */
  function renderProyectos() {
    const lista = $("#lista-proyectos");
    const tarjetas = DATOS.proyectos.map((p) => {
      const titulo = limpiar(p.titulo) || "Proyecto";
      const tarjeta = el("article", { class: "card project reveal" + (p.ejemplo ? " project--ejemplo" : "") },
        el("div", { class: "project__media" },
          imagenConRespaldo(p.imagen, "Vista previa de " + titulo, titulo, p.ejemplo ? "proyecto" : "codigo")),
        el("div", { class: "project__body" },
          el("h3", { text: titulo }),
          el("p", { text: p.descripcion }),
          el("ul", { class: "tags", "aria-label": "Tecnologías" }, ...p.tecnologias.map((t) => el("li", { class: "tag", text: t }))),
          el("div", { class: "project__links" },
            botonEnlace("Ver demo", p.demo, "btn btn--primary btn--sm", "externo"),
            botonEnlace("Ver código", p.codigo, "btn btn--ghost btn--sm", "github"))));
      tarjeta._tecnologias = p.tecnologias;
      tarjeta._ejemplo = !!p.ejemplo;
      lista.append(tarjeta);
      return tarjeta;
    });

    // Filtros: todas las tecnologías de los proyectos reales, sin repetir
    const tecnologias = [...new Set(DATOS.proyectos.filter((p) => !p.ejemplo).flatMap((p) => p.tecnologias))];
    const opciones = [{ etiqueta: "Todos", valor: null }, ...tecnologias.map((t) => ({ etiqueta: t, valor: t }))];
    crearFiltros($("#filtros-proyectos"), opciones, (valor) => {
      tarjetas.forEach((t) => {
        const mostrar = valor === null || (!t._ejemplo && t._tecnologias.includes(valor));
        t.classList.toggle("is-hidden", !mostrar);
        if (mostrar) t.classList.add("is-visible");
      });
    });
  }

  /* ---------- Certificados + lightbox ---------- */
  const NOMBRE_CATEGORIA = { cisco: "Cisco", aws: "AWS / IA" };

  function renderCertificados() {
    const lista = $("#lista-certificados");
    const items = DATOS.certificados.map((c, indice) => {
      const boton = el("button", { type: "button", class: "card cert__btn", "aria-label": "Ver certificado: " + c.titulo },
        el("div", { class: "cert__thumb" },
          imagenConRespaldo(c.imagen, "", c.institucion, "premio"),
          el("span", { class: "cert__badge", text: NOMBRE_CATEGORIA[c.categoria] || c.categoria })),
        el("div", { class: "cert__body" },
          el("strong", { text: c.titulo }),
          el("span", { class: "cert__meta", text: c.institucion + " · " + c.fecha })));
      boton.addEventListener("click", () => abrirLightbox(indice));
      const li = el("li", { class: "cert reveal" }, boton);
      li._categoria = c.categoria;
      li._indice = indice;
      lista.append(li);
      return li;
    });

    crearFiltros($("#filtros-certificados"), [
      { etiqueta: "Todos", valor: null },
      { etiqueta: "Cisco", valor: "cisco" },
      { etiqueta: "AWS / IA", valor: "aws" }
    ], (valor) => {
      items.forEach((li) => {
        const mostrar = valor === null || li._categoria === valor;
        li.classList.toggle("is-hidden", !mostrar);
        if (mostrar) li.classList.add("is-visible");
      });
    });

    iniciarLightbox(items);
  }

  let abrirLightbox = () => {};

  function iniciarLightbox(items) {
    const dialogo = $("#lightbox");
    let actual = 0;

    // Solo se navega entre los certificados visibles con el filtro actual
    const visibles = () => items.filter((li) => !li.classList.contains("is-hidden")).map((li) => li._indice);

    function mostrar(indice) {
      actual = indice;
      const c = DATOS.certificados[indice];
      $("#lb-titulo").textContent = c.titulo;

      const media = $("#lb-media");
      media.replaceChildren(imagenConRespaldo(c.imagen, "Certificado: " + c.titulo, c.institucion, "premio"));

      const datos = $("#lb-datos");
      datos.replaceChildren();
      const filas = [["Institución", c.institucion], ["Fecha", c.fecha], ["Duración", c.duracion], ["Cert ID", c.certId]];
      for (const [k, v] of filas) {
        if (v) datos.append(el("div", null, el("dt", { text: k }), el("dd", { text: v })));
      }
      if (c.pdf) {
        datos.append(el("div", null, el("dt", { text: "Original" }),
          el("dd", null, el("a", { href: c.pdf, target: "_blank", rel: "noopener" }, "Ver PDF del certificado"))));
      }

      const lista = visibles();
      const pos = lista.indexOf(indice);
      $("#lb-contador").textContent = (pos + 1) + " / " + lista.length;
      $("#lb-prev").disabled = $("#lb-next").disabled = lista.length < 2;
    }

    function mover(delta) {
      const lista = visibles();
      const pos = lista.indexOf(actual);
      mostrar(lista[(pos + delta + lista.length) % lista.length]);
    }

    abrirLightbox = (indice) => {
      mostrar(indice);
      if (typeof dialogo.showModal === "function") dialogo.showModal();
      else dialogo.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    };

    function cerrar() { dialogo.close ? dialogo.close() : dialogo.removeAttribute("open"); }

    dialogo.addEventListener("close", () => {
      document.body.style.overflow = "";
      // Devuelve el foco a la miniatura del certificado que se estaba viendo
      const li = items.find((x) => x._indice === actual);
      if (li) li.querySelector("button").focus();
    });
    $("#lb-cerrar").addEventListener("click", cerrar);
    $("#lb-prev").addEventListener("click", () => mover(-1));
    $("#lb-next").addEventListener("click", () => mover(1));
    dialogo.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") mover(-1);
      if (e.key === "ArrowRight") mover(1);
    });
    // Clic fuera de la caja (sobre el fondo) cierra
    dialogo.addEventListener("click", (e) => { if (e.target === dialogo) cerrar(); });
  }

  /* ---------- Línea de tiempo ---------- */
  function renderTrayectoria() {
    const exp = $("#linea-experiencia");
    for (const e of DATOS.experiencia) {
      exp.append(el("li", { class: "timeline__item reveal" },
        el("div", { class: "card timeline__card" },
          el("span", { class: "timeline__date", text: e.periodo }),
          el("h4", { text: e.cargo }),
          el("p", { class: "timeline__org", text: e.organizacion }),
          el("ul", null, ...e.tareas.map((t) => el("li", { text: t }))))));
    }
    const edu = $("#linea-educacion");
    for (const e of DATOS.educacion) {
      edu.append(el("li", { class: "timeline__item reveal" },
        el("div", { class: "card timeline__card" },
          el("span", { class: "timeline__date", text: e.estado }),
          el("h4", { text: e.titulo }),
          el("p", { class: "timeline__org", text: e.institucion }))));
    }
    exp.classList.add("reveal-line");
    edu.classList.add("reveal-line");
  }

  /* ---------- Contacto ---------- */
  function renderContacto() {
    const p = DATOS.perfil;
    const cont = $("#contacto-lista");

    const copiar = el("button", { type: "button", class: "icon-btn", "aria-label": "Copiar correo" }, icono("copiar"));
    copiar.addEventListener("click", () => copiarTexto(p.correo));
    cont.append(el("div", { class: "card contact reveal" },
      el("span", { class: "icon-badge" }, icono("correo")),
      el("div", { class: "contact__info" },
        el("span", { class: "contact__label", text: "Correo" }),
        el("a", { class: "contact__value", href: "mailto:" + p.correo, text: p.correo })),
      copiar));

    const redes = [
      { nombre: "GitHub", url: p.github, icono: "github" },
      { nombre: "LinkedIn", url: p.linkedin, icono: "linkedin" }
    ];
    for (const r of redes) {
      const valor = esPendiente(r.url)
        ? el("span", { class: "contact__value is-pending", text: "Próximamente" })
        : el("a", { class: "contact__value", href: r.url, target: "_blank", rel: "noopener noreferrer" },
            r.url.replace(/^https?:\/\/(www\.)?/, ""),
            el("span", { class: "sr-only", text: " (se abre en una pestaña nueva)" }));
      cont.append(el("div", { class: "card contact reveal" },
        el("span", { class: "icon-badge" }, icono(r.icono)),
        el("div", { class: "contact__info" }, el("span", { class: "contact__label", text: r.nombre }), valor)));
    }
  }

  function mostrarAviso(texto) {
    const toast = $("#toast");
    toast.textContent = texto;
    toast.classList.add("is-shown");
    clearTimeout(mostrarAviso._t);
    mostrarAviso._t = setTimeout(() => toast.classList.remove("is-shown"), 2200);
  }

  function copiarTexto(texto) {
    const ok = () => mostrarAviso("Correo copiado: " + texto);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, () => copiaAlternativa(texto, ok));
    } else {
      copiaAlternativa(texto, ok);
    }
  }

  // Respaldo para navegadores sin API de portapapeles
  function copiaAlternativa(texto, ok) {
    const area = el("textarea", { readonly: true, style: "position:fixed;opacity:0" });
    area.value = texto;
    document.body.append(area);
    area.select();
    try { document.execCommand("copy"); ok(); } catch (e) { mostrarAviso("No se pudo copiar. Correo: " + texto); }
    area.remove();
  }

  /* ---------- Navegación ---------- */
  function iniciarNavegacion() {
    const navbar = $("#navbar");
    const menu = $("#menu");
    const toggle = $("#menu-toggle");
    const enlaces = [...document.querySelectorAll('.nav-link[href^="#"]')];

    function cerrarMenu() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }
    toggle.addEventListener("click", () => {
      const abierto = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) cerrarMenu(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { cerrarMenu(); toggle.focus(); }
    });

    // Sombra de la barra y botón "volver arriba"
    const arriba = $("#volver-arriba");
    function alDesplazar() {
      navbar.classList.toggle("is-scrolled", window.scrollY > 10);
      arriba.classList.toggle("is-shown", window.scrollY > 600);
    }
    window.addEventListener("scroll", alDesplazar, { passive: true });
    alDesplazar();
    arriba.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reducirMovimiento ? "auto" : "smooth" });
      $(".navbar__logo").focus({ preventScroll: true });
    });

    // Resalta en la barra la sección que está en pantalla
    const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const espia = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        enlaces.forEach((a) => {
          const activo = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("is-active", activo);
          if (activo) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    secciones.forEach((s) => espia.observe(s));
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  function iniciarReveal() {
    const objetivos = document.querySelectorAll(".reveal, .reveal-line, .stat__num");
    if (!("IntersectionObserver" in window)) {
      objetivos.forEach((o) => o.classList.add("is-visible"));
      document.querySelectorAll(".stat__num").forEach(animarContador);
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        if (e.target.classList.contains("stat__num")) animarContador(e.target);
        obs.unobserve(e.target);
      }
    }, { threshold: 0.15 });
    objetivos.forEach((o) => obs.observe(o));
  }

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    renderHero();
    renderSobreMi();
    renderHabilidades();
    renderProyectos();
    renderCertificados();
    renderTrayectoria();
    renderContacto();
    $("#anio").textContent = new Date().getFullYear();
    iniciarNavegacion();
    iniciarReveal();
    iniciarEscritura();
    iniciarRedNodos();
  });
})();
