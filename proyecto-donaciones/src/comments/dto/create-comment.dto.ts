import { IsAlpha, IsBoolean, IsDate, IsString } from "class-validator"

export class CreateCommentDto {

    @IsString()
    id_campaign: string

    @IsString()
    name: string

    @IsString()
    content: string


}
