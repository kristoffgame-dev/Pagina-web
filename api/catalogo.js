// api/catalogo.js
export default async function handler(req, res) {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlIDGOtZ3dKfIGJZLst6z6bMEL4j9TjAEvmFB36P0wAMoTRBrHd4sgvxunMDa-GmO4SPWNajJK2U5R/pub?output=csv";

  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Error al conectar con Google Sheets: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');

    if (lines.length < 2) {
      return res.status(200).json([]);
    }

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
    const productos = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === 0) continue;

      let item = {};
      headers.forEach((header, index) => {
        item[header] = values[index] ? values[index].trim() : '';
      });

      const productoFinal = {
        id: item.id || `prod-${i}`,
        nombre: item.nombre || item.titulo || item.product || item.producto || 'Producto sin nombre',
        precio: parseFloat(item.precio || item.price || 0),
        descripcion: item.descripcion || item.description || '',
        imagen: item.imagen || item.image || item.img || item.foto || '',
        categoria: item.categoria || item.category || 'General'
      };

      productos.push(productoFinal);
    }

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json(productos);

  } catch (error) {
    console.error("Error crítico en API catálogo:", error.message);
    return res.status(500).json({ error: "No se pudo cargar el catálogo", detalles: error.message });
  }
}

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}