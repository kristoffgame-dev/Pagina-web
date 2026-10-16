// api/crear-preferencia.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { items } = req.body;

    // Petición segura a la API de Mercado Pago usando tu Token secreto guardado en Vercel
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` // Aquí toma tu llave de forma segura
      },
      body: JSON.stringify({
        items: items.map(item => ({
          title: item.title,
          unit_price: Number(item.unit_price),
          quantity: Number(item.quantity),
          currency_id: 'MXN'
        })),
        back_urls: {
          success: "https://dodisystem.com/gracias.html",
          failure: "https://dodisystem.com/productos.html",
          pending: "https://dodisystem.com/productos.html"
        },
        auto_return: "approved"
      })
    });

    const data = await response.json();

    if (data.init_point) {
      return res.status(200).json({ init_point: data.init_point });
    } else {
      return res.status(400).json({ error: 'No se pudo generar la preferencia', details: data });
    }

  } catch (error) {
    console.error("Error en servidor:", error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}