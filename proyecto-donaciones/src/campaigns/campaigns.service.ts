  import { Injectable, OnModuleInit } from '@nestjs/common';
  import { CreateCampaignDto } from './dto/create-campaign.dto';
  import { UpdateCampaignDto } from './dto/update-campaign.dto';
  import { PrismaClient } from '@prisma/client';
  import { v4 } from 'uuid';    
  import { UploaderService } from 'src/services/uploader/s3.service';
import { Campaign } from './entities/campaign.entity';

  @Injectable()
  export class CampaignsService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }
  create(createCampaignDto: CreateCampaignDto) {
    return this.campaigns.create({
      data: createCampaignDto
    })
  }
  findall(){
    return this.campaigns.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })
  }

  async findOne(id_campaign:string) {
    return this.campaigns.findFirst({
      where: {id_campaign}
    });
  }

  update(id_campaign: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaigns.update({
      where:{id_campaign},
      data:updateCampaignDto
    });
  }

  remove(id_campaign: string) {
    return this.campaigns.delete({
      where: {id_campaign}
    })
  }
   // ✅ Nuevo método para buscar campañas por categoría
findByCategory(id_category: string) {
  return this.campaigns.findMany({
    where: {
      id_category: id_category,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
}

