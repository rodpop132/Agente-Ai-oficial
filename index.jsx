import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1>Criação de Sites por €200</h1>
        <p>Processo simples em 2 etapas + pagamento seguro.</p>
        <Link href="/checkout" className="btn">Começar Agora</Link>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const PhoneInput = dynamic(
  () => import('react-phone-input-2').then((m) => m.default),
  { ssr: false }
);

export default function Home() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({ name: '', email: '', phone: '' });
  const [details, setDetails] = useState({ niche: '', design: '', pages: '' });
  const [adminLogin, setAdminLogin] = useState({ user: '', pass: '' });
  const [adminAuth, setAdminAuth] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleBasicSubmit = () => setStep(2);
  const handleDetailSubmit = () => {
    const newOrder = { ...basicInfo, ...details, id: Date.now() };
    setOrders([newOrder, ...orders]);
    setStep(3);
  };

  const handleAdminLogin = () => {
    if (adminLogin.user === 'admin' && adminLogin.pass === '1234') {
      setAdminAuth(true);
    }
  };

  return (
    <div style={{ color: '#fff', fontFamily: 'sans-serif', padding: 20, background: '#0f172a', minHeight: '100vh' }}>
      {step === 1 && (
        <div>
          <h2>Pré-Checkout</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
            <input
              placeholder="Nome completo"
              value={basicInfo.name}
              onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
              style={{ padding: 10, borderRadius: 6 }}
            />
            <input
              placeholder="E-mail"
              type="email"
              value={basicInfo.email}
              onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
              style={{ padding: 10, borderRadius: 6 }}
            />
            <PhoneInput
              country={'pt'}
              value={basicInfo.phone}
              onChange={(phone) => setBasicInfo({ ...basicInfo, phone })}
              inputProps={{ name: 'phone', required: true }}
              inputStyle={{ width: '100%' }}
            />
            <button onClick={handleBasicSubmit} style={{ padding: 10, borderRadius: 6 }}>Próximo</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Detalhes do Projeto</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
            <input
              placeholder="Nicho"
              value={details.niche}
              onChange={(e) => setDetails({ ...details, niche: e.target.value })}
              style={{ padding: 10, borderRadius: 6 }}
            />
            <textarea
              placeholder="Preferências de design"
              value={details.design}
              onChange={(e) => setDetails({ ...details, design: e.target.value })}
              style={{ padding: 10, borderRadius: 6 }}
              rows={4}
            />
            <input
              placeholder="Páginas necessárias"
              value={details.pages}
              onChange={(e) => setDetails({ ...details, pages: e.target.value })}
              style={{ padding: 10, borderRadius: 6 }}
            />
            <button onClick={handleDetailSubmit} style={{ padding: 10, borderRadius: 6 }}>Ir para Pagamento</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Pagamento</h2>
          <a
            href="https://buy.stripe.com/4gM8wPcjte4A1E49S15EY01"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#38bdf8' }}
          >
            Clique aqui para pagar
          </a>
        </div>
      )}

      <hr style={{ margin: '24px 0', borderColor: '#334155' }} />
      <h3>Admin Panel Login</h3>
      {!adminAuth ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          <input
            placeholder="Usuário"
            onChange={(e) => setAdminLogin({ ...adminLogin, user: e.target.value })}
            style={{ padding: 10, borderRadius: 6 }}
          />
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => setAdminLogin({ ...adminLogin, pass: e.target.value })}
            style={{ padding: 10, borderRadius: 6 }}
          />
          <button onClick={handleAdminLogin} style={{ padding: 10, borderRadius: 6 }}>Login</button>
        </div>
      ) : (
        <div>
          <h3>Pedidos</h3>
          {orders.length === 0 ? (
            <p>Sem pedidos.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  {order.name} - {order.email} - {order.phone}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


