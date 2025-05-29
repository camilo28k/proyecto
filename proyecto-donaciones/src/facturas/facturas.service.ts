import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FacturasService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createFacturaDto: CreateFacturaDto) {
    return this.facturas.create({
      data: createFacturaDto
    })
  }

  findAll() {
    return this.facturas.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })
  }

  findOne(id_factura: string) {
    return this.facturas.findFirst({
      where: {id_factura}
    })
  }

  remove(id_factura: string) {
    return this.facturas.delete({
      where: {id_factura}
    })
  }
}
