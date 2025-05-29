import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategorysService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createCategoryDto: CreateCategoryDto) {
    return this.categorys.create({
      data: createCategoryDto
    });
  }
  findAll(){
    return this.categorys.findMany({
      orderBy:{
        createdAt: 'desc'

      }
    })
  }

  findOne(id_category:string) {
    return this.categorys.findFirst({
      where: {id_category}
    });
  }

  remove(id_category: string) {
    return this.categorys.delete({where: {id_category}});
  }
}
