// frontend/src/app/categorys/api.ts

const API_BASE = 'http://localhost:4000/api/v1';

export interface Category { // Asegúrate de que esta interfaz esté definida
  id_category: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export const createCategory = async (name: string): Promise<Category> => {
  const res = await fetch(`${API_BASE}/categorys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al crear categoría');
  }
  return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/categorys`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al obtener categorías');
  }
  return res.json();
};
