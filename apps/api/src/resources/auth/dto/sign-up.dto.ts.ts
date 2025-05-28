import { PartialType, PickType } from '@nestjs/swagger';
import { AuthBaseDto } from './auth-base.dto';

export class SignUpRequestDto extends PartialType(
  PickType(AuthBaseDto, ['email'] as const)
) {}

export class SignUpResponseDto extends PartialType(
  PickType(AuthBaseDto, ['id', 'email'] as const)
) {}
