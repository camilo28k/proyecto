import { Type } from "class-transformer"
import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class CreateCampaignDto {
    
    @IsString()
    id_category:string


    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    @Length(10, 10, { message: 'El campo debe tener exactamente 10 caracteres' })
    phonet: string

    @Type(() => Number)
    @IsNumber()
    meta: number

    @IsString()
    start_date: string

    @IsString()
    end_date: string
}

