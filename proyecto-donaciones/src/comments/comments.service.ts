import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createCommentDto: CreateCommentDto) {
    return this.comments.create({
      data: createCommentDto
    }) ;
  } 

  findAll() {
    return this.comments.findMany({
      orderBy:{
        createdAt: 'desc'
      }
    });
  }
  findByCampaignId(campaignId: string) {
    return this.comments.findMany({
      where: {
        id_campaign: campaignId // Filtra por el id_campaign
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne(id_comment:string) {
    return this.comments.findFirst({
      where: {id_comment}
    });
  }

  update(id_comment: string, updateCommentDto: UpdateCommentDto) {
    return this.comments.update({
      where: {id_comment},
      data: updateCommentDto
    });
  }

  remove(id_comment: string) {
    return this.comments.delete({
      where: {id_comment}
    });
  }
}
