import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DonationsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createDonationDto: CreateDonationDto) {
    return this.donations.create({
      data: createDonationDto
    })
  }

  findAll() {
    return this.donations.findMany({
      orderBy:{
        createdAt: 'desc'
      }
    });
  }

  findOne(id_donation: string) {
    return this.donations.findFirst({
      where: {id_donation}
    })
  }

  remove(id_donation: string) {
    return this.donations.delete({
      where: {id_donation}
    })
  }
}
