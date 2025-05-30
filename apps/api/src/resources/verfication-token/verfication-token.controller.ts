import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerficationTokenService } from './verfication-token.service';
import { CreateVerficationTokenDto } from './dto/create-verfication-token.dto';
import { UpdateVerficationTokenDto } from './dto/update-verfication-token.dto';

@Controller('verfication-token')
export class VerficationTokenController {
  constructor(private readonly verficationTokenService: VerficationTokenService) {}

  @Post()
  create(@Body() createVerficationTokenDto: CreateVerficationTokenDto) {
    return this.verficationTokenService.create(createVerficationTokenDto);
  }

  @Get()
  findAll() {
    return this.verficationTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verficationTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerficationTokenDto: UpdateVerficationTokenDto) {
    return this.verficationTokenService.update(+id, updateVerficationTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verficationTokenService.remove(+id);
  }
}
