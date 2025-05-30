import { PartialType } from '@nestjs/mapped-types';
import { CreateVerficationTokenDto } from './create-verfication-token.dto';

export class UpdateVerficationTokenDto extends PartialType(CreateVerficationTokenDto) {}
