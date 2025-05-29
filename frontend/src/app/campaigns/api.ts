const API_BASE = 'http://localhost:4000/api/v1';

// ✅ Obtener campañas por categoría
export const getCampaignsByCategory = async (id_category: string) => {
  const res = await fetch(`${API_BASE}/campaigns/categorys/${id_category}`);
  if (!res.ok) throw new Error("Error al obtener campañas");
  return res.json();
};

// ✅ Crear campaña
export const createCampaign = async (campaign: any) => {
  const res = await fetch(`${API_BASE}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });
  if (!res.ok) throw new Error("Error al crear campaña");
  return res.json();
};

// ✅ Actualizar campaña
export const updateCampaign = async (campaign: any) => {
  const res = await fetch(`${API_BASE}/campaign`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });
  if (!res.ok) throw new Error("Error al actualizar campaña");
  return res.json();
};


// ✅ Eliminar campaña
export const deleteCampaign = async (id_campaign: string) => {
  const res = await fetch(`${API_BASE}/campaigns/${id_campaign}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar campaña");
  return res.json();
};


