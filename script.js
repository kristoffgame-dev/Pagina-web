// ==========================================================================
// MOTOR DE INTERACTIVIDAD INTERNA Y REVELACIÓN DE CONTENIDO - DODITECH
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ALGORITMO INTERSECTION OBSERVER (Scroll Reveal Avanzado)
    const elementosParaAnimar = document.querySelectorAll('.animar-subir');

    const configuracionObservador = {
        root: null, 
        threshold: 0.12, 
        rootMargin: "0px 0px -40px 0px" 
    };

    const observadorDePantalla = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('activo');
                observador.unobserve(entrada.target); // Detiene la observación una vez animado
            }
        });
    }, configuracionObservador);

    elementosParaAnimar.forEach(elemento => {
        observadorDePantalla.observe(elemento);
    });

    // 2. CAPTURA Y PROCESAMIENTO DEL FORMULARIO DE CONTACTO PREMIUM
    const formularioContacto = document.getElementById('form-soporte');

    formularioContacto.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const clienteNombre = document.getElementById('nombre').value.trim();
        const clienteCorreo = document.getElementById('correo').value.trim();
        const clienteMensaje = document.getElementById('mensaje').value.trim();

        if (clienteNombre === '' || clienteCorreo === '' || clienteMensaje === '') {
            alert('Por favor, rellene todos los campos del formulario.');
            return;
        }

        // Simulación de trazabilidad interna en consola
        console.log('--- NUEVO LEAD RECIBIDO EN DODITECH ---');
        console.log(`Nombre: ${clienteNombre}`);
        console.log(`Contacto: ${clienteCorreo}`);
        console.log(`Consulta: ${clienteMensaje}`);

        alert(`¡Excelente elección, ${clienteNombre}! Tu requerimiento ha sido enviado con éxito a DODITECH. Analizaremos tu caso de inmediato y nos comunicaremos contigo al correo electrónico ${clienteCorreo}.`);
        
        formularioContacto.reset();
    });
});

// ==========================================================================
// MOTOR MATEMÁTICO EN TIEMPO REAL - SIMULADOR DE LOTES DODITECH
// ==========================================================================
function calcularMargenVivo() {
    const costoLote = parseFloat(document.getElementById('sim-costo').value) || 0;
    const piezasLote = parseInt(document.getElementById('sim-piezas').value) || 0;
    const precioVentaU = parseFloat(document.getElementById('sim-venta').value) || 0;

    const visualPantalla = document.getElementById('sim-pantalla');
    const visualMargen = document.getElementById('demo-margen');

    // Validación matemática preventiva
    if (costoLote <= 0 || piezasLote <= 0 || precioVentaU <= 0) {
        visualPantalla.innerHTML = "⚠️ Ingrese valores numéricos superiores a 0";
        visualMargen.innerText = "0.00%";
        visualMargen.style.color = "#ef4444";
        return;
    }

    // Fórmulas aritméticas de negocio
    const costoPorUnidad = costoLote / piezasLote;
    const ingresosBrutos = precioVentaU * piezasLote;
    const utilidadNeta = ingresosBrutos - costoLote;
    const porcentajeUtilidad = (utilidadNeta / ingresosBrutos) * 100;

    // Formateo bajo estándar regional de moneda
    const costoUnidadFormato = costoPorUnidad.toFixed(2);
    const utilidadFormato = utilidadNeta.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const porcentajeFormato = porcentajeUtilidad.toFixed(2);

    // Renderizado reactivo según estado financiero (Ganancia o Pérdida)
    if (utilidadNeta < 0) {
        visualPantalla.innerHTML = `Costo u.: <strong>$${costoUnidadFormato}</strong> | Pérdida: <strong style="color:#ef4444;">$${utilidadFormato}</strong>`;
        visualMargen.innerText = `${porcentajeFormato}%`;
        visualMargen.style.color = "#ef4444";
    } else {
        visualPantalla.innerHTML = `Costo u.: <strong>$${costoUnidadFormato}</strong> | Ganancia: <strong style="color:#10b981;">+$${utilidadFormato}</strong>`;
        visualMargen.innerText = `${porcentajeFormato}%`;
        visualMargen.style.color = "#10b981";
    }
}