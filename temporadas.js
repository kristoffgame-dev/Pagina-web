// ==========================================
// SISTEMA GLOBAL DE TEMPORADAS - DODI SYSTEM
// ==========================================

function inicializarSistemaTemporadas() {
  // Nota: El menú visual para cambiar de temporada se ha ocultado del cliente.
  // Elige aquí abajo cuál temporada quieres que esté activa en todo el sitio web:
  
  // Opciones disponibles: 'ninguna', 'buenfin', 'halloween', 'navidad', 'primavera', 'verano', 'otono'
  let temporadaActiva = 'ninguna'; 

  // --- AUTOMATIZACIÓN OPCIONAL POR FECHAS ---
  const hoy = new Date();
  const mes = hoy.getMonth() + 1; // 1 a 12
  const dia = hoy.getDate();

  // Puedes programar fechas automáticas aquí si lo deseas:
  if (mes === 10) {
    temporadaActiva = 'halloween'; // Todo octubre
  } else if (mes === 11) {
    temporadaActiva = 'buenfin'; // Todo noviembre (Buen Fin / Hot Sale)
  } else if (mes === 12 && dia <= 26) {
    temporadaActiva = 'navidad'; // Diciembre hasta Navidad
  }
  // ------------------------------------------

  // Aplicar la temporada seleccionada de forma silenciosa
  if (temporadaActiva !== 'ninguna') {
    activarEfectoTemporada(temporadaActiva);
  }
}

function activarEfectoTemporada(tipo) {
  // Remover efecto anterior si ya existe
  const contenedorAnterior = document.getElementById('efecto-estacional');
  if (contenedorAnterior) contenedorAnterior.remove();

  if (tipo === 'ninguna') return;

  const contenedor = document.createElement('div');
  contenedor.id = 'efecto-estacional';
  contenedor.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 40; overflow: hidden;';
  document.body.appendChild(contenedor);

  // Emojis según la temporada
  let iconos = [];
  if (tipo === 'buenfin') {
    iconos = ['🛍️', '💸', '🛒', '%', '🔥', '📦', '💳', '✨'];
  } else if (tipo === 'halloween') {
    iconos = ['🎃', '👻', '🦇', '🍬', '🕷️', '🕸️'];
  } else if (tipo === 'navidad') {
    iconos = ['❄️', '❅', '❆', '🎁', '⭐', '🎄', '✨'];
  } else if (tipo === 'primavera') {
    iconos = ['🌸', '🌷', '🦋', '🌱', '🌼', '🐝'];
  } else if (tipo === 'verano') {
    iconos = ['☀️', '🌴', '🕶️', '🌊', '🍹', '🐚'];
  } else if (tipo === 'otono') {
    iconos = ['🍂', '🍁', '🌰', '🪵', '🦊'];
  }

  const cantidad = 20;

  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement('div');
    el.textContent = iconos[Math.floor(Math.random() * iconos.length)];
    el.style.cssText = `
      position: absolute;
      top: -50px;
      left: ${Math.random() * 100}vw;
      font-size: ${Math.random() * 1.2 + 0.9}rem;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: caerAnimacion ${Math.random() * 6 + 6}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    contenedor.appendChild(el);
  }

  // Inyectar animación CSS global si no existe
  if (!document.getElementById('estilo-caida')) {
    const estilo = document.createElement('style');
    estilo.id = 'estilo-caida';
    estilo.innerHTML = `
      @keyframes caerAnimacion {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(105vh) rotate(360deg); }
      }
    `;
    document.head.appendChild(estilo);
  }
}

// Inicializar al cargar la página en silencio
document.addEventListener('DOMContentLoaded', inicializarSistemaTemporadas);