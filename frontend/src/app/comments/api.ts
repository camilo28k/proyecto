// frontend/src/app/comments/api.ts
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1';
console.log('API_BASE para comentarios:', API_BASE); // <-- Añade esto para verificar
// ...

export interface Comment {
  id_comment: string;
  id_campaign: string; // Necesario porque lo vamos a enviar en el body de POST y para filtrar en el GET
  name: string;
  content: string;
  createdAt: string;
}

/**
 * Obtiene TODOS los comentarios del backend y luego los filtra por campaignId.
 * Tu backend actualmente tiene un @Get() sin parámetros que trae todos los comentarios.
 * @param campaignId El ID de la campaña para filtrar.
 * @returns Una promesa que resuelve a un array de comentarios filtrados.
 */
export async function getCommentsByCampaign(campaignId: string): Promise<Comment[]> {
  try {
    // CAMBIADO: Llamamos a la ruta GET general que trae TODOS los comentarios
    const response = await fetch(`${API_BASE}/comments`); 
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener todos los comentarios.');
    }
    const allComments: Comment[] = await response.json();
    console.log(`Todos los comentarios recibidos del backend:`, allComments);

    // Filtramos los comentarios en el frontend por el campaignId
    const filteredComments = allComments.filter(comment => comment.id_campaign === campaignId);
    console.log(`Comentarios filtrados para campaña ${campaignId}:`, filteredComments);
    return filteredComments;
  } catch (error: any) {
    console.error(`Error fetching or filtering comments for campaign ${campaignId}:`, error.message);
    throw error;
  }
}

/**
 * Crea un nuevo comentario.
 * La URL del backend ahora es '/comments' y 'id_campaign' se pasa en el body.
 * @param campaignId El ID de la campaña a la que pertenece el comentario.
 * @param authorName El nombre del autor del comentario (será enviado como 'name' al backend).
 * @param content El contenido del comentario.
 * @returns Una promesa que resuelve al comentario creado.
 */
export async function createComment(campaignId: string, authorName: string, content: string): Promise<Comment> {
  try {
    // CAMBIADO: La URL base es /comments, y id_campaign va en el body
    const response = await fetch(`${API_BASE}/comments`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id_campaign: campaignId, // <--- AHORA ID_CAMPAIGN SE ENVÍA EN EL CUERPO PARA EL POST
        name: authorName,   
        content 
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el comentario.');
    }
    const newComment: Comment = await response.json();
    console.log('Comentario creado:', newComment);
    return newComment;
  } catch (error: any) {
    console.error(`Error creating comment for campaign ${campaignId}:`, error.message);
    throw error;
  }
}