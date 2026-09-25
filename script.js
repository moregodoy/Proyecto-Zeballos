(function(){
  // Mobile menu
  var burger = document.getElementById('burgerBtn');
  var nav = document.getElementById('primaryNav');
  burger.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
  });

  // Scroll-spy active nav link
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function onScroll(){
    var pos = window.scrollY + 100;
    var current = sections[0];
    sections.forEach(function(s){ if (s.offsetTop <= pos) current = s; });
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + current.id); });
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Generic tab groups
  function wireTabs(btnSelector, dataAttr, panelAttr){
    var buttons = document.querySelectorAll(btnSelector);
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var group = btn.parentElement;
        group.querySelectorAll(btnSelector.replace(/^\./,'.')).forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var key = btn.getAttribute(dataAttr);
        var panels = document.querySelectorAll('[' + panelAttr + ']');
        panels.forEach(function(p){
          var belongsToSameGroup = p.getAttribute(panelAttr+'') !== null;
          if(belongsToSameGroup){
            var match = p.getAttribute(panelAttr) === key;
            // only toggle panels that are siblings of this tabbar's panel set
          }
        });
      });
    });
  }

  // Fundamentos tabs
  var fundTabs = document.querySelectorAll('[data-tab]');
  fundTabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      fundTabs.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var key = btn.getAttribute('data-tab');
      document.querySelectorAll('[data-panel]').forEach(function(p){
        p.classList.toggle('active', p.getAttribute('data-panel') === key);
      });
    });
  });

  // Modelos tradicionales tabs
  var modelTabs = document.querySelectorAll('[data-tab2]');
  modelTabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      modelTabs.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var key = btn.getAttribute('data-tab2');
      document.querySelectorAll('[data-panel2]').forEach(function(p){
        p.classList.toggle('active', p.getAttribute('data-panel2') === key);
      });
    });
  });

  // Caja negra / blanca flip cards (toggle content on click, works with mouse and touch)
  function setupFlip(cardId, titleId, textId, stateA, stateB){
    var card = document.getElementById(cardId);
    var title = document.getElementById(titleId);
    var text = document.getElementById(textId);
    var showingA = true;
    card.addEventListener('click', function(){
      showingA = !showingA;
      var s = showingA ? stateA : stateB;
      title.textContent = s.title;
      text.textContent = s.text;
      card.classList.toggle('on', !showingA);
      card.setAttribute('aria-expanded', (!showingA).toString());
    });
  }
  setupFlip('flipCaja','flipCajaTitle','flipCajaText',
    { title:'Caja negra', text:'Se prueba la entrada y salida del sistema sin conocer su implementación interna.' },
    { title:'Caja negra — detalle', text:'También llamada prueba funcional: valida casos de uso, clases de equivalencia y valores límite sin mirar el código.' }
  );
  setupFlip('flipCaja2','flipCaja2Title','flipCaja2Text',
    { title:'Caja blanca', text:'Se diseñan casos de prueba conociendo la estructura interna y el código fuente.' },
    { title:'Caja blanca — detalle', text:'También llamada prueba estructural: busca cobertura de sentencias, ramas y caminos dentro del código.' }
  );

  // Herramientas filter
  var filterBtns = document.querySelectorAll('#toolFilters .filter-btn');
  var toolCards = document.querySelectorAll('#toolGrid .tool-card');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-cat');
      toolCards.forEach(function(card){
        var show = cat === 'todas' || card.getAttribute('data-cat') === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
// ===== INTERACCIÓN SDLC =====

const etapasSDLC = document.querySelectorAll("#sdlcTimeline .tl-step");

etapasSDLC.forEach(function(etapa) {

    etapa.addEventListener("mouseenter", function() {

        etapasSDLC.forEach(function(item) {
            item.classList.remove("active");
        });

        etapa.classList.add("active");
    });

    etapa.addEventListener("mouseleave", function() {
        etapa.classList.remove("active");
    });

});
// ===== US-06 MODELOS TRADICIONALES =====

const botonesModelos = document.querySelectorAll("[data-tab2]");
const panelesModelos = document.querySelectorAll("[data-panel2]");

botonesModelos.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const modelo = boton.getAttribute("data-tab2");

        // Quitar activo de todos los botones
        botonesModelos.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Ocultar todos los paneles
        panelesModelos.forEach(function(panel) {
            panel.classList.remove("active");
        });

        // Activar el botón seleccionado
        boton.classList.add("active");

        // Mostrar el panel correspondiente
        const panelActivo = document.querySelector(
            '[data-panel2="' + modelo + '"]'
        );

        if (panelActivo) {
            panelActivo.classList.add("active");
        }

    });

});
