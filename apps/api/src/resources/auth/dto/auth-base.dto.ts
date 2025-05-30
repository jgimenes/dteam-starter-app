import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsString,
  Length,
} from 'class-validator';

export class AuthBaseDto {
  @ApiProperty({
    title: 'Id',
    description: 'Id único de identificação da conta.',
    example: '01JWC6CS8ZZ47NK8MX2C2WPS6D',
    type: String,
    required: true,
  })
  @Expose()
  @IsString({ message: 'Id deve ser uma string' })
  @Length(26, 26, { message: 'Id deve ter exatamente 26 caracteres.' })
  id: string;

  @ApiProperty({
    description: 'Email da Conta de Usuário',
    example: 'nomeusuario@email.com',
    type: 'string',
    format: 'email',
    required: true,
  })
  @Expose()
  @IsString({ message: 'Email deve ser uma string' })
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido.' })
  email: string;

  @ApiProperty({
    description: 'Número do Telefone Móvel do usuário da Conta.',
    example: '+5511999999999',
    type: String,
    required: false,
  })
  @Expose()
  @IsString({ message: 'Número do Telefone Móvel deve ser uma string' })
  @IsMobilePhone(undefined, undefined, {
    message: 'Número do Telefone Móvel deve ser um número de telefone válido.',
  })
  phoneNumber?: string;

  @ApiProperty({
    description:
      'Código de Verificação de Um Tempo Só (One-Time Password) para Autenticação.',
    example: '249601',
    type: String,
    required: false,
  })
  @Expose()
  @IsString({ message: 'OTP deve ser uma string' })
  @Length(6, 6, { message: 'OTP deve ter exatamente 6 caracteres.' })
  otp?: string;

  @ApiProperty({
    description: 'Timestamp de expiração do OTP.',
    example: 1712345678901,
    type: Date,
    required: false,
  })
  @Expose()
  @IsString({
    message: 'otpExpiresAt deve ser uma string representando um timestamp.',
  })
  otpExpiresAt?: Date;

  @ApiProperty({
    description: 'Timestamp verificação da conta.',
    example: Date.now(),
    type: Date,
    required: false,
  })
  @Expose()
  @IsDate({ message: 'isVerified ser um timestamp válido.' })
  isVerified?: Date;

  @ApiProperty({
    description: 'Date e hora de criação da conta do usuário.',
    example: Date.now(),
    type: Date,
    required: true,
  })
  @Expose()
  @IsDate({ message: 'createdAt deve ser um timestamp válido.' })
  createdAt: bigint;

  @ApiProperty({
    description: 'Data e hora da última atualização da conta do usuário.',
    example: Date.now(),
    type: Date,
    required: true,
  })
  @Expose()
  @IsDate({ message: 'updatedAt deve ser um timestamp válido.' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data e hora de exclusão da conta do usuário, se aplicável.',
    example: null,
    type: Date,
    required: false,
  })
  @Expose()
  @IsDate({ message: 'deleteAt deve ser um timestamp válido.' })
  deleteAt?: Date;
}
