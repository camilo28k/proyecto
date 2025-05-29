import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get() // Este @Get() manejará /comments
  // Ahora usará un query parameter opcional para filtrar por campaignId
  // Si no se proporciona campaignId, devolverá todos los comentarios (como antes)
  findAll(@Query('campaignId') campaignId?: string) { // <-- ¡IMPORTANTE CAMBIO AQUÍ!
    if (campaignId) {
      // Si se proporciona campaignId, llama al nuevo método del servicio
      return this.commentsService.findByCampaignId(campaignId); 
    }
    // Si no hay campaignId, devuelve todos los comentarios (comportamiento original)
    return this.commentsService.findAll();
  }
  @Get(':id_comment')
  findOne(@Param('id_comment')id_comment:string) {
    return this.commentsService.findOne(id_comment);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
