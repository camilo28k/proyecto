const API_BASE = 'http://localhost:4000/api/v1';

export async function donateToCampaign(id_campaign: string, amount: number) {
  // 1. Crear donación en backend (simulación, debes usar tu endpoint real)
// 1. Crear donación en backend
const donationRes = await fetch(`${API_BASE}/donations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id_campaign, amount }),
});
if (!donationRes.ok) throw new Error('Error al crear donación');

// 👇 Aquí colocas el console.log
const donationData = await donationRes.json();
console.log('Respuesta de /donations:', donationData);

  console.log("Monto enviado al backend para crear factura:", amount);


  // 2. Crear factura con el id_donation y amount
  const facturaRes = await fetch(`${API_BASE}/facturas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_donation: donationData.id_donation, amount }),
  });
  if (!facturaRes.ok) throw new Error('Error al crear factura');
  const facturaData = await facturaRes.json();

  // 3. Devolver objeto con campaña actualizada + id_factura para redirección
  return {  // o lo que devuelva tu API para campaña
    factura: facturaData,
  };
}


