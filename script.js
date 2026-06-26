// ==========================================================================
// MOTOR DE INTERACTIVIDAD Y ANIMACIONES AVANZADAS - DODITECH
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMACIÓN SCROLL REVEAL (Aparición fluida de elementos)
    const elementosAnimados = document.querySelectorAll('.animar-subir');

    const opcionesContenedor = {
        root: null, 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const observadorScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('activo');
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesContenedor);

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
    const costoLote = parseFloat(document.getElementById('sim-costo').value) || 0;
    const piezas = parseInt(document.getElementById('sim-piezas').value) || 0;
    const precioVentaUnitario = parseFloat(document.getElementById('sim-venta').value) || 0;

    const pantalla = document.getElementById('sim-pantalla');
    const margenTxt = document.getElementById('demo-margen');

    if (costoLote <= 0 || piezas <= 0 || precioVentaUnitario <= 0) {
        pantalla.innerHTML = "⚠️ Introduce valores mayores a 0";
        margenTxt.innerText = "0.00%";
        margenTxt.style.color = "#ef4444";
        return;
    }

    const costoUnitario = costoLote / piezas;
    const ingresosTotales = precioVentaUnitario * piezas;
    const gananciaNeta = ingresosTotales - costoLote;
    const porcentajeMargen = (gananciaNeta / ingresosTotales) * 100;

    const costoUnitarioFormato = costoUnitario.toFixed(2);
    const gananciaFormato = gananciaNeta.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const margenFormato = porcentajeMargen.toFixed(2);

    if (gananciaNeta < 0) {
        pantalla.innerHTML = `Costo u.: <strong>$${costoUnitarioFormato}</strong> | Pérdida: <strong style="color:#ef4444;">$${gananciaFormato}</strong>`;
        margenTxt.innerText = `${margenFormato}%`;
        margenTxt.style.color = "#ef4444";
    } else {
        pantalla.innerHTML = `Costo u.: <strong>$${costoUnitarioFormato}</strong> | Ganancia: <strong style="color:#10b981;">+$${gananciaFormato}</strong>`;
        margenTxt.innerText = `${margenFormato}%`;
        margenTxt.style.color = "#10b981";
    }
}