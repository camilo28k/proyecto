import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaign.dto';
import { IsOptional, IsString, IsUUID, IsNumber, IsDate, IsBoolean, } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto){

     @IsString()
     id_campaign: string;

     @IsBoolean()
     @IsOptional()
     active?: boolean;
}
