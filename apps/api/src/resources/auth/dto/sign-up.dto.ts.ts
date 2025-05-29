import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { AuthBaseDto } from './auth-base.dto';

export class SignUpRequestDto extends PickType(AuthBaseDto, [
  'email',
] as const) {}

export class SignUpResponseDto extends PartialType(
  PickType(AuthBaseDto, ['id', 'email'] as const)
) {
  @ApiProperty({
    title: 'Message',
    description: 'Mensagem de resposta',
    example: 'Código de acesso enviado com sucesso.',
    required: true,
  })
  message: string;
}
