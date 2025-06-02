import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccountDto } from './account.dto';

//* Create Admin Account DTOs

export class CreateAdminAccountRequestDto extends PickType(AccountDto, [
  'name',
  'email',
  'phone',
] as const) {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class CreateAdminAccountResponseDto extends PickType(AccountDto, [
  'id',
  'email',
  'phone',
  'role',
  'verifiedAt',
  'createdAt',
] as const) {}
