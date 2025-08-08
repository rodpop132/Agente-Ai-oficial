import React from 'react';

export default function Pagamento() {
  return (
    <main className="container">
      <div className="card">
        <h2>Pagamento</h2>
        <p>Finalize o pagamento seguro pelo Stripe.</p>
        <a
          href="https://buy.stripe.com/4gM8wPcjte4A1E49S15EY01"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Pagar €200
        </a>
      </div>
    </main>
  );
}


