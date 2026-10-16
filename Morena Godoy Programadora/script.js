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
// Fin de la función principal.