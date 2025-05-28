import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './sign-up.dto.ts';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
