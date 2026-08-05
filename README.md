# DODITECH v2 — sitio de conversión

Versión rediseñada a partir del proyecto original.

## Cambios principales
- Mensaje principal centrado en el problema y beneficio del cliente.
- Navegación móvil funcional.
- Servicios con llamadas a la acción específicas.
- Proceso de trabajo y preguntas frecuentes.
- Simulador de márgenes conservado y mejor presentado.
- Formulario que prepara una cotización para WhatsApp.
- Página de productos corregida y sin imágenes inexistentes.
- SEO, Open Graph, accesibilidad y estructura semántica mejorados.
- Sin dependencias externas: funciona como sitio estático en Vercel.

## Antes de publicar
Abre `script.js` y configura:

```js
const CONFIG = {
  whatsappNumber: "527442320022",
  contactEmail: "contacto@tudominio.com"
};
```

El número debe incluir código de país y contener solo números.

## Publicación
1. Sustituye los archivos actuales por estos.
2. Abre `index.html` localmente para revisar.
3. Haz commit y push a tu repositorio.
4. Vercel desplegará la actualización.

## Recomendaciones siguientes
- Conectar un dominio propio.
- Agregar Analytics y Search Console.
- Incorporar casos reales y testimonios verificados.
- Crear páginas individuales para cada servicio.
