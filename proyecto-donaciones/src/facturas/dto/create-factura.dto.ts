import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateFacturaDto {
    @IsString()
    id_donation:string
    @Type(()=>Number)
    @IsNumber()
    amount: number
}
