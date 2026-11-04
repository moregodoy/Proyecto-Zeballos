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