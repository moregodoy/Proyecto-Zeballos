// Función principal que contiene todo el código.
// Se ejecuta automáticamente y evita que las variables
// queden disponibles fuera de esta función.
(function () {

  // MENÚ PARA CELULARES 

  // Busca el botón del menú y el menú de navegación en el HTML.
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("primaryNav");

  // Comprueba que ambos elementos existan antes de usarlos.
  if (burger && nav) {

    // Al hacer clic en el botón, abre o cierra el menú.
    burger.addEventListener("click", function () {

      // Agrega o quita la clase "open" y guarda el estado del menú.
      const abierto = nav.classList.toggle("open");

      // Actualiza el atributo de accesibilidad según el estado del menú.
      burger.setAttribute("aria-expanded", String(abierto));
    });

    // Busca todos los enlaces del menú.
    nav.querySelectorAll("a").forEach(function (enlace) {

      // Al seleccionar un enlace, cierra el menú para celulares.
      enlace.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    //  RESALTAR LA SECCIÓN ACTUAL 

    // Obtiene los enlaces que llevan a una sección de la misma página.
    const enlaces = Array.from(nav.querySelectorAll('a[href^="#"]'));

    // Busca las secciones correspondientes a esos enlaces.
    const secciones = enlaces
      .map(function (enlace) {
        // Obtiene el elemento indicado en el atributo href.
        return document.querySelector(enlace.getAttribute("href"));
      })
      // Elimina los elementos que no se encontraron.
      .filter(Boolean);

    // Función que identifica la sección que se está viendo.
    function actualizarMenu() {

      // Toma la primera sección como valor inicial.
      let actual = secciones[0];

      // Recorre todas las secciones para encontrar la actual.
      secciones.forEach(function (seccion) {

        // Comprueba si la parte superior de la sección
        // llegó a los 120 píxeles desde arriba de la pantalla.
        if (seccion.getBoundingClientRect().top <= 120) {
          actual = seccion;
        }
      });

      // Si existe una sección actual, actualiza el menú.
      if (actual) {
        enlaces.forEach(function (enlace) {

          // Comprueba si el enlace corresponde a esa sección.
          const activo =
            enlace.getAttribute("href") === "#" + actual.id;

          // Agrega "active" al enlace actual y la quita de los demás.
          enlace.classList.toggle("active", activo);
        });
      }
    }

    // Actualiza el menú cuando el usuario se desplaza por la página.
    document.addEventListener("scroll", actualizarMenu, {
      passive: true
    });

    // Actualiza el menú también al cargar el código.
    actualizarMenu();
  }

  //  PESTAÑAS DE FUNDAMENTOS: ISO 9126 E ISO 25000 

  const botonesISO = document.querySelectorAll("[data-tab]");
  const panelesISO = document.querySelectorAll("[data-panel]");

  botonesISO.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const clave = boton.getAttribute("data-tab");

      botonesISO.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      panelesISO.forEach(function (panel) {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-panel") === clave
        );
      });
    });
  });

  //  PESTAÑAS DE MODELOS TRADICIONALES 

  const botonesModelos = document.querySelectorAll("[data-tab2]");
  const panelesModelos = document.querySelectorAll("[data-panel2]");

  botonesModelos.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const modelo = boton.getAttribute("data-tab2");

      botonesModelos.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      panelesModelos.forEach(function (panel) {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-panel2") === modelo
        );
      });
    });
  });

  //  FILTRO DE HERRAMIENTAS 

  const botonesFiltro = document.querySelectorAll(
    ".tool-filters .tool-filter"
  );
  const tarjetasHerramientas = document.querySelectorAll(
    "#toolsGrid .tool-card"
  );

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const filtro = boton.getAttribute("data-filter");

      botonesFiltro.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      tarjetasHerramientas.forEach(function (tarjeta) {
        const categoria = tarjeta.getAttribute("data-category");
        tarjeta.hidden =
          filtro !== "todos" && categoria !== filtro;
      });
    });
  });

  //  INTERACCIÓN DE LAS ETAPAS DEL SDLC 

  const etapasSDLC = document.querySelectorAll(
    "#sdlcTimeline .tl-step"
  );

  function activarEtapa(etapa) {
    etapasSDLC.forEach(function (otraEtapa) {
      otraEtapa.classList.toggle("active", otraEtapa === etapa);
    });
  }

  etapasSDLC.forEach(function (etapa) {
    etapa.addEventListener("mouseenter", function () {
      activarEtapa(etapa);
    });
    etapa.addEventListener("focusin", function () {
      activarEtapa(etapa);
    });
    etapa.addEventListener("click", function () {
      activarEtapa(etapa);
    });
  });

  //  TARJETAS CAJA NEGRA Y CAJA BLANCA 

  const tarjetasFlip = document.querySelectorAll(".flip-card");

  tarjetasFlip.forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function () {
      tarjeta.classList.toggle("flipped");
    });

    tarjeta.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        tarjeta.classList.toggle("flipped");
      }
    });
  });

})(); 

// ÍNDICE FLOTANTE
const indexToggle = document.getElementById("indexToggle");
const indexMenu = document.getElementById("indexMenu");
if (indexToggle && indexMenu) {
  indexToggle.addEventListener("click", () => {
    indexMenu.classList.toggle("active");
  });

  indexMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      indexMenu.classList.remove("active");
    });
  });
}

// CRONOGRAMA DE UN SPRINT
// Arreglo de los datos de cada etapa
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".paso");
  const cajaInfo = document.getElementById("cronogramaInfo");
  const cajaExtra = document.getElementById("cronogramaExtra");

  const etapasData = [
    {
      titulo: "Planificación",
      puntos: [
        "¿Por qué es valioso este sprint? El propietario expone el valor esperado.",
        "¿Qué se puede hacer? Los desarrolladores eligen elementos de la pila del producto.",
        "¿Cómo se hará? Se descomponen en tareas de un día o menos."
      ],
      participan: "Propietario del producto, desarrolladores y scrum master",
      duracion: "Hasta una jornada completa",
      resultado: "Pila del sprint y objetivo del sprint"
    },
    {
      titulo: "Desarrollo",
      puntos: [
        "El equipo se autogestiona y se reparte las tareas de la pila del sprint.",
        "Solo los desarrolladores modifican la pila del sprint.",
        "Se cumple la definición de «hecho» acordada."
      ],
      participan: "Desarrolladores",
      duracion: "Hasta 4 semanas en total (duración fija)",
      resultado: "Incremento terminado, probado y operativo"
    },
    {
      titulo: "Scrum diario",
      puntos: [
        "Cada persona cuenta qué logró desde la última reunión.",
        "Dice qué hará hasta la siguiente.",
        "Avisa si tiene o prevé algún impedimento."
      ],
      participan: "Desarrolladores (otros pueden mirar sin intervenir)",
      duracion: "Máximo 15 minutos, cada día",
      resultado: "Pila del sprint y gráfico burn down actualizados"
    },
    {
      titulo: "Revisión",
      puntos: [
        "El equipo muestra lo que logró construir durante el sprint.",
        "Se recibe retroalimentación directa del cliente y partes interesadas.",
        "Se ajusta la pila del producto si surgen nuevas ideas."
      ],
      participan: "Todo el equipo Scrum y partes interesadas / clientes",
      duracion: "Hasta 4 horas",
      resultado: "Pila del producto revisada y adaptada"
    },
    {
      titulo: "Retrospectiva",
      puntos: [
        "El equipo analiza cómo funcionaron las personas, relaciones, procesos y herramientas.",
        "Se identifican las cosas que salieron bien y las mejoras necesarias.",
        "Se planifica al menos una mejora concreta para el siguiente sprint."
      ],
      participan: "Equipo Scrum (propietario, desarrolladores y scrum master)",
      duracion: "Hasta 3 horas",
      resultado: "Plan de mejora continua para el próximo sprint"
    }
  ];

  // Definir la lógica de activación
  botones.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // 1. Resetear todos los círculos a color crema
      botones.forEach(b => {
        b.style.setProperty("background-color", "#f7eee1", "important");
      });

      // 2. Pintar únicamente el seleccionado de terracota
      btn.style.setProperty("background-color", "#a85632", "important");

      // 3. Renderizar datos en las tarjetas
      const d = etapasData[index];
      if (d && cajaInfo && cajaExtra) {
        let lis = d.puntos.map(p => `<li style="margin-bottom: 8px !important;">${p}</li>`).join("");
        
        cajaInfo.innerHTML = `
          <h3 style="margin: 0 0 15px 0 !important; color: #3d2b1f !important; font-size: 1.4rem !important; font-family: Arial, sans-serif !important; font-weight: bold !important;">${d.titulo}</h3>
          <ul style="padding-left: 20px !important; line-height: 1.6 !important; color: #3d2b1f !important; margin: 0 !important; font-family: Arial, sans-serif !important; font-size: 0.95rem !important;">${lis}</ul>
        `;

        cajaExtra.innerHTML = `
          <h3 style="color: #d9c9a8 !important; font-size: 0.85rem !important; margin: 0 0 4px 0 !important; font-weight: normal !important; text-transform: none !important; letter-spacing: 0.5px !important; font-family: Arial, sans-serif !important;">Participan</h3>
          <p style="color: #ffffff !important; font-weight: bold !important; margin: 0 0 20px 0 !important; font-size: 0.95rem !important; font-family: Arial, sans-serif !important;">${d.participan}</p>

          <h3 style="color: #d9c9a8 !important; font-size: 0.85rem !important; margin: 0 0 4px 0 !important; font-weight: normal !important; text-transform: none !important; letter-spacing: 0.5px !important; font-family: Arial, sans-serif !important;">Duración</h3>
          <p style="color: #ffffff !important; font-weight: bold !important; margin: 0 0 20px 0 !important; font-size: 0.95rem !important; font-family: Arial, sans-serif !important;">${d.duracion}</p>

          <h3 style="color: #d9c9a8 !important; font-size: 0.85rem !important; margin: 0 0 4px 0 !important; font-weight: normal !important; text-transform: none !important; letter-spacing: 0.5px !important; font-family: Arial, sans-serif !important;">Resultado</h3>
          <p style="color: #ffffff !important; font-weight: bold !important; margin: 0 !important; font-size: 0.95rem !important; font-family: Arial, sans-serif !important;">${d.resultado}</p>
        `;
      }
    });
  });

  // SELECCIONAR AUTOMÁTICAMENTE EL PRIMER BOTÓN (PLANIFICACIÓN) AL CARGAR LA PÁGINA
  if (botones.length > 0) {
    botones[0].click();
  }
});// TABLERO INTERACTIVO KANBAN
(function () {
  const tablero = document.getElementById("kanbanTablero");
  const botonReiniciar = document.getElementById("reiniciarKanban");

  if (!tablero || !botonReiniciar) return;

  const estadoInicial = {
    pendiente: [
      { id: 1, titulo: "Diseñar el login" },
      { id: 2, titulo: "Escribir pruebas unitarias" },
      { id: 3, titulo: "Armar la pantalla de inicio" }
    ],
    curso: [
      { id: 4, titulo: "Configurar el repositorio" }
    ],
    terminado: [
      { id: 5, titulo: "Definir la paleta de colores" }
    ]
  };

  let tareas = JSON.parse(JSON.stringify(estadoInicial));
  const columnas = ["pendiente", "curso", "terminado"];

  function moverTarea(id, destino) {
    const origen = columnas.find(columna =>
      tareas[columna].some(tarea => tarea.id === id)
    );

    if (!origen || origen === destino) return;

    if (destino === "curso" && tareas.curso.length >= 3) {
      alert("La columna En curso ya tiene 3 tareas como máximo.");
      return;
    }

    const indice = tareas[origen].findIndex(tarea => tarea.id === id);
    const [tarea] = tareas[origen].splice(indice, 1);

    tareas[destino].push(tarea);
    mostrarTablero();
  }

  function mostrarTablero() {
    columnas.forEach((columna, indiceColumna) => {
      const elemento = tablero.querySelector(
        `[data-columna="${columna}"]`
      );
      if (!elemento) return;

      const contenedor = elemento.querySelector(".kanban-tareas");
      const contador = elemento.querySelector(".kanban-contador");

      contenedor.innerHTML = "";
      contador.textContent = `(${tareas[columna].length})`;

      tareas[columna].forEach(tarea => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "kanban-tarjeta";
        tarjeta.draggable = true;
        tarjeta.dataset.id = tarea.id;

        const puedeIzquierda = indiceColumna > 0;
        const puedeDerecha = indiceColumna < 2;

        tarjeta.innerHTML = `
          <p>${tarea.titulo}</p>
          <div class="kanban-flechas">
            <button
              type="button"
              data-direccion="-1"
              aria-label="Mover a la columna anterior"
              ${!puedeIzquierda ? "disabled" : ""}
            >◀</button>
            <button
              type="button"
              data-direccion="1"
              aria-label="Mover a la columna siguiente"
              ${!puedeDerecha ? "disabled" : ""}
            >▶</button>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      });
    });
  }

  tablero.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-direccion]");
    if (!boton || boton.disabled) return;

    const tarjeta = boton.closest(".kanban-tarjeta");
    const id = Number(tarjeta.dataset.id);

    const origen = columnas.find(columna =>
      tareas[columna].some(tarea => tarea.id === id)
    );

    const indiceActual = columnas.indexOf(origen);
    const direccion = Number(boton.dataset.direccion);
    const destino = columnas[indiceActual + direccion];

    if (destino) moverTarea(id, destino);
  });

  tablero.addEventListener("dragstart", function (evento) {
    const tarjeta = evento.target.closest(".kanban-tarjeta");
    if (!tarjeta) return;

    evento.dataTransfer.setData("text/plain", tarjeta.dataset.id);
  });

  tablero.addEventListener("dragover", function (evento) {
    const columna = evento.target.closest(".kanban-columna");
    if (!columna) return;

    evento.preventDefault();
    columna.classList.add("recibiendo");
  });

  tablero.addEventListener("dragleave", function (evento) {
    const columna = evento.target.closest(".kanban-columna");
    if (columna && !columna.contains(evento.relatedTarget)) {
      columna.classList.remove("recibiendo");
    }
  });

  tablero.addEventListener("drop", function (evento) {
    const columna = evento.target.closest(".kanban-columna");
    if (!columna) return;

    evento.preventDefault();

    tablero.querySelectorAll(".kanban-columna").forEach(elemento => {
      elemento.classList.remove("recibiendo");
    });

    const id = Number(evento.dataTransfer.getData("text/plain"));
    const destino = columna.dataset.columna;

    moverTarea(id, destino);
  });

  botonReiniciar.addEventListener("click", function () {
    tareas = JSON.parse(JSON.stringify(estadoInicial));
    mostrarTablero();
  });

  mostrarTablero();
})();

// FILTRO Y BUSCADOR DEL GLOSARIO
const buscador = document.getElementById("buscarTermino");
const botonesLetra = document.querySelectorAll(".letra-btn");
const seccionesLetra = document.querySelectorAll(".letra-glosario");

// DESACTIVAR LETRAS SIN DEFINICIONES
botonesLetra.forEach(function(boton) {
    const letra = boton.dataset.letra;
    if (letra === "todas") return;

    const existe = Array.from(seccionesLetra).some(function(seccion) {
        return seccion.querySelector(".letra-inicial")?.textContent.trim() === letra;
    });

    if (!existe) {
        boton.classList.add("sin-contenido");
        boton.disabled = true;
    }
});

let letraSeleccionada = "todas"; // Valor inicial por defecto para mostrar todo al cargar

// FILTRO POR LETRAS
botonesLetra.forEach(function(boton) {
    boton.addEventListener("click", function() {
        letraSeleccionada = boton.dataset.letra;

        botonesLetra.forEach(function(btn) {
            btn.classList.remove("activo");
        });

        boton.classList.add("activo");
        actualizarGlosario();
    });
});

// BUSCADOR
if (buscador) {
    buscador.addEventListener("input", function() {
        actualizarGlosario();
    });
}

// ACTUALIZAR GLOSARIO
function actualizarGlosario() {
    const texto = buscador ? buscador.value.toLowerCase().trim() : "";

    seccionesLetra.forEach(function(seccion) {
        const terminos = seccion.querySelectorAll(".termino");
        let hayResultados = false;

        terminos.forEach(function(termino) {
            const contenido = termino.textContent.toLowerCase();
            const inicialElemento = termino.querySelector(".letra-inicial");
            const inicial = inicialElemento ? inicialElemento.textContent.trim() : "";

            const coincideTexto = contenido.includes(texto);
            const coincideLetra = 
                letraSeleccionada === "todas" || 
                letraSeleccionada === "" || 
                inicial === letraSeleccionada;

            if (coincideTexto && coincideLetra) {
                termino.style.display = "flex";
                hayResultados = true;
            } else {
                termino.style.display = "none";
            }
        });

        seccion.style.display = hayResultados ? "contents" : "none";
    });
}

// PREGUNTAS FRECUENTES
const preguntas = document.querySelectorAll(".pregunta");

preguntas.forEach(function(pregunta) {
    const boton = pregunta.querySelector(".pregunta-btn");
    if (boton) {
        boton.addEventListener("click", function() {
            pregunta.classList.toggle("activa");
        });
    }
});

// MOSTRAR Y OCULTAR SOLUCIONES
const botonesSolucion = document.querySelectorAll(".solucion-btn");

botonesSolucion.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const tarjeta = boton.closest(".ejercicio-card");
        const solucion = tarjeta.querySelector(".ejercicio-solucion");

        if (solucion.hidden) {
            solucion.hidden = false;
            boton.textContent = "Ocultar solución";
        } else {
            solucion.hidden = true;
            boton.textContent = "Mostrar solución";
        }
    });
});

// ==============================
// ENLACES DE INTERÉS - SEGURIDAD
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const enlaces = document.querySelectorAll(
        "#enlaces-interes a"
    );

    enlaces.forEach(enlace => {

        // Abrir en una pestaña nueva
        enlace.setAttribute("target", "_blank");

        // Protección de seguridad
        enlace.setAttribute("rel", "noopener noreferrer");

    });

    // VALIDACIÓN QA / TESTER

    let errores = 0;

    enlaces.forEach((enlace, index) => {

        const targetCorrecto =
            enlace.getAttribute("target") === "_blank";

        const rel = enlace.getAttribute("rel");

        const relCorrecto =
            rel && rel.includes("noopener") &&
            rel.includes("noreferrer");

        if (!targetCorrecto || !relCorrecto) {
            errores++;
            console.error(
                `Error de seguridad en el enlace ${index + 1}`
            );
        }

    });

    if (errores === 0) {
        console.log(
            `QA: Validación exitosa. ${enlaces.length} enlaces seguros.`
        );
    } else {
        console.warn(
            `QA: Se encontraron ${errores} enlaces con errores.`
        );
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("encuestaOverlay");

    if (!overlay) return;

    const intro = document.getElementById("encuestaIntro");
    const contenido = document.getElementById("encuestaContenido");
    const resultado = document.getElementById("encuestaResultado");

    const titulo = document.getElementById("tituloPregunta");
    const descripcion = document.getElementById("descripcionPregunta");
    const opciones = document.getElementById("opcionesPregunta");

    const numero = document.getElementById("numeroPregunta");
    const porcentaje = document.getElementById("porcentajeProgreso");
    const barra = document.getElementById("barraProgreso");

    const anterior = document.getElementById("preguntaAnterior");
    const siguiente = document.getElementById("preguntaSiguiente");

    let preguntaActual = 0;
    let respuestas = [];

    // PUNTAJES: SCRUM, KANBAN, CASCADA

    const preguntas = [
        {
            titulo: "¿Qué tan definidos están los requisitos de tu proyecto?",
            descripcion: "Pensá en cuánto pueden cambiar las necesidades durante el desarrollo.",
            opciones: [
                {
                    texto: "Pueden cambiar y evolucionar durante el proyecto.",
                    puntos: [3, 2, 0]
                },
                {
                    texto: "Van apareciendo nuevas tareas y prioridades.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Están definidos claramente desde el principio.",
                    puntos: [0, 0, 3]
                }
            ]
        },
        {
            titulo: "¿Cómo preferís entregar los resultados?",
            descripcion: "Elegí la forma de entrega que mejor se adapte al proyecto.",
            opciones: [
                {
                    texto: "En entregas pequeñas organizadas por períodos de trabajo.",
                    puntos: [3, 1, 0]
                },
                {
                    texto: "A medida que las tareas se van completando.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Al finalizar todas las etapas del proyecto.",
                    puntos: [0, 0, 3]
                }
            ]
        },
        {
            titulo: "¿Cómo se organiza el equipo de trabajo?",
            descripcion: "Considerá la comunicación y la distribución de responsabilidades.",
            opciones: [
                {
                    texto: "Trabajamos juntos y realizamos reuniones frecuentes.",
                    puntos: [3, 1, 0]
                },
                {
                    texto: "Cada integrante gestiona sus tareas y el flujo de trabajo.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Cada integrante tiene responsabilidades definidas por etapas.",
                    puntos: [0, 0, 3]
                }
            ]
        },
        {
            titulo: "¿Con qué frecuencia cambian las prioridades?",
            descripcion: "Esto permite conocer cuánto necesita adaptarse el proyecto.",
            opciones: [
                {
                    texto: "Se revisan al comenzar cada período de trabajo.",
                    puntos: [3, 1, 0]
                },
                {
                    texto: "Pueden cambiar en cualquier momento.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Se establecen desde el inicio y se mantienen.",
                    puntos: [0, 0, 3]
                }
            ]
        },
        {
            titulo: "¿Cómo preferís controlar el avance del proyecto?",
            descripcion: "Elegí el seguimiento que te resulte más adecuado.",
            opciones: [
                {
                    texto: "Revisando los resultados al finalizar cada sprint.",
                    puntos: [3, 1, 0]
                },
                {
                    texto: "Visualizando las tareas pendientes, en proceso y terminadas.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Verificando que cada etapa se complete según lo planificado.",
                    puntos: [0, 0, 3]
                }
            ]
        },
        {
            titulo: "¿Qué característica es más importante para tu proyecto?",
            descripcion: "Pensá en el principal objetivo de la forma de trabajo.",
            opciones: [
                {
                    texto: "Adaptarse, colaborar y mejorar continuamente.",
                    puntos: [3, 1, 0]
                },
                {
                    texto: "Mantener un flujo de tareas ordenado y flexible.",
                    puntos: [1, 3, 0]
                },
                {
                    texto: "Seguir un plan estructurado y previsible.",
                    puntos: [0, 0, 3]
                }
            ]
        }
    ];

    const nombres = ["Scrum", "Kanban", "Cascada"];

    const motivos = {
        Scrum: "Tu proyecto necesita colaboración constante, planificación en períodos cortos y entregas progresivas. Scrum permite organizar el trabajo mediante sprints y revisar los resultados frecuentemente.",

        Kanban: "Tu proyecto necesita flexibilidad y seguimiento continuo de las tareas. Kanban permite visualizar el flujo de trabajo, establecer prioridades y adaptarse a los cambios.",

        Cascada: "Tu proyecto tiene requisitos definidos y necesita una planificación estructurada. Cascada organiza el desarrollo en etapas secuenciales con objetivos establecidos."
    };

    // ABRIR ENCUESTA

    function abrirEncuesta() {
        overlay.classList.add("activa");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    // CERRAR ENCUESTA

    function cerrarEncuesta() {
        overlay.classList.remove("activa");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.getElementById("abrirEncuesta")
        .addEventListener("click", () => {
            reiniciarEncuesta();
            abrirEncuesta();
        });

    document.getElementById("cerrarEncuesta")
        .addEventListener("click", cerrarEncuesta);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            cerrarEncuesta();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            overlay.classList.contains("activa")
        ) {
            cerrarEncuesta();
        }
    });

    // COMENZAR

    document.getElementById("comenzarEncuesta")
        .addEventListener("click", () => {
            intro.hidden = true;
            contenido.hidden = false;
            mostrarPregunta();
        });

    // MOSTRAR PREGUNTAS

    function mostrarPregunta() {

        const pregunta = preguntas[preguntaActual];

        titulo.textContent = pregunta.titulo;
        descripcion.textContent = pregunta.descripcion;

        numero.textContent =
            `PREGUNTA ${preguntaActual + 1} DE ${preguntas.length}`;

        const avance =
            ((preguntaActual + 1) / preguntas.length) * 100;

        porcentaje.textContent = `${Math.round(avance)}%`;
        barra.style.width = `${avance}%`;

        opciones.innerHTML = "";

        pregunta.opciones.forEach((opcion, index) => {

            const boton = document.createElement("button");

            boton.type = "button";
            boton.className = "encuesta-opcion";
            boton.textContent = opcion.texto;

            boton.setAttribute("aria-pressed", "false");

            if (respuestas[preguntaActual] === index) {
                boton.classList.add("seleccionada");
                boton.setAttribute("aria-pressed", "true");
            }

            boton.addEventListener("click", () => {

                respuestas[preguntaActual] = index;

                opciones.querySelectorAll(".encuesta-opcion")
                    .forEach(btn => {
                        btn.classList.remove("seleccionada");
                        btn.setAttribute("aria-pressed", "false");
                    });

                boton.classList.add("seleccionada");
                boton.setAttribute("aria-pressed", "true");

                siguiente.disabled = false;

            });

            opciones.appendChild(boton);

        });

        anterior.disabled = preguntaActual === 0;

        siguiente.disabled =
            respuestas[preguntaActual] === undefined;

        siguiente.textContent =
            preguntaActual === preguntas.length - 1
                ? "Ver resultados →"
                : "Siguiente →";
    }

    // PREGUNTA ANTERIOR

    anterior.addEventListener("click", () => {

        if (preguntaActual > 0) {
            preguntaActual--;
            mostrarPregunta();
        }

    });

    // SIGUIENTE PREGUNTA

    siguiente.addEventListener("click", () => {

        if (respuestas[preguntaActual] === undefined) return;

        if (preguntaActual < preguntas.length - 1) {

            preguntaActual++;
            mostrarPregunta();

        } else {

            calcularResultado();

        }

    });

    // CALCULAR RESULTADOS

    function calcularResultado() {

        const puntajes = [0, 0, 0];

        respuestas.forEach((respuesta, index) => {

            const puntos =
                preguntas[index].opciones[respuesta].puntos;

            puntos.forEach((valor, metodologia) => {
                puntajes[metodologia] += valor;
            });

        });

        const total = puntajes.reduce((a, b) => a + b, 0);

        const porcentajes = puntajes.map(puntaje =>
            Math.round((puntaje / total) * 100)
        );

        // Ajustar porcentajes para que sumen 100%

        const diferencia = 100 -
            porcentajes.reduce((a, b) => a + b, 0);

        const indiceMayor = puntajes.indexOf(Math.max(...puntajes));

        porcentajes[indiceMayor] += diferencia;

        const mayor = Math.max(...puntajes);

        const ganadores = nombres.filter((nombre, index) =>
            puntajes[index] === mayor
        );

        // Mostrar resultado

        contenido.hidden = true;
        resultado.hidden = false;

        document.getElementById("metodologiaGanadora")
            .textContent = ganadores.join(" / ");

        document.getElementById("motivoGanador")
            .textContent = ganadores.length === 1
                ? motivos[ganadores[0]]
                : "Tu proyecto presenta características compatibles con varias metodologías. Podés comparar sus ventajas y elegir según las necesidades de tu equipo.";

        document.getElementById("resultadoDescripcion")
            .textContent = ganadores.length === 1
                ? "Según tus respuestas, esta es la metodología con mayor coincidencia."
                : "Tus respuestas muestran un empate entre metodologías. No hay una única opción predominante.";

        const contenedor =
            document.getElementById("resultadoPuntajes");

        contenedor.innerHTML = "";

        nombres.forEach((nombre, index) => {

            const item = document.createElement("div");
            item.className = "puntaje-item";

            const cabecera = document.createElement("div");
            cabecera.className = "puntaje-cabecera";

            const nombreElemento = document.createElement("span");
            nombreElemento.textContent = nombre;

            const porcentajeElemento = document.createElement("span");
            porcentajeElemento.textContent = `${porcentajes[index]}%`;

            cabecera.append(nombreElemento, porcentajeElemento);

            const barraFondo = document.createElement("div");
            barraFondo.className = "puntaje-barra";

            const relleno = document.createElement("div");
            relleno.className = "puntaje-relleno";
            relleno.style.width = `${porcentajes[index]}%`;

            barraFondo.appendChild(relleno);

            item.append(cabecera, barraFondo);
            contenedor.appendChild(item);

        });

    }

    // REINICIAR

    function reiniciarEncuesta() {

        preguntaActual = 0;
        respuestas = [];

        intro.hidden = false;
        contenido.hidden = true;
        resultado.hidden = true;

        barra.style.width = "16.67%";
        porcentaje.textContent = "17%";

    }

    document.getElementById("reiniciarEncuesta")
        .addEventListener("click", reiniciarEncuesta);

});

/* =========================================
   COMPARADOR INTERACTIVO DE METODOLOGÍAS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("comparadorOverlay");

    if (!overlay) return;

    const checks = document.querySelectorAll(".metodologia-check");

    const botonComparar =
        document.getElementById("generarComparacion");

    const contador =
        document.getElementById("contadorSeleccion");

    const resultados =
        document.getElementById("comparadorResultados");

    const encabezado =
        document.getElementById("tablaEncabezado");

    const cuerpo =
        document.getElementById("tablaContenido");

    // INFORMACIÓN DE LAS METODOLOGÍAS

    const metodologias = {

        scrum: {
            nombre: "Scrum",
            caracteristicas: {
                "Organización": "Trabajo dividido en sprints.",
                "Planificación": "Se planifica al inicio de cada sprint.",
                "Entregas": "Incrementos de producto al finalizar cada sprint.",
                "Roles del equipo": "Product Owner, Scrum Master y Developers.",
                "Flexibilidad": "Alta. Permite adaptar el trabajo entre sprints.",
                "Gestión de cambios": "Se revisan y priorizan los cambios en el Product Backlog.",
                "Seguimiento": "Daily Scrum, Sprint Review y Sprint Retrospective.",
                "Ventajas": "Favorece la colaboración, la transparencia y las entregas frecuentes.",
                "Desventajas": "Requiere compromiso del equipo y reuniones periódicas.",
                "Proyecto recomendado": "Proyectos complejos con requisitos cambiantes."
            }
        },

        kanban: {
            nombre: "Kanban",
            caracteristicas: {
                "Organización": "Flujo continuo de tareas mediante un tablero visual.",
                "Planificación": "Se organiza según prioridades y capacidad disponible.",
                "Entregas": "Se realizan cuando las tareas están terminadas.",
                "Roles del equipo": "No establece roles obligatorios.",
                "Flexibilidad": "Muy alta. Permite modificar prioridades continuamente.",
                "Gestión de cambios": "Se incorporan cambios al flujo de trabajo.",
                "Seguimiento": "Tablero Kanban, límites de trabajo en proceso y métricas de flujo.",
                "Ventajas": "Facilita la visualización y mejora el flujo de trabajo.",
                "Desventajas": "Puede faltar estructura si no se establecen políticas claras.",
                "Proyecto recomendado": "Equipos con tareas continuas y prioridades cambiantes."
            }
        },

        cascada: {
            nombre: "Cascada",
            caracteristicas: {
                "Organización": "Desarrollo dividido en etapas secuenciales.",
                "Planificación": "Se planifica principalmente desde el comienzo.",
                "Entregas": "Generalmente se entrega el producto al finalizar las etapas.",
                "Roles del equipo": "Responsabilidades definidas según las etapas del proyecto.",
                "Flexibilidad": "Baja. Los cambios pueden afectar la planificación.",
                "Gestión de cambios": "Se gestionan mediante revisiones y modificaciones del plan.",
                "Seguimiento": "Control de etapas, documentación y cumplimiento del cronograma.",
                "Ventajas": "Ofrece una estructura clara y facilita la planificación.",
                "Desventajas": "Es menos adaptable ante cambios durante el desarrollo.",
                "Proyecto recomendado": "Proyectos con requisitos estables y bien definidos."
            }
        }

    };

    // ABRIR COMPARADOR

    function abrirComparador() {

        overlay.classList.add("activa");
        overlay.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }

    // CERRAR COMPARADOR

    function cerrarComparador() {

        overlay.classList.remove("activa");
        overlay.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

    document.getElementById("abrirComparador")
        .addEventListener("click", abrirComparador);

    document.getElementById("cerrarComparador")
        .addEventListener("click", cerrarComparador);

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {
            cerrarComparador();
        }

    });

    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            overlay.classList.contains("activa")
        ) {
            cerrarComparador();
        }

    });

    // ACTUALIZAR SELECCIÓN

    function actualizarSeleccion() {

        const seleccionadas = Array.from(checks)
            .filter(check => check.checked);

        contador.textContent =
            `${seleccionadas.length} de 3 seleccionadas`;

        botonComparar.disabled =
            seleccionadas.length < 2;

        // Ocultar resultados anteriores si cambia la selección

        resultados.hidden = true;

    }

    checks.forEach(check => {

        check.addEventListener("change", actualizarSeleccion);

    });

    actualizarSeleccion();

    // GENERAR TABLA

    function generarTabla() {

        const seleccionadas = Array.from(checks)
            .filter(check => check.checked)
            .map(check => metodologias[check.value]);

        if (seleccionadas.length < 2) return;

        encabezado.innerHTML = "";
        cuerpo.innerHTML = "";

        // CREAR ENCABEZADOS

        const filaEncabezado = document.createElement("tr");

        const primeraCelda = document.createElement("th");
        primeraCelda.textContent = "Características";

        filaEncabezado.appendChild(primeraCelda);

        seleccionadas.forEach(metodologia => {

            const th = document.createElement("th");

            th.textContent = metodologia.nombre;

            filaEncabezado.appendChild(th);

        });

        encabezado.appendChild(filaEncabezado);

        // OBTENER LAS CARACTERÍSTICAS

        const caracteristicas = Object.keys(
            metodologias.scrum.caracteristicas
        );

        caracteristicas.forEach(caracteristica => {

            const fila = document.createElement("tr");

            const titulo = document.createElement("th");

            titulo.scope = "row";
            titulo.textContent = caracteristica;

            fila.appendChild(titulo);

            seleccionadas.forEach(metodologia => {

                const celda = document.createElement("td");

                celda.textContent =
                    metodologia.caracteristicas[caracteristica];

                fila.appendChild(celda);

            });

            cuerpo.appendChild(fila);

        });

        resultados.hidden = false;

        resultados.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

    botonComparar.addEventListener("click", generarTabla);

    // CAMBIAR SELECCIÓN

    document.getElementById("nuevaComparacion")
        .addEventListener("click", () => {

            resultados.hidden = true;

            checks.forEach(check => {
                check.checked = false;
            });

            actualizarSeleccion();

        });

});

/* =====================================
   VALIDACIÓN DEL FORMULARIO DE CONTACTO
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formularioContacto");

    if (!formulario) return;

    const nombre = document.getElementById("nombreContacto");
    const email = document.getElementById("emailContacto");
    const asunto = document.getElementById("asuntoContacto");
    const mensaje = document.getElementById("mensajeContacto");

    const mensajeExito = document.getElementById("mensajeExito");
    const contador = document.getElementById("contadorMensaje");

    // CONTADOR DE CARACTERES

    mensaje.addEventListener("input", () => {

        contador.textContent =
            `${mensaje.value.length} / 1500`;

    });

    // MOSTRAR ERROR

    function mostrarError(campo, idError, texto) {

        const error = document.getElementById(idError);

        campo.classList.add("campo-invalido");
        campo.classList.remove("campo-valido");

        campo.setAttribute("aria-invalid", "true");

        error.textContent = texto;

    }

    // MARCAR CAMPO CORRECTO

    function marcarValido(campo, idError) {

        const error = document.getElementById(idError);

        campo.classList.remove("campo-invalido");
        campo.classList.add("campo-valido");

        campo.setAttribute("aria-invalid", "false");

        error.textContent = "";

    }

    // VALIDAR NOMBRE

    function validarNombre() {

        const valor = nombre.value.trim();

        if (!valor) {
            mostrarError(
                nombre,
                "errorNombre",
                "Este campo es obligatorio."
            );
            return false;
        }

        if (valor.length < 2) {
            mostrarError(
                nombre,
                "errorNombre",
                "El nombre debe tener al menos 2 caracteres."
            );
            return false;
        }

        if (valor.length > 80) {
            mostrarError(
                nombre,
                "errorNombre",
                "El nombre no puede superar los 80 caracteres."
            );
            return false;
        }

        if (!/^[\p{L}\p{M}\s'-]+$/u.test(valor)) {
            mostrarError(
                nombre,
                "errorNombre",
                "Ingresá un nombre válido."
            );
            return false;
        }

        marcarValido(nombre, "errorNombre");

        return true;

    }

    // VALIDAR EMAIL

    function validarEmail() {

        const valor = email.value.trim();

        const formatoEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

        if (!valor) {
            mostrarError(
                email,
                "errorEmail",
                "El correo electrónico es obligatorio."
            );
            return false;
        }

        if (valor.length > 254 || !formatoEmail.test(valor)) {
            mostrarError(
                email,
                "errorEmail",
                "Ingresá un correo electrónico válido."
            );
            return false;
        }

        marcarValido(email, "errorEmail");

        return true;

    }

    // VALIDAR ASUNTO

    function validarAsunto() {

        if (!asunto.value) {
            mostrarError(
                asunto,
                "errorAsunto",
                "Seleccioná un asunto."
            );
            return false;
        }

        marcarValido(asunto, "errorAsunto");

        return true;

    }

    // VALIDAR MENSAJE

    function validarMensaje() {

        const valor = mensaje.value.trim();

        if (!valor) {
            mostrarError(
                mensaje,
                "errorMensaje",
                "El mensaje es obligatorio."
            );
            return false;
        }

        if (valor.length < 10) {
            mostrarError(
                mensaje,
                "errorMensaje",
                "El mensaje debe tener al menos 10 caracteres."
            );
            return false;
        }

        if (valor.length > 1500) {
            mostrarError(
                mensaje,
                "errorMensaje",
                "El mensaje no puede superar los 1500 caracteres."
            );
            return false;
        }

        marcarValido(mensaje, "errorMensaje");

        return true;

    }

    // VALIDACIÓN AL ENVIAR

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        mensajeExito.hidden = true;

        const nombreCorrecto = validarNombre();
        const emailCorrecto = validarEmail();
        const asuntoCorrecto = validarAsunto();
        const mensajeCorrecto = validarMensaje();

        if (
            nombreCorrecto &&
            emailCorrecto &&
            asuntoCorrecto &&
            mensajeCorrecto
        ) {

            mensajeExito.hidden = false;

            mensajeExito.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

            formulario.reset();

            contador.textContent = "0 / 1500";

            [nombre, email, asunto, mensaje].forEach(campo => {

                campo.classList.remove(
                    "campo-valido",
                    "campo-invalido"
                );

                campo.removeAttribute("aria-invalid");

            });

        } else {

            const primerCampoInvalido =
                formulario.querySelector(".campo-invalido");

            if (primerCampoInvalido) {
                primerCampoInvalido.focus();
            }

        }

    });

    // VALIDACIÓN AL MODIFICAR LOS CAMPOS

    nombre.addEventListener("blur", validarNombre);
    email.addEventListener("blur", validarEmail);
    asunto.addEventListener("change", validarAsunto);
    mensaje.addEventListener("blur", validarMensaje);

    // OCULTAR CONFIRMACIÓN AL ESCRIBIR NUEVAMENTE

    formulario.addEventListener("input", () => {
        mensajeExito.hidden = true;
    });

});
