import React, { useMemo, useState } from 'react';

const DEFAULT_USERS = [
  { user: 'admin', pass: '1234' },
  { user: 'gestor', pass: '5678' }
];

export default function Admin() {
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState([]);

  const login = async () => {
    const ok = DEFAULT_USERS.some(
      (u) => u.user === creds.user && u.pass === creds.pass
    );
    if (ok) {
      setAuthed(true);
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch {}
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <main className="container">
      {!authed ? (
        <div className="card" style={{ maxWidth: 360 }}>
          <h2>Login Admin</h2>
          <div className="stack">
            <input
              placeholder="Usuário"
              value={creds.user}
              onChange={(e) => setCreds((s) => ({ ...s, user: e.target.value }))}
            />
            <input
              placeholder="Senha"
              type="password"
              value={creds.pass}
              onChange={(e) => setCreds((s) => ({ ...s, pass: e.target.value }))}
            />
            <button onClick={login}>Entrar</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2>Pedidos Abertos</h2>
          {orders.length === 0 ? (
            <p>Sem pedidos.</p>
          ) : (
            <ul>
              {orders.map((o) => (
                <li key={o.id}>
                  <strong>{o.name}</strong> — {o.email} — {o.phone}
                  <div style={{ fontSize: 14, color: '#94a3b8' }}>
                    Nicho: {o.niche || '—'} | Páginas: {o.pages || '—'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}


