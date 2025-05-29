// frontend/src/app/categorys/components/obtener.component.tsx
'use client';

import React from 'react';
import { Category } from '@/app/categorys/api';

interface ObtenerCategoriasProps {
  categories: Category[];
  onSelect: (id_category: string | null) => void; // Permite pasar null para deseleccionar
  selectedCategory: string | null;
}

export default function ObtenerCategorias({ categories, onSelect, selectedCategory }: ObtenerCategoriasProps) {

  const handleClick = (id: string) => {
    // Si la categoría clickeada ya está seleccionada, la deselecciona (pasando null)
    // De lo contrario, selecciona la nueva categoría
    const newSelection = selectedCategory === id ? null : id;
    onSelect(newSelection);
    console.log('Categoría clickeada (ID):', newSelection);
  };

  const handleShowAll = () => {
    onSelect(null); // Deselecciona cualquier categoría
    console.log('Mostrando todas las categorías.');
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Seleccionar Categoría</h2>
      {categories.length === 0 ? (
        <p>No hay categorías disponibles. Crea una.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {/* Botón para mostrar todas las campañas (deseleccionar categoría) */}
          <button
            className={`font-bold py-2 px-4 rounded-xl shadow 
              ${selectedCategory === null
                ? 'bg-blue-600 text-white hover:bg-blue-700' // Estilo para "Todas" seleccionada
                : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            onClick={handleShowAll}
          >
            Seccion Principal
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id_category}
              className={`font-bold py-2 px-4 rounded-xl shadow 
                ${selectedCategory === cat.id_category
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                  : 'bg-gray-200 text-black hover:bg-gray-300'}`}
              onClick={() => handleClick(cat.id_category)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



