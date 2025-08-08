let ORDERS = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ orders: ORDERS });
  }
  if (req.method === 'POST') {
    const { name, email, phone, niche, design, pages } = req.body || {};
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    const order = {
      id: Date.now(),
      name,
      email,
      phone,
      niche: niche || '',
      design: design || '',
      pages: pages || ''
    };
    ORDERS.unshift(order);
    return res.status(201).json({ ok: true, order });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}


