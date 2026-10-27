/* ==========================================================================
   data.js — TODA la información del portafolio vive aquí.
   index.html y cv.html leen este objeto para construir su contenido.

   Para agregar un certificado o un proyecto NO hace falta tocar el HTML:
   solo añade un objeto nuevo al arreglo correspondiente (ver README.md).

   Convención: cualquier texto que empiece por "[REEMPLAZAR" se considera
   pendiente; la página lo muestra como "Próximamente" y desactiva el enlace.
   ========================================================================== */

const DATOS = {
  /* ---------- Perfil general ---------- */
  perfil: {
    nombre: "Fabián Cedeño",
    titulo: "Estudiante de Ingeniería en Ciencias de la Computación",
    foto: "assets/img/foto.jpg",
    // Frases que aparecen con efecto de máquina de escribir en el inicio
    frases: [
      "Estudiante de Ciencias de la Computación",
      "Apasionado por la Inteligencia Artificial",
      "Explorando la Ciencia de Datos y la Ciberseguridad"
    ],
    semestre: 6,
    correo: "fabiancedeno3298@gmail.com",
    github: "https://github.com/FabianJCV24",
    linkedin: "[REEMPLAZAR]",
    // Ruta del CV en PDF. Déjalo vacío ("") mientras no subas el archivo:
    // el botón "Descargar PDF" abrirá entonces el diálogo de impresión
    // para que se pueda guardar la hoja de vida web como PDF.
    // Cuando lo subas: "assets/cv/CV-Fabian-Cedeno.pdf"
    cvPdf: "",
    sobreMi:
      "Soy estudiante de sexto semestre de Ingeniería en Ciencias de la Computación en la Universidad Católica de Santiago de Guayaquil. Me considero una persona energética y con iniciativa, siempre dispuesta a colaborar y emprender proyectos nuevos. Mi prioridad es actualizar constantemente mis conocimientos, especialmente en inteligencia artificial, ciencia de datos, ciberseguridad y redes. Me desenvuelvo bien bajo presión y disfruto trabajar en equipo."
  },

  /* ---------- Habilidades técnicas (agrupadas por categoría) ----------
     icono: nombre de un ícono definido en main.js (codigo, herramientas,
     ofimatica, cerebro, nube, escudo, red, datos, ...)                    */
  habilidadesTecnicas: [
    {
      categoria: "Lenguajes y bases de datos",
      icono: "codigo",
      items: [
        "MySQL (consultas SQL y manejo básico de bases de datos)",
        "C++",
        "Java",
        "HTML",
        "CSS",
        "JavaScript"
      ]
    },
    {
      categoria: "Herramientas",
      icono: "herramientas",
      items: ["Visual Studio Code", "Apache NetBeans", "Dev-C++", "Cisco Packet Tracer", "GitHub"]
    },
    {
      categoria: "Ofimática",
      icono: "ofimatica",
      items: ["Excel", "Word", "PowerPoint"]
    },
    {
      categoria: "Áreas de interés",
      icono: "cerebro",
      items: [
        "Ciencia de Datos",
        "Ciberseguridad",
        "Redes",
        "IA Generativa y servicios en la nube (AWS)"
      ]
    }
  ],

  /* ---------- Habilidades blandas ---------- */
  habilidadesBlandas: [
    { nombre: "Liderazgo", icono: "bandera" },
    { nombre: "Comunicación asertiva", icono: "mensaje" },
    { nombre: "Trabajo en equipo", icono: "equipo" },
    { nombre: "Responsabilidad", icono: "check" },
    { nombre: "Adaptabilidad y flexibilidad", icono: "refrescar" },
    { nombre: "Trabajo bajo presión", icono: "reloj" }
  ],

  /* ---------- Idiomas (porcentaje = largo de la barra) ---------- */
  idiomas: [
    { idioma: "Español", nivel: "Nativo", porcentaje: 100 },
    { idioma: "Inglés", nivel: "A2", porcentaje: 35 }
  ],

  /* ---------- Experiencia ---------- */
  experiencia: [
    {
      cargo: "Encuestador",
      organizacion: "UCSG — Carrera de Ingeniería en Ciencias de la Computación",
      periodo: "Junio 2025 – Actualidad",
      tareas: [
        "Encuestas a la comunidad universitaria sobre el uso del reciclaje.",
        "Registro fotográfico como evidencia de las encuestas realizadas."
      ]
    },
    {
      cargo: "Digitalizador",
      organizacion: "UCSG — Carrera de Ingeniería en Ciencias de la Computación",
      periodo: "Junio 2025 – Actualidad",
      tareas: [
        "Digitalización de documentos y archivos de graduados.",
        "Digitalización de recalificaciones y exámenes calificados."
      ]
    }
  ],

  /* ---------- Educación ---------- */
  educacion: [
    {
      institucion: "Universidad Católica de Santiago de Guayaquil (UCSG)",
      titulo: "Ingeniería en Ciencias de la Computación",
      estado: "Cursando 6to semestre"
    },
    {
      institucion: "Unidad Educativa Particular Santa Ana",
      titulo: "Bachiller en Ciencias",
      estado: "Graduado"
    }
  ],

  /* ---------- Certificados ----------
     categoria: "cisco" o "aws"  (se usa para los filtros de la galería)
     duracion, certId y pdf son opcionales: si no existen, no se muestran.  */
  certificados: [
    {
      titulo: "Introducción a la Ciencia de Datos",
      institucion: "Cisco Networking Academy (UCSG)",
      fecha: "21 jul 2026",
      certId: "4759f818-f7ab-445d-ac0f-bc86f30155fb",
      imagen: "assets/certificados/cisco-ciencia-datos.png",
      pdf: "assets/certificados/cisco-ciencia-datos.pdf",
      categoria: "cisco"
    },
    {
      titulo: "Introducción a Ciberseguridad",
      institucion: "Cisco Networking Academy (UCSG)",
      fecha: "21 jul 2026",
      certId: "47223c55-b0e4-4d95-96af-6ef745075066",
      imagen: "assets/certificados/cisco-ciberseguridad.png",
      pdf: "assets/certificados/cisco-ciberseguridad.pdf",
      categoria: "cisco"
    },
    {
      titulo: "Exploración de redes con Cisco Packet Tracer",
      institucion: "Cisco Networking Academy (UCSG)",
      fecha: "7 jun 2026",
      certId: "8020b06f-7fa7-4b2a-9f64-38c1a2a31cf0",
      imagen: "assets/certificados/cisco-packet-tracer.png",
      pdf: "assets/certificados/cisco-packet-tracer.pdf",
      categoria: "cisco"
    },
    {
      titulo: "Workshop “Crea tu primera aplicación con Gen AI en AWS”",
      institucion: "UCSG — Semana de la Internacionalización",
      fecha: "13 jun 2025",
      duracion: "4 horas",
      imagen: "assets/certificados/aws-workshop-genai.png",
      categoria: "aws"
    },
    {
      titulo: "Charla “AWS - Generación de Infraestructura con Inteligencia Artificial Generativa”",
      institucion: "UCSG — Carrera de Ingeniería en Ciencias de la Computación",
      fecha: "12 jun 2025",
      duracion: "2 horas",
      imagen: "assets/certificados/aws-charla-ia-generativa.png",
      categoria: "aws"
    }
  ],

  /* ---------- Proyectos ----------
     imagen: captura de vista previa (ej. "assets/img/mente-ia.png").
             Si está vacía se muestra un fondo generado automáticamente.
     ejemplo: true marca una tarjeta de muestra (no cuenta en el contador). */
  proyectos: [
    {
      titulo: "Dentro de la mente de una IA",
      descripcion:
        "Web interactiva que explica cómo aprenden las máquinas, con una red neuronal animada y un perceptrón en JavaScript que aprende en tiempo real.",
      imagen: "",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      demo: "https://fabianjcv24.github.io/mente-ia/",
      codigo: "https://github.com/FabianJCV24/mente-ia"
    },
    {
      titulo: "MedTech 2030",
      descripcion:
        "Aplicación web con un mapa interactivo del cuerpo humano que muestra cómo la tecnología está transformando la medicina.",
      imagen: "",
      tecnologias: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
      demo: "[REEMPLAZAR con el enlace de Render]",
      codigo: "https://github.com/FabianJCV24/medtech-2030"
    },
    {
      titulo: "[REEMPLAZAR] Próximo proyecto",
      descripcion:
        "Tarjeta de ejemplo para un proyecto futuro. Edita este objeto en js/data.js con el título, la descripción, las tecnologías y los enlaces.",
      imagen: "",
      tecnologias: ["Próximamente"],
      demo: "[REEMPLAZAR]",
      codigo: "[REEMPLAZAR]",
      ejemplo: true
    }
  ]
};
