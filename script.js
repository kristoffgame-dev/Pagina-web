// ==========================================================================
// MOTOR DE INTERACTIVIDAD Y ANIMACIONES AVANZADAS - DODITECH
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMACIÓN SCROLL REVEAL (Aparición fluida de elementos)
    const elementosAnimados = document.querySelectorAll('.animar-subir');

    const opcionesContenedor = {
        root: null, // Usa la pantalla del navegador como base
        threshold: 0.15, // Se activa cuando el 15% del elemento ya es visible
        rootMargin: "0px 0px -50px 0px" // Margen de seguridad inferior
    };

    const observadorScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Añade la clase CSS que ejecuta la transición suave
                entrada.target.classList.add('activo');
                // Dejamos de vigilarlo para mejorar el rendimiento del navegador
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesContenedor);

    // Activamos el vigilante en todas las secciones marcadas
    elementosAnimados.forEach(elemento => {
        observadorScroll.observe(elemento);
    });

    // 2. CONTROLADOR E INTERACTIVIDAD DEL FORMULARIO DE CONTACTO
    const formulario = document.getElementById('form-soporte');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre === '' || correo === '' || mensaje === '') {
            alert('Por favor, ingresa todos los campos requeridos.');
            return;
        }

        console.log('--- Registro de Interacción Exitoso ---');
        console.log(`Prospecto: ${nombre} (${correo})`);
        console.log(`Mensaje: ${mensaje}`);

        alert(`¡Excelente elección, ${nombre}! Tu mensaje ha sido enviado con éxito a Doditech. Me pondré en contacto contigo al correo electrónico ${correo} lo antes posible para revisar tu proyecto.`);
        
        formulario.reset();
    });
});

// ==========================================================================
// MOTOR DE CÁLCULO DINÁMICO EN VIVO - DODITECH LOTES
// ==========================================================================
function calcularMargenVivo() {
    // 1. Capturamos los valores que el usuario escribe en la pantalla
    const costoLote = parseFloat(document.getElementById('sim-costo').value) || 0;
    const piezas = parseInt(document.getElementById('sim-piezas').value) || 0;
    const precioVentaUnitario = parseFloat(document.getElementById('sim-venta').value) || 0;

    const pantalla = document.getElementById('sim-pantalla');
    const margenTxt = document.getElementById('demo-margen');

    // 2. Validación de seguridad para evitar divisiones entre cero
    if (costoLote <= 0 || piezas <= 0 || precioVentaUnitario <= 0) {
        pantalla.innerHTML = "⚠️ Introduce valores mayores a 0";
        margenTxt.innerText = "0.00%";
        margenTxt.style.color = "#ef4444"; // Rojo de advertencia
        return;
    }

    // 3. Aplicamos las fórmulas lógicas de negocio
    const costoUnitario = costoLote / piezas;
    const ingresosTotales = precioVentaUnitario * piezas;
    const gananciaNeta = ingresosTotales - costoLote;
    const porcentajeMargen = (gananciaNeta / ingresosTotales) * 100;

    // 4. Formateamos los números para que siempre muestren dos decimales fijos
    const costoUnitarioFormato = costoUnitario.toFixed(2);
    const gananciaFormato = gananciaNeta.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const margenFormato = porcentajeMargen.toFixed(2);

    // 5. Inyectamos los resultados en vivo en la interfaz del cliente
    if (gananciaNeta < 0) {
        // Si hay pérdidas, pinta en rojo
        pantalla.innerHTML = `Costo u.: <strong>$${costoUnitarioFormato}</strong> | Pérdida: <strong style="color:#ef4444;">$${gananciaFormato}</strong>`;
        margenTxt.innerText = `${margenFormato}%`;
        margenTxt.style.color = "#ef4444";
    } else {
        // Si hay ganancias, pinta en verde tecnológico
        pantalla.innerHTML = `Costo u.: <strong>$${costoUnitarioFormato}</strong> | Ganancia: <strong style="color:#10b981;">+$${gananciaFormato}</strong>`;
        margenTxt.innerText = `${margenFormato}%`;
        margenTxt.style.color = "#10b981";
    }
}