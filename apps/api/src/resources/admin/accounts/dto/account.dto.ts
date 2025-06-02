import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsString, Length } from 'class-validator';

export class AccountDto {
  @ApiProperty({
    description: 'Unique identifier for the account',
    example: '01JWH3W3YDM1YH8D1VGCABQH7D',
    type: 'string',
    format: 'ulid',
    required: false,
  })
  @IsString()
  @Length(26, 26)
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Full name of the account holder',
    example: 'John Doe',
    type: 'string',
    required: false,
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@email.com',
    type: 'string',
    format: 'email',
    required: false,
  })
  @IsString()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Mobile phone number',
    example: '+1234567890',
    type: 'string',
    format: 'phone',
    required: false,
  })
  @IsString()
  @IsMobilePhone(undefined, { strictMode: false })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'Unique identifier for the tenant',
    example: '01JWH3W3YDM1YH8D1VGCABQH7D',
    type: 'string',
    format: 'ulid',
    required: false,
  })
  @IsString()
  @Length(26, 26)
  @Expose()
  tenantId?: string;

  @ApiProperty({
    description: 'Role of the account',
    example: 'admin',
    type: 'string',
    required: false,
  })
  role: string;

  @ApiProperty({
    description: 'Indicates if the account is verified',
    example: true,
    type: 'string',
    required: false,
  })
  verifiedAt?: Date;

  @ApiProperty({
    description: 'Date when the account was created',
    example: '2023-10-01T12:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the account was last updated',
    example: '2023-10-01T12:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the account was deleted',
    example: '2023-10-01T12:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  deletedAt?: Date;
}

export class AccountsDto {
  @ApiProperty({
    description: 'List of accounts',
    type: [AccountDto],
    required: true,
  })
  accounts: AccountDto[];
}
