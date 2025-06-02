import { PartialType, PickType } from '@nestjs/swagger';
import { AccountDto } from './account.dto';

export class UpdateAdminAccountRequestDto extends PartialType(
  PickType(AccountDto, ['name', 'email', 'phone', 'verifiedAt'] as const)
) {}

export class UpdateAdminAccountResponseDto extends PickType(AccountDto, [
  'id',
  'name',
  'email',
  'phone',
  'verifiedAt',
  'updatedAt',
]) {}
