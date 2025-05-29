import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';


@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Get()
  finAll(){
    return this.categorysService.findAll()
  }
  @Get('id/:id_category')
  findOne(@Param('id_category')id_category:string) {
    return this.categorysService.findOne(id_category);
  }

  @Delete('id/:id_category')
  remove(@Param('id_category') id_category: string) {
    return this.categorysService.remove(id_category);
  }
}
