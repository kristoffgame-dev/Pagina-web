// api/catalogo.js
export default async function handler(req, res) {
  const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

  if (!GOOGLE_SHEETS_URL) {
    return res.status(500).json({ error: 'Falta configurar GOOGLE_SHEETS_URL' });
  }

  try {
    // Timeout estricto de 4 segundos para que Google no bloquee la respuesta
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(GOOGLE_SHEETS_URL, { 
      signal: controller.signal,
      redirect: 'follow' 
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Google Sheets respondió con estado ${response.status}`);
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error en proxy de catálogo:", error.message);
    // Devolvemos un array vacío controlado para que la página no se quede congelada
    return res.status(500).json({ error: 'Timeout o error al conectar con Google Sheets', productos: [] });
  }
}