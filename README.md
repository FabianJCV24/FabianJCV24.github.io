# Portafolio de Fabián Cedeño

Portafolio personal estático (HTML5, CSS3 y JavaScript puro) publicado con GitHub Pages en
**https://fabianjcv24.github.io**.

## Estructura

```
FabianJCV24.github.io/
├── index.html            → Portafolio (una sola página con todas las secciones)
├── cv.html               → Hoja de vida web, lista para imprimir
├── css/
│   ├── styles.css        → Estilos generales y variables de tema (claro/oscuro)
│   └── cv.css            → Estilos de la hoja de vida y de impresión (A4)
├── js/
│   ├── data.js           → ⭐ TODA la información (perfil, habilidades, proyectos, certificados…)
│   ├── main.js           → Construye index.html a partir de data.js
│   └── cv.js             → Construye cv.html a partir de data.js
├── assets/
│   ├── img/              → foto.jpg y capturas de los proyectos
│   ├── certificados/     → imágenes (y PDF) de los certificados
│   └── cv/               → CV-Fabian-Cedeno.pdf (opcional)
└── README.md
```

**No hace falta tocar el HTML para actualizar el contenido:** todo se edita en `js/data.js`.

## Cómo agregar un certificado

1. Guarda la imagen del certificado en `assets/certificados/` (PNG o JPG, idealmente ~1400 px de ancho).
   Usa nombres sin espacios ni tildes, por ejemplo `cisco-python.png`.
2. Abre `js/data.js` y agrega un objeto al arreglo `certificados`:

```js
{
  titulo: "Nombre del curso",
  institucion: "Cisco Networking Academy (UCSG)",
  fecha: "15 ago 2026",
  duracion: "8 horas",                 // opcional
  certId: "xxxxxxxx-xxxx-xxxx-xxxx",   // opcional
  imagen: "assets/certificados/cisco-python.png",
  pdf: "assets/certificados/cisco-python.pdf", // opcional
  categoria: "cisco"                   // "cisco" o "aws" (define el filtro)
},
```

3. Listo: aparece en la galería, en el lightbox, en el contador de “Sobre mí” y en `cv.html`.

> Para crear un filtro nuevo (por ejemplo “Google”), usa `categoria: "google"` y añade la opción en
> `renderCertificados()` dentro de `js/main.js` (arreglo de `crearFiltros` y objeto `NOMBRE_CATEGORIA`).

## Cómo agregar un proyecto

1. (Opcional) Guarda una captura en `assets/img/`, por ejemplo `assets/img/mi-proyecto.png` (16:9 se ve mejor).
2. Agrega un objeto al arreglo `proyectos` de `js/data.js`:

```js
{
  titulo: "Mi proyecto",
  descripcion: "Qué hace y por qué es interesante.",
  imagen: "assets/img/mi-proyecto.png",   // "" = vista previa generada automáticamente
  tecnologias: ["HTML", "CSS", "JavaScript"],
  demo: "https://fabianjcv24.github.io/mi-proyecto/",
  codigo: "https://github.com/FabianJCV24/mi-proyecto"
},
```

Los filtros por tecnología se crean solos a partir de `tecnologias`.
Si quieres reemplazar la tarjeta de ejemplo, edita el objeto que tiene `ejemplo: true` y borra esa línea.

## Valores pendientes `[REEMPLAZAR]`

Cualquier valor que empiece por `[REEMPLAZAR` se muestra como “Próximamente” y su botón queda desactivado.
Pendientes actuales en `js/data.js`:

- `perfil.linkedin` → URL de tu perfil de LinkedIn.
- Demo de **MedTech 2030** → enlace de Render.
- Tarjeta de ejemplo del tercer proyecto.
- Capturas de los proyectos (`imagen: ""`).
- `perfil.cvPdf` → mientras esté vacío, “Descargar PDF” abre el diálogo de impresión para guardar
  la hoja de vida web como PDF. Cuando subas el archivo a `assets/cv/CV-Fabian-Cedeno.pdf`, pon esa ruta.
  **Revisa que el PDF no incluya fecha de nacimiento, teléfono, cédula ni dirección.**

## Ver el sitio en tu computadora

Abre la carpeta con la extensión *Live Server* de VS Code, o cualquier servidor estático local.

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Primer portafolio"
git branch -M main
git remote add origin https://github.com/FabianJCV24/FabianJCV24.github.io.git
git push -u origin main
```

Luego, en GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)` → Save**. En uno o dos minutos estará en https://fabianjcv24.github.io.
