import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(
    @Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }
  @Get()
  getAll(){
  return this.campaignsService.findall();
  }

  @Get('id/:id_campaign')
  findOne(@Param('id_campaign')id_campaign:string) {
    return this.campaignsService.findOne(id_campaign);
  }
@Get('categorys/:id_category')
getByCategory(@Param('id_category') id_category: string) {
  return this.campaignsService.findByCategory(id_category);
}


  @Patch(':id_campaign')
  update(@Param('id_campaign') id_campaign: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id_campaign, updateCampaignDto);
  }

  @Delete(':id_campaign')
  remove(@Param('id_campaign') id_campaign: string) {
    return this.campaignsService.remove(id_campaign);
  }
}
