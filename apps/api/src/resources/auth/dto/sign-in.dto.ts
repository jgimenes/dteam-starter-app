import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthBaseDto } from './auth-base.dto';

export class SignInRequestDto extends PickType(AuthBaseDto, [
  'id',
  'email',
  'otp',
] as const) {}
export class SignInResponseDto extends PickType(AuthBaseDto, [
  'id',
  'email',
] as const) {
  @ApiProperty({
    title: 'Nome',
    description: 'Nome do usuário da conta',
    example: 'João da Silva',
  })
  @Expose()
  @ApiProperty({
    name: 'accessToken',
    description: 'Token de acesso da conta de usuário',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    name: 'refreshToken',
    description: 'Token de atualização da conta de usuário',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  refreshToken: string;
}
