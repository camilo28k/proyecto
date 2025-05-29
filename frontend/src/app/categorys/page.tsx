// frontend/src/app/categorys/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import Layout from '@/modules/layouts/layout';
import FormCategory from './components/create.component';
import ObtenerCategorias from './components/obtener.component';
import { getCampaignsByCategory } from '@/app/campaigns/api';
import CreateCampaign from '../campaigns/components/create.component';
import DeleteCampaignButton from '../campaigns/components/delete.component';
import { donateToCampaign } from '../donar/api';
import { Comment, getCommentsByCampaign, createComment } from '@/app/comments/api';
import { Category, getCategories } from '@/app/categorys/api'; // Importa Category y getCategories

interface Campaign {
  id_campaign: string;
  title: string;
  description: string;
  phonet: string;
  meta: number;
  start_date: string;
  end_date: string;
}

export default function PageCategorys() {
  const router = useRouter();
  // selectedCategory inicia en null (ninguna categoría seleccionada por defecto)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [paymentModal, setPaymentModal] = useState({
    open: false,
    campaignId: '',
    amount: '',
    loading: false
  });

  const [commentModal, setCommentModal] = useState({
    open: false,
    campaignId: '',
    comments: [] as Comment[],
    newCommentContent: '',
    newCommentAuthor: '',
    loading: false
  });

  // Función para cargar las categorías desde la API
  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const data = await getCategories();
      setCategories(data);
      // *** ELIMINAR O COMENTAR LA LÍNEA QUE SELECCIONABA LA PRIMERA CATEGORÍA POR DEFECTO ***
      // if (data.length > 0 && !selectedCategory) {
      //   setSelectedCategory(data[0].id_category);
      // }
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      alert('Error al cargar las categorías.');
    } finally {
      setLoadingCategories(false);
    }
  }, []); // selectedCategory ya no es una dependencia aquí, ya que no queremos que se re-ejecute al cambiar selectedCategory para forzar una selección inicial

  // Cargar categorías al inicio
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Se dispara cuando selectedCategory cambia
  useEffect(() => {
    if (selectedCategory) { // Carga campañas solo si hay una categoría seleccionada
      getCampaignsByCategory(selectedCategory)
        .then((data) => setCampaigns(data))
        .catch((err) => console.error('Error al cargar campañas:', err));
    } else { // Si no hay categoría seleccionada, carga TODAS las campañas (o ninguna, según tu lógica deseada)
             // Si quieres mostrar todas las campañas cuando no hay categoría seleccionada, necesitas una función getAllCampaigns
             // Por ahora, si selectedCategory es null, se limpia la lista de campañas
      setCampaigns([]); 
      // Opcional: Si quieres cargar TODAS las campañas cuando ninguna categoría está seleccionada:
      // fetchAllCampaigns().then(data => setCampaigns(data)).catch(err => console.error(err));
    }
  }, [selectedCategory]);


  const handleOpenPayment = (campaignId: string) => {
    setPaymentModal({
      open: true,
      campaignId,
      amount: '',
      loading: false
    });
  };

  const handlePayment = async () => {
    const amount = parseFloat(paymentModal.amount);
    if (!amount || amount <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    setPaymentModal(prev => ({ ...prev, loading: true }));

    try {
      const { factura } = await donateToCampaign(paymentModal.campaignId, amount);

      alert(`¡Donación de $${amount} realizada con éxito!`);
      setPaymentModal({ open: false, campaignId: '', amount: '', loading: false });

      router.push(`/facturas/${factura.id_factura}`);

    } catch (error) {
      console.error(error);
      alert('Error al realizar la donación');
      setPaymentModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleOpenComments = async (campaignId: string) => {
    console.log('--- [1] Intentando abrir modal de comentarios para campaña:', campaignId);
    setCommentModal(prev => ({
      ...prev,
      open: true,
      campaignId,
      loading: true,
      comments: []
    }));
    try {
      const comments = await getCommentsByCampaign(campaignId);
      console.log('--- [3] Comentarios cargados para el modal:', comments);
      setCommentModal(prev => ({ ...prev, comments, loading: false }));
    } catch (error) {
      console.error('--- [ERROR] Error al cargar comentarios en handleOpenComments:', error);
      alert('Error al cargar comentarios.');
      setCommentModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCreateComment = async () => {
    if (!commentModal.newCommentContent.trim() || !commentModal.newCommentAuthor.trim()) {
      alert('Por favor, ingresa tu nombre y el comentario.');
      return;
    }
    setCommentModal(prev => ({ ...prev, loading: true }));
    try {
      const newComment = await createComment(
        commentModal.campaignId,
        commentModal.newCommentAuthor,
        commentModal.newCommentContent
      );
      console.log('--- Comentario creado exitosamente:', newComment);
      setCommentModal(prev => ({
        ...prev,
        comments: [...prev.comments, newComment],
        newCommentContent: '',
        newCommentAuthor: '',
        loading: false
      }));
    } catch (error) {
      console.error('--- Error al crear comentario en handleCreateComment:', error);
      alert('Error al crear comentario.');
      setCommentModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCloseComments = () => {
    setCommentModal({
      open: false,
      campaignId: '',
      comments: [],
      newCommentContent: '',
      newCommentAuthor: '',
      loading: false
    });
  };

  const handleCategoryCreated = useCallback((newCategory: Category) => {
    setCategories(prevCategories => [...prevCategories, newCategory]);
    // No seleccionamos la nueva categoría por defecto
    // Si quieres que se seleccione la nueva categoría, descomenta la línea de abajo:
    // setSelectedCategory(newCategory.id_category);
  }, []);

  return (
    <Layout>
      {/* Modal de Pago (sin cambios) */}
      {paymentModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Realizar Donación</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Monto a donar:</label>
              <input
                type="number"
                value={paymentModal.amount}
                onChange={(e) => setPaymentModal(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full p-2 border rounded"
                placeholder="Ingrese el monto"
                min="1"
                step="0.01"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setPaymentModal(prev => ({ ...prev, open: false }))}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={paymentModal.loading}
              >
                Cancelar
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={paymentModal.loading}
              >
                {paymentModal.loading ? 'Procesando...' : 'Confirmar Pago'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Comentarios (sin cambios) */}
      {commentModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Comentarios de la Campaña</h2>

            {commentModal.loading ? (
              <p className="text-center text-gray-600">Cargando comentarios...</p>
            ) : (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Comentarios Existentes:</h3>
                {commentModal.comments.length === 0 ? (
                  <p className="text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                ) : (
                  <div className="space-y-4">
                    {commentModal.comments.map(comment => (
                      <div key={comment.id_comment} className="border-b pb-3 last:border-b-0">
                        <p className="text-sm text-gray-800">
                          <strong>{comment.name}</strong> en {new Date(comment.createdAt).toLocaleDateString('es-CO')}
                        </p>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Dejar un Comentario:</h3>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tu Nombre:</label>
                <input
                  type="text"
                  value={commentModal.newCommentAuthor}
                  onChange={(e) => setCommentModal(prev => ({ ...prev, newCommentAuthor: e.target.value }))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Comentario:</label>
                <textarea
                  value={commentModal.newCommentContent}
                  onChange={(e) => setCommentModal(prev => ({ ...prev, newCommentContent: e.target.value }))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                  placeholder="Escribe tu comentario aquí..."
                ></textarea>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCloseComments}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  disabled={commentModal.loading}
                >
                  Cerrar
                </button>
                <button
                  onClick={handleCreateComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={commentModal.loading}
                >
                  {commentModal.loading ? 'Enviando...' : 'Publicar Comentario'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renderizado de categorías */}
      {loadingCategories ? (
        <p>Cargando categorías...</p>
      ) : (
        <ObtenerCategorias
          categories={categories}
          onSelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Renderizado condicional del FormCategory y CreateCampaign */}
      {!selectedCategory ? ( // Muestra FormCategory solo si NO hay categoría seleccionada
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Crear Categoría</h2>
          <FormCategory onCategoryCreated={handleCategoryCreated} />
        </div>
      ) : ( // Muestra CreateCampaign y las campañas solo si SÍ hay categoría seleccionada
        <>
          <div className="space-y-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Crear Campaña</h2>
            <CreateCampaign
              categoryId={selectedCategory}
              onCampaignCreated={(newCampaign: Campaign) => {
                setCampaigns((prev) => [...prev, newCampaign]);
              }}
            />
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700">Campañas en esta categoría</h2>
            {campaigns.length === 0 ? (
              <p className="text-gray-500">No hay campañas disponibles para esta categoría.</p>
            ) : (
              <div className="grid gap-4 mt-4">
                {campaigns.map((camp) => (
                  <div key={camp.id_campaign} className="border p-4 rounded shadow space-y-2">
                    <h3 className="text-lg font-bold">{camp.title}</h3>
                    <p className="text-gray-700">{camp.description}</p>
                    <p className="text-sm text-gray-600"><strong>Teléfono:</strong> {camp.phonet}</p>
                    <p className="text-sm text-gray-600"><strong>Meta:</strong> ${camp.meta}</p>
                    <p className="text-sm text-gray-600"><strong>Inicio:</strong> {camp.start_date}</p>
                    <p className="text-sm text-gray-600"><strong>Fin:</strong> {camp.end_date}</p>

                    <div className="flex gap-2 pt-2">
                      <DeleteCampaignButton
                        id_campaign={camp.id_campaign}
                        onDelete={() => {
                          setCampaigns(prev => prev.filter(c => c.id_campaign !== camp.id_campaign));
                        }}
                      />
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        onClick={() => handleOpenPayment(camp.id_campaign)}
                      >
                        Donar
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleOpenComments(camp.id_campaign)}
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}










