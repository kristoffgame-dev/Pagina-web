// assistant.js - Carga segura y global para Dodi System
(function() {
  // 1. Inyectar los estilos globales del fondo tecnológico
  if (!document.getElementById('dodi-tech-styles')) {
    const globalStyles = document.createElement('style');
    globalStyles.id = 'dodi-tech-styles';
    globalStyles.innerHTML = `
      .tech-grid {
        background-image: linear-gradient(to right, rgba(30, 41, 59, 0.25) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(30, 41, 59, 0.25) 1px, transparent 1px);
        background-size: 36px 36px;
      }
    `;
    document.head.appendChild(globalStyles);
  }

  // 2. Inyectar las capas de fondo tecnológico al cargar el DOM
  function initDodiSystem() {
    // Fondo tecnológico
    if (!document.querySelector('.tech-grid')) {
      const bgContainer = document.createElement('div');
      bgContainer.innerHTML = `
        <div class="fixed inset-0 tech-grid pointer-events-none z-0 opacity-70"></div>
        <div class="fixed inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none z-0"></div>
      `;
      document.body.prepend(bgContainer);
    }

    // Widget del Asistente
    if (!document.getElementById('dodi-assistant-container')) {
      const assistantHTML = `
      <div id="dodi-assistant-container" class="fixed bottom-6 right-6 z-50 font-sans">
        <button id="dodi-chat-toggle" class="relative group bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 p-3.5 rounded-full shadow-2xl shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
          <span class="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-75 pointer-events-none"></span>
          <div class="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            <i class="fa-solid fa-robot animate-pulse"></i>
          </div>
          <span class="absolute -top-10 right-0 bg-slate-800 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ¡Hola! ¿Buscas algún equipo o cotización? 🚀
          </span>
        </button>

        <div id="dodi-chat-box" class="hidden absolute bottom-20 right-0 w-80 md:w-96 bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform translate-y-4 opacity-0 scale-95">
          <div class="bg-gradient-to-r from-slate-900 to-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 text-sm">
                  <i class="fa-solid fa-microchip"></i>
                </div>
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
              </div>
              <div>
                <h4 class="text-white font-bold text-sm tracking-wide">Dodi System - Soporte & Ventas</h4>
                <p class="text-[10px] text-cyan-400 font-mono">En línea • Asesor Tecnológico</p>
              </div>
            </div>
            <button id="dodi-chat-close" class="text-slate-400 hover:text-white transition">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div id="dodi-chat-messages" class="p-4 h-80 overflow-y-auto space-y-3 text-xs text-slate-300 flex flex-col">
            <div class="flex items-start gap-2 max-w-[85%]">
              <div class="w-6 h-6 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center text-cyan-400 text-xs mt-0.5">
                <i class="fa-solid fa-robot"></i>
              </div>
              <div class="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm">
                <p>¡Qué tal! Bienvenido a <strong>Dodi System</strong>. 🚀 Estoy aquí para asesorarte con nuestros equipos, redes y cotizaciones. ¿Qué necesitas hoy?</p>
              </div>
            </div>
          </div>

          <div class="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input type="text" id="dodi-chat-input" placeholder="Escribe tu duda o producto..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition">
            <button id="dodi-chat-send" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3.5 py-2 rounded-xl transition font-bold flex items-center justify-center">
              <i class="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      </div>`;

      document.body.insertAdjacentHTML('beforeend', assistantHTML);

      // Eventos de apertura y cierre
      const toggleBtn = document.getElementById('dodi-chat-toggle');
      const chatBox = document.getElementById('dodi-chat-box');
      const closeBtn = document.getElementById('dodi-chat-close');

      if (toggleBtn && chatBox && closeBtn) {
        toggleBtn.addEventListener('click', () => {
          if (chatBox.classList.contains('hidden')) {
            chatBox.classList.remove('hidden');
            setTimeout(() => { chatBox.classList.remove('translate-y-4', 'opacity-0', 'scale-95'); }, 10);
          } else {
            chatBox.classList.add('translate-y-4', 'opacity-0', 'scale-95');
            setTimeout(() => { chatBox.classList.add('hidden'); }, 300);
          }
        });

        closeBtn.addEventListener('click', () => {
          chatBox.classList.add('translate-y-4', 'opacity-0', 'scale-95');
          setTimeout(() => { chatBox.classList.add('hidden'); }, 300);
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDodiSystem);
  } else {
    initDodiSystem();
  }
})();