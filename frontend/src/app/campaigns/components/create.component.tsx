'use client';
import { useState } from 'react';
import { createCampaign } from '../api';

interface Props {
  categoryId: string;
  onCampaignCreated: (newCampaign: any) => void;
}

export default function CreateCampaign({ categoryId, onCampaignCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [phonet, setPhonet] = useState('');
  const [meta, setMeta] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const campaignData = {
      title,
      description,
      phonet,
      meta: parseFloat(meta),
      start_date: startDate,
      end_date: endDate,
      id_category: categoryId,
    };

    try {
      const created = await createCampaign(campaignData);
      onCampaignCreated(created); // 🔥 notificar al padre

      // Limpiar campos
      setTitle('');
      setDescription('');
      setPhonet('');
      setMeta('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error(error);
      alert('Error al crear la campaña');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Crear Nueva Campaña</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Título" className="w-full border px-3 py-2 rounded"
          value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Descripción" className="w-full border px-3 py-2 rounded"
          value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Teléfono" className="w-full border px-3 py-2 rounded"
          value={phonet} onChange={(e) => setPhonet(e.target.value)} required />
        <input type="number" step="0.01" placeholder="Meta (monto)" className="w-full border px-3 py-2 rounded"
          value={meta} onChange={(e) => setMeta(e.target.value)} required />
        <input type="date" className="w-full border px-3 py-2 rounded"
          value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" className="w-full border px-3 py-2 rounded"
          value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit"
          className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-500">
          Crear Campaña
        </button>
      </form>
    </div>
  );
}




