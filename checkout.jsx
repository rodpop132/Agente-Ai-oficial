import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';

const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

export default function Checkout() {
  const [step, setStep] = useState(1);

  const [basicInfo, setBasicInfo] = useState({ name: '', email: '', phone: '' });
  const [details, setDetails] = useState({ niche: '', design: '', pages: '' });

  const submitBasic = async () => {
    if (!basicInfo.name || !basicInfo.email || !basicInfo.phone) return;
    setStep(2);
  };

  const submitDetails = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...basicInfo, ...details })
      });
      if (!res.ok) throw new Error('Falha ao salvar pedido');
      Router.push('/checkout/pagamento');
    } catch (err) {
      alert('Erro ao criar pedido. Tente novamente.');
    }
  };

  return (
    <main className="container">
      {step === 1 && (
        <div className="card">
          <h2>1) Informações Básicas</h2>
          <div className="stack" style={{ maxWidth: 480 }}>
            <input
              placeholder="Nome completo"
              value={basicInfo.name}
              onChange={(e) => setBasicInfo((s) => ({ ...s, name: e.target.value }))}
            />
            <input
              placeholder="E-mail"
              type="email"
              value={basicInfo.email}
              onChange={(e) => setBasicInfo((s) => ({ ...s, email: e.target.value }))}
            />
            <PhoneInput
              country="pt"
              value={basicInfo.phone}
              onChange={(val) => setBasicInfo((s) => ({ ...s, phone: val }))}
              inputStyle={{ width: '100%' }}
              inputProps={{ name: 'phone', required: true }}
            />
            <button onClick={submitBasic}>Continuar</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>2) Detalhes do Site</h2>
          <div className="stack" style={{ maxWidth: 520 }}>
            <input
              placeholder="Nicho (ex: restaurante, clínica, e-commerce)"
              value={details.niche}
              onChange={(e) => setDetails((s) => ({ ...s, niche: e.target.value }))}
            />
            <textarea
              placeholder="Preferências de design (cores, referências, estilo)"
              rows={4}
              value={details.design}
              onChange={(e) => setDetails((s) => ({ ...s, design: e.target.value }))}
            />
            <input
              placeholder="Páginas necessárias (ex: Home, Sobre, Contacto)"
              value={details.pages}
              onChange={(e) => setDetails((s) => ({ ...s, pages: e.target.value }))}
            />
            <button onClick={submitDetails}>Salvar e Ir para Pagamento</button>
          </div>
        </div>
      )}
    </main>
  );
}


