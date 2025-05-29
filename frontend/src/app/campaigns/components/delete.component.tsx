'use client';

import React from 'react';
import { deleteCampaign } from '@/app/campaigns/api';

interface Props {
  id_campaign: string;
  onDelete: () => void;
}

export default function DeleteCampaignButton({ id_campaign, onDelete }: Props) {
  const handleDelete = async () => {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta campaña?');
    if (!confirmDelete) return;

    try {
      await deleteCampaign(id_campaign);
      onDelete(); // Refrescar la lista de campañas
    } catch (error) {
      console.error('Error al eliminar la campaña:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Eliminar
    </button>
  );
}
