import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateDonationDto {
    @IsString()
    id_campaign:string;
    @IsNumber()
    amount: number;
}
