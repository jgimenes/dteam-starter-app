import { Injectable } from '@nestjs/common';
import { CreateVerficationTokenDto } from './dto/create-verfication-token.dto';
import { UpdateVerficationTokenDto } from './dto/update-verfication-token.dto';

@Injectable()
export class VerficationTokenService {
  create(createVerficationTokenDto: CreateVerficationTokenDto) {
    return 'This action adds a new verficationToken';
  }

  findAll() {
    return `This action returns all verficationToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verficationToken`;
  }

  update(id: number, updateVerficationTokenDto: UpdateVerficationTokenDto) {
    return `This action updates a #${id} verficationToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} verficationToken`;
  }
}
