import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  findAll() {
    return this.facturasService.findAll();
  }

@Get(':id') // Maneja GET /facturas/:id
  async findOne(@Param('id') id_factura: string) { // Usa async y el nombre del parámetro
    const factura = await this.facturasService.findOne(id_factura); // Espera la promesa de Prisma

    if (!factura) {
      // Si la factura no se encuentra (findOne devuelve null), lanza una excepción 404.
      // NestJS transformará esto en una respuesta JSON con { statusCode: 404, message: "Factura..." }
      throw new NotFoundException(`Factura con ID "${id_factura}" no encontrada.`);
    }

    // Si la factura se encuentra, devuélvela. NestJS la serializará automáticamente a JSON.
    return factura;
  
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturasService.remove(id);
  }
}
