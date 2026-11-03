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
    // "passive: true" indica que el evento no necesita bloquear el desplazamiento.
    document.addEventListener("scroll", actualizarMenu, {
      passive: true
    });

    // Actualiza el menú también al cargar el código.
    actualizarMenu();
  }

  //  PESTAÑAS DE FUNDAMENTOS: ISO 9126 E ISO 25000 

  // Busca los botones y los paneles de las pestañas de las normas ISO.
  const botonesISO = document.querySelectorAll("[data-tab]");
  const panelesISO = document.querySelectorAll("[data-panel]");

  // Recorre cada botón para detectar cuándo se hace clic.
  botonesISO.forEach(function (boton) {
    boton.addEventListener("click", function () {

      // Obtiene el identificador de la pestaña seleccionada.
      const clave = boton.getAttribute("data-tab");

      // Activa el botón seleccionado y desactiva los demás.
      botonesISO.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      // Muestra el panel que coincide con la pestaña seleccionada.
      // Los demás paneles pierden la clase "active".
      panelesISO.forEach(function (panel) {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-panel") === clave
        );
      });
    });
  });

  //  PESTAÑAS DE MODELOS TRADICIONALES 

  // Busca los botones y paneles de los modelos tradicionales.
  const botonesModelos = document.querySelectorAll("[data-tab2]");
  const panelesModelos = document.querySelectorAll("[data-panel2]");

  // Recorre los botones para detectar cuál selecciona el usuario.
  botonesModelos.forEach(function (boton) {
    boton.addEventListener("click", function () {

      // Obtiene el identificador del modelo seleccionado.
      const modelo = boton.getAttribute("data-tab2");

      // Marca como activo el botón seleccionado.
      botonesModelos.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      // Muestra el panel del modelo seleccionado.
      panelesModelos.forEach(function (panel) {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-panel2") === modelo
        );
      });
    });
  });

  //  FILTRO DE HERRAMIENTAS 

  // Busca los botones que permiten filtrar las herramientas.
  const botonesFiltro = document.querySelectorAll(
    ".tool-filters .tool-filter"
  );

  // Busca todas las tarjetas de herramientas que se pueden filtrar.
  const tarjetas = document.querySelectorAll(
    "#toolsGrid .tool-card"
  );

  // Detecta los clics en los botones de filtro.
  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {

      // Obtiene la categoría que se quiere mostrar.
      const filtro = boton.getAttribute("data-filter");

      // Activa el botón elegido y desactiva los otros.
      botonesFiltro.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      // Recorre todas las tarjetas para decidir cuáles mostrar.
      tarjetas.forEach(function (tarjeta) {

        // Obtiene la categoría de cada herramienta.
        const categoria = tarjeta.getAttribute("data-category");

        // Oculta la tarjeta si no coincide con el filtro.
        // Si el filtro es "todos", muestra todas las tarjetas.
        tarjeta.hidden =
          filtro !== "todos" && categoria !== filtro;
      });
    });
  });

  //  INTERACCIÓN DE LAS ETAPAS DEL SDLC 

  // Busca las etapas del ciclo de vida del desarrollo de software.
  const etapasSDLC = document.querySelectorAll(
    "#sdlcTimeline .tl-step"
  );

  // Función que activa una etapa y desactiva las demás.
  function activarEtapa(etapa) {
    etapasSDLC.forEach(function (otraEtapa) {
      otraEtapa.classList.toggle("active", otraEtapa === etapa);
    });
  }

  // Agrega diferentes eventos a cada etapa del SDLC.
  etapasSDLC.forEach(function (etapa) {

    // Activa la etapa cuando el cursor pasa por encima.
    etapa.addEventListener("mouseenter", function () {
      activarEtapa(etapa);
    });

    // Activa la etapa cuando recibe el foco del teclado.
    etapa.addEventListener("focusin", function () {
      activarEtapa(etapa);
    });

    // También activa la etapa cuando el usuario hace clic.
    etapa.addEventListener("click", function () {
      activarEtapa(etapa);
    });
  });

  //  TARJETAS CAJA NEGRA Y CAJA BLANCA 

  // Busca las tarjetas que tienen la clase "flip-card".
  const tarjetasFlip = document.querySelectorAll(".flip-card");

  // Recorre las tarjetas para agregarles interacción.
  tarjetasFlip.forEach(function (tarjeta) {

    // Al hacer clic, agrega o quita "flipped" para cambiar la tarjeta.
    tarjeta.addEventListener("click", function () {
      tarjeta.classList.toggle("flipped");
    });

    // Permite interactuar con la tarjeta usando el teclado.
    tarjeta.addEventListener("keydown", function (evento) {

      // Comprueba si se presionó Enter o la barra espaciadora.
      if (evento.key === "Enter" || evento.key === " ") {

        // Evita que la barra espaciadora desplace la página.
        evento.preventDefault();

        // Cambia el estado de la tarjeta.
        tarjeta.classList.toggle("flipped");
      }
    });
  });

})(); 
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
const etapas = [
  {
    titulo: "Planificación",
    items: [
      "¿Por qué es valioso este sprint? El propietario expone el valor esperado.",
      "¿Qué se puede hacer? Los desarrolladores eigen elementos de la pila del producto.",
      "¿Cómo se hará? Se descomponen en tareas de un día o menos.",
    ],
     participantes: "Propietario del producto, desarrolladores y Scrum Master.",
duracion: "Hasta una jornada completa.",
resultado: "Pila del sprint y objetivo del sprint."
  },
  {
    titulo: "Desarrollo",
    items: [
      "El equipo se autogestiona y se reparte las tareas de la pila del sprint.",
      "Solo los desarrolladores modifican la pila del sprint.",
      "Se cumple la definicion de <<hecho>> acordada.",
    ],
    participantes: "Desarrolladores",
duracion: "Hasta 4 semanas en total (duración fija)",
resultado: "Incremento terminado, probado y operativo"
  },
  {
    titulo: "Scrum Diario",
    items: [
      "Cada persona cuenta qué logró desde la ultima reunión.",
      "Dice qué hará hasta la siguiente.",
      "Avisa si tiene o prevé algún impedimento.",
    ],
    participantes: "Desarrolladores (otros pueden mirar sin intervenir)",
duracion: "Máximo 15 minutos, cada día",
resultado: "Pila del sprint y gráfico burn down actualizado"

  },
  
  {
    titulo: "Revisión",
    items: [
      "Se muestra el incremento en funcionamiento.",
      "Se repasa lo planificado, lo hecho y lo que quedó pendiente.",
      "Se recogen sugerencias que pueden cambiar la pila del producto.",
    ],
    participantes: "Todo el equipo scrum e interesados",
duracion: "1 a 2 horas (hasta 4 si es complejo)",
resultado: "Feedback para el propietario del producto"

  },
  {
    titulo: "Retrospectiva",
    items: [
      "Se analiza el <<como>> del trabajo, no el producto.",
      "Se identifican fortalezas y puntos debiles.",
      "Se acuerdan acciones de mejora concretas.",
    ],
    participantes: "Todo el equipo scrum",
duracion: "1 a 3 horas",
resultado: "Plan de mejoras para el próximo sprint"

  }
];


