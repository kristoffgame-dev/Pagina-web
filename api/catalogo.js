// api/catalogo.js
export default async function handler(req, res) {
  // 1. Pega aquí tu URL nueva de la Web App de Apps Script (la que termina en /exec o /dev)
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLjdzLCwKcjaNdCW1AB91QgaKOC1N-0mrWGi1VvgksOtqqaqHe9OP95cayFAHzgWrJmw/exec";

  try {
    const response = await fetch(APPS_SCRIPT_URL);
    if (!response.ok) {
      throw new Error(`Error al conectar con Google Apps Script: ${response.status}`);
    }

    const productos = await response.json();

    if (!Array.isArray(productos)) {
      return res.status(200).json([]);
    }

    // 2. Mapeamos y aseguramos que 'stock', 'imagen_url', 'video_url' y todas tus columnas pasen intactas
    const productosFinales = productos.map((item, i) => {
      return {
        ...item, // Esto conserva AUTOMÁTICAMENTE stock, imagen_url, video_url y cualquier columna nueva
        id: item.id || `prod-${i}`,
        nombre: item.nombre || item.titulo || 'Producto sin nombre',
        precio: parseFloat(item.precio || 0),
        descripcion: item.descripcion || '',
        imagen: item.imagen_url || item.imagen || '',
        video: item.video_url || item.video || '',
        stock: item.stock !== undefined ? parseInt(item.stock, 10) : 0,
        categoria: item.categoria || 'General'
      };
    });

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=15');
    return res.status(200).json(productosFinales);

  } catch (error) {
    console.error("Error crítico en API catálogo:", error.message);
    return res.status(500).json({ error: "No se pudo cargar el catálogo", detalles: error.message });
  }
}