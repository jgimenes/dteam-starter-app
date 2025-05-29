import { ApiProperty } from '@nestjs/swagger';
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
    description: 'Id Único de Identificação da Conta de Usuário.',
    example: '01JWC6CS8ZZ47NK8MX2C2WPS6D',
    type: String,
    required: true,
  })
  @IsString({ message: 'Id deve ser uma string' })
  @Length(26, 26, { message: 'Id deve ter exatamente 26 caracteres.' })
  id: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email da Conta de Usuário',
    example: 'nomeusuario@email.com',
    type: String,
    required: true,
  })
  @IsString({ message: 'Email deve ser uma string' })
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido.' })
  email: string;

  @ApiProperty({
    title: 'Número do Telefone Móvel',
    description: 'Número do Telefone Móvel do usuário da Conta.',
    example: '+5511999999999',
    type: String,
    required: false,
  })
  @IsString({ message: 'Número do Telefone Móvel deve ser uma string' })
  @IsMobilePhone(undefined, undefined, {
    message: 'Número do Telefone Móvel deve ser um número de telefone válido.',
  })
  phoneNumber?: string;

  @ApiProperty({
    title: 'OTP',
    description:
      'Código de Verificação de Um Tempo Só (One-Time Password) para Autenticação.',
    example: '249601',
    type: String,
    required: false,
  })
  @IsString({ message: 'OTP deve ser uma string' })
  @Length(6, 6, { message: 'OTP deve ter exatamente 6 caracteres.' })
  otp?: string;

  @ApiProperty({
    title: 'OTP Tempo de Expiração',
    description: 'Timestamp de expiração do OTP.',
    example: 1712345678901,
    type: Date,
    required: false,
  })
  @IsString({
    message: 'otpExpiresAt deve ser uma string representando um timestamp.',
  })
  otpExpiresAt?: Date;

  @ApiProperty({
    title: 'Data e hora da verificação do email',
    description: 'Timestamp verificação da conta.',
    example: Date.now(),
    type: Date,
    required: false,
  })
  @IsDate({ message: 'isVerified ser um timestamp válido.' })
  isVerified?: Date;

  @ApiProperty({
    title: 'Data de Criação da Conta',
    description: 'Date e hora de criação da conta do usuário.',
    example: Date.now(),
    type: Date,
    required: true,
  })
  @IsDate({ message: 'createdAt deve ser um timestamp válido.' })
  createdAt: bigint;

  @ApiProperty({
    title: 'Data de Atualização da Conta',
    description: 'Data e hora da última atualização da conta do usuário.',
    example: Date.now(),
    type: Date,
    required: true,
  })
  @IsDate({ message: 'updatedAt deve ser um timestamp válido.' })
  updatedAt: Date;

  @ApiProperty({
    title: 'Data de Exclusão da Conta',
    description: 'Data e hora de exclusão da conta do usuário, se aplicável.',
    example: null,
    type: Date,
    required: false,
  })
  @IsDate({ message: 'deleteAt deve ser um timestamp válido.' })
  deleteAt?: Date;
}
