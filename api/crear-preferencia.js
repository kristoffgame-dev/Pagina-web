// api/crear-preferencia.js
import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificar que el token exista en Vercel
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    console.error("ERROR: Falta la variable MP_ACCESS_TOKEN en Vercel");
    return res.status(500).json({ 
      error: "Error de configuración en el servidor", 
      detalles: "Falta la credencial MP_ACCESS_TOKEN en las variables de entorno de Vercel." 
    });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Configuración del cliente de Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    // Formatear items para Mercado Pago
    const itemsMercadoPago = items.map((item, idx) => ({
      id: item.id || `prod-${idx}`,
      title: item.nombre || 'Producto DODI SYSTEM',
      unit_price: Number(item.precio) || 0,
      quantity: 1,
      currency_id: 'MXN',
      description: item.descripcion || 'Producto / Servicio Digital'
    }));

    const host = req.headers.host || 'dodisystem.com';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const origin = `${protocol}://${host}`;

    const preferenceData = {
      items: itemsMercadoPago,
      back_urls: {
        success: `${origin}/exito.html`,
        failure: `${origin}/productos.html?status=failure`,
        pending: `${origin}/productos.html?status=pending`
      },
      auto_return: 'approved',
      statement_descriptor: 'DODI SYSTEM'
    };

    const response = await preference.create({ body: preferenceData });

    // Responder con el enlace de pago de Mercado Pago
    return res.status(200).json({ init_point: response.init_point });

  } catch (error) {
    console.error("Error al crear preferencia en Mercado Pago:", error);
    return res.status(500).json({ 
      error: "Error al procesar con Mercado Pago", 
      detalles: error.message || "Verifica los registros en Vercel." 
    });
  }
}