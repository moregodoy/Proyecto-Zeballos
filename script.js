
(function () {
  // ===== MENÚ PARA CELULARES =====
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("primaryNav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      const abierto = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(abierto));
    });

    nav.querySelectorAll("a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    // ===== RESALTAR LA SECCIÓN ACTUAL =====
    const enlaces = Array.from(nav.querySelectorAll('a[href^="#"]'));

    const secciones = enlaces
      .map(function (enlace) {
        return document.querySelector(enlace.getAttribute("href"));
      })
      .filter(Boolean);

    function actualizarMenu() {
      let actual = secciones[0];

      secciones.forEach(function (seccion) {
        if (seccion.getBoundingClientRect().top <= 120) {
          actual = seccion;
        }
      });

      if (actual) {
        enlaces.forEach(function (enlace) {
          const activo =
            enlace.getAttribute("href") === "#" + actual.id;

          enlace.classList.toggle("active", activo);
        });
      }
    }

    document.addEventListener("scroll", actualizarMenu, {
      passive: true
    });

    actualizarMenu();
  }

  // ===== PESTAÑAS DE FUNDAMENTOS: ISO 9126 E ISO 25000 =====
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

  // ===== PESTAÑAS DE MODELOS TRADICIONALES =====
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

  // ===== FILTRO DE HERRAMIENTAS =====
  const botonesFiltro = document.querySelectorAll(
    ".tool-filters .tool-filter"
  );

  const tarjetas = document.querySelectorAll(
    "#toolsGrid .tool-card"
  );

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const filtro = boton.getAttribute("data-filter");

      botonesFiltro.forEach(function (otroBoton) {
        otroBoton.classList.toggle("active", otroBoton === boton);
      });

      tarjetas.forEach(function (tarjeta) {
        const categoria = tarjeta.getAttribute("data-category");

        tarjeta.hidden =
          filtro !== "todos" && categoria !== filtro;
      });
    });
  });

  // ===== INTERACCIÓN DE LAS ETAPAS DEL SDLC =====
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

  // ===== TARJETAS CAJA NEGRA Y CAJA BLANCA =====
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
