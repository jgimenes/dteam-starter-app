import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthBaseDto } from './auth-base.dto';

export class SignUpRequestDto extends PickType(AuthBaseDto, [
  'email',
] as const) {}

export class SignUpResponseDto extends PartialType(
  PickType(AuthBaseDto, ['id', 'email', 'createdAt'] as const)
) {
  id: string;
  email: string;
  @ApiProperty({
    title: 'Message',
    description: 'Mensagem de resposta',
    example: 'Código de acesso enviado com sucesso.',
    required: true,
  })
  @Expose()
  message: string;
}
