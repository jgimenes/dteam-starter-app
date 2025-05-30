import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Registrar Conta',
    description: 'Cria uma nova conta de usuário.',
    operationId: 'sign-up',
  })
  @ApiBody({ type: SignUpRequestDto })
  @ApiCreatedResponse({
    description: 'Conta criada com sucesso.',
    type: SignUpResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Erro ao criar a conta.',
  })
  @ApiConflictResponse({
    description: 'E-mail já registrado.',
  })
  create(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.createAccount(request);
  }
}
