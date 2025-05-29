const API_BASE = 'http://localhost:4000/api/v1';

export const createPayment = async (id_donation: string, amount: number) => {
  const res = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_donation, amount }),
  });

  if (!res.ok) throw new Error('Error al procesar el pago');
  return await res.json();
};
