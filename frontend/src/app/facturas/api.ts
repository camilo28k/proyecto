// frontend/src/app/facturas/api.ts
// Este archivo contiene funciones para interactuar con tu backend REST real
// relacionadas con las facturas.

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1'; 

// Interfaz para la respuesta de la factura desde tu backend
export interface FacturaBackendResponse {
    id_factura: string;   // ID único de la factura
    id_donation: string;  // ID de la donación asociada
    amount: number;       // Monto de la donación/factura
    createdAt: string;    // Fecha de creación de la factura
    // Quitamos campaignTitle, donorName, donorAddress si tu backend no los devuelve
    // o si no quieres mostrarlos en la factura simplificada.
    // Si tu backend devuelve otros campos importantes, agrégalos aquí.
}

/**
 * Llama al backend para obtener los detalles completos de una factura existente por su ID.
 * Tu backend debe tener un endpoint GET /facturas/:id_factura para esto.
 */
export async function getFacturaDetailsFromBackend(id_factura: string): Promise<FacturaBackendResponse> {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/facturas/${id_factura}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los detalles de la factura del backend.');
        }
        return await response.json();
    } catch (error: any) {
        console.error(`Error fetching factura ${id_factura} from backend:`, error.message);
        throw error;
    }
}

