import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiOperation } from '@nestjs/swagger';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar Conta',
    description: 'Cria uma nova conta de usuário.',
  })
  @Post('signup')
  create(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.createAccount(request);
  }
}
