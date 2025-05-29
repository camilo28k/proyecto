import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id_donation')
  findOne(@Param('id_donation') id_donation: string) {
    return this.donationsService.findOne(id_donation);
  }

  @Delete(':id_donation')
  remove(@Param('id_donation') id_donation: string) {
    return this.donationsService.remove(id_donation);
  }
}