const botones = document.querySelectorAll(".paso");
const informacion = document.getElementById("cronogramaInfo");
const informacionExtra = document.getElementById("cronogramaExtra");
const tarjetas = document.querySelector(".cronograma-tarjetas");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const indice = Number(boton.dataset.paso);
    const etapa = etapas[indice];

    if (!etapa || !informacion || !informacionExtra) return;
    tarjetas.classList.add("mostrar");

    botones.forEach((b) => b.classList.remove("activo"));
    boton.classList.add("activo");

    informacion.innerHTML = `
      <span class="etapa-numero">ETAPA 0${indice + 1}</span>
      <h3>${etapa.titulo}</h3>
      <ul>
        ${etapa.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;

    informacionExtra.innerHTML = `
      <h3>Participantes</h3>
      <p>${etapa.participantes}</p>

      <h3>Duración</h3>
      <p>${etapa.duracion}</p>

      <h3>Resultado</h3>
      <p>${etapa.resultado}</p>
    `;
  });
});
// TABLERO INTERACTIVO KANBAN
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

    // En curso admite un máximo de 3 tareas
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

  // Mover con las flechas
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

  // Arrastrar tarjetas
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

  // Reiniciar tablero
  botonReiniciar.addEventListener("click", function () {
    tareas = JSON.parse(JSON.stringify(estadoInicial));
    mostrarTablero();
  });

  mostrarTablero();

})();