// ... (resto de tus importaciones)
import { NextResponse } from 'next/server';

import puppeteer from 'puppeteer';
import { FacturaBackendResponse, getFacturaDetailsFromBackend } from '../api';
// ...

export async function GET(req: Request, context: { params: { id_factura: string } }) {
    let browser;
    // Declara facturaDetallesCompletos aquí para que esté disponible en todo el bloque try/catch
    let facturaDetallesCompletos: FacturaBackendResponse; 

    try {
        const { id_factura } = await context.params; // Obtiene el ID de la factura desde el segmento dinámico de la URL

        if (!id_factura) {
            return NextResponse.json({ message: 'Falta el ID de la factura en la URL.' }, { status: 400 });
        }

        try {
            // Asigna el valor dentro de este bloque try
            facturaDetallesCompletos = await getFacturaDetailsFromBackend(id_factura); 
        } catch (error: any) {
            console.error('Error al obtener detalles de factura desde el backend:', error.message);
            // Asegúrate de devolver una respuesta si hay un error al obtener los datos
            return NextResponse.json({ message: 'No se pudo encontrar la factura o error en el backend.', error: error.message }, { status: error.status || 404 });
        }

        // --- PREPARAR LOS DATOS PARA EL PDF ---
        // Ahora, facturaDetallesCompletos ya está garantizado que tiene un valor aquí
        const datosFacturaPdf = {
            numeroFactura: facturaDetallesCompletos.id_factura.substring(0, 8).toUpperCase(),
            fecha: new Date(facturaDetallesCompletos.createdAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
            montoTotal: facturaDetallesCompletos.amount,
            idDonacion: facturaDetallesCompletos.id_donation
        };

        // --- LÓGICA PARA EL FORMATO CONDICIONAL DEL MONTO (tal como lo vimos antes) ---
        let formattedAmount: string;
        if (datosFacturaPdf.montoTotal % 1 !== 0) {
            formattedAmount = datosFacturaPdf.montoTotal.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            formattedAmount = datosFacturaPdf.montoTotal.toLocaleString('es-CO');
        }
        // ---------------------------------------------------------------------------------

        // --- GENERAR EL CONTENIDO HTML DEL PDF USANDO PUPPETEER ---
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        const contenidoHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Recibo de Donación #${datosFacturaPdf.numeroFactura}</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
                    .header { text-align: center; margin-bottom: 30px; }
                    h1 { color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; display: inline-block; }
                    .info-section { margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                    .info-section p { margin: 5px 0; font-size: 1.1em; }
                    .total-amount { text-align: center; margin-top: 40px; }
                    .total-amount h2 { font-size: 2.2em; color: #2196F3; margin-bottom: 10px; }
                    .footer-text { text-align: center; font-size: 0.9em; color: #888; margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Recibo de Donación</h1>
                </div>

                <div class="info-section">
                    <p><strong>Número de Recibo:</strong> #${datosFacturaPdf.numeroFactura}</p>
                    <p><strong>Fecha de Emisión:</strong> ${datosFacturaPdf.fecha}</p>
                    <p><strong>ID de Donación:</strong> ${datosFacturaPdf.idDonacion}</p>
                </div>

                <div class="total-amount">
                    <h2>Total Donado: $${formattedAmount} COP</h2> </div>

                <p class="footer-text">Agradecemos sinceramente su generosa donación. ¡Su apoyo hace la diferencia! Este recibo es para fines informativos.</p>
            </body>
            </html>
        `;

        await page.setContent(contenidoHtml, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '30mm', right: '25mm', bottom: '25mm', left: '25mm' }
        });

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=recibo-donacion-${datosFacturaPdf.numeroFactura}.pdf`,
            },
            status: 200,
        });

    } catch (error: any) {
        console.error('Error general en la API Route /facturas/[id_factura]:', error);
        return NextResponse.json({ message: 'Error interno del servidor al procesar la solicitud o generar el PDF.', error: error.message || 'Error desconocido' }, { status: 500 });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}