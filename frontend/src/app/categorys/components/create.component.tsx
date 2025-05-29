// frontend/src/app/categorys/components/create.component.tsx
'use client';

import React, { useState } from 'react';
import { createCategory, Category } from '@/app/categorys/api';

interface FormCategoryProps {
  onCategoryCreated: (newCategory: Category) => void;
}

export default function FormCategory({ onCategoryCreated }: FormCategoryProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    setLoading(true);
    try {
      const newCategory = await createCategory(name);
      alert('✅ Categoría creada con éxito!');
      setName('');
      onCategoryCreated(newCategory);
    } catch (err: any) {
      console.error('Error al crear categoría:', err.message);
      alert(`❌ Error al crear categoría: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre de la Categoría:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
        disabled={loading}
      >
        {loading ? 'Creando...' : 'Crear Categoría'}
      </button>
    </form>
  );
}