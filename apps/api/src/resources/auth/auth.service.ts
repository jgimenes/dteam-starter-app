import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EncryptLib } from 'src/lib/encrypt.lib';
import { OtpLib } from 'src/lib/otp.lib';

import { EmailService } from 'src/services/email/email.service';
import { Account } from '../../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly sendEmail: EmailService
  ) {}

  //* Create a new account

  async createAccount(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email } = request;

    // Check if the account already exists
    const existingAccount = await this.findAccountByEmail(email);

    if (existingAccount) {
      throw new ConflictException(`O e-mail ${email} já está registrado.`);
    }

    // Generate OTP (One Time Password).

    const stringOTP = OtpLib.generateOtp();
    const hashedOTP = EncryptLib.getHash(stringOTP);
    const otpExpiresAt = new Date(Date.now() + 300);

    // Create a new account
    const account = await this.prisma.account.create({
      data: {
        email,
        otp: hashedOTP,
        otpExpiresAt,
      },
    });

    // Send the OTP via email

    const emailResponse = await this.sendEmail.sendEmailRegisterAccessCode({
      to: email,
      code: stringOTP,
      responseMessage: `Código de acesso enviado com sucesso para seu endereço de e-mail ${email}.`,
    });

    if (!emailResponse.success) {
      throw new InternalServerErrorException(emailResponse.message);
    }

    const responseMessage: SignUpResponseDto = {
      id: account.id,
      email: account.email,
      message: emailResponse.message,
    };

    return plainToInstance(SignUpResponseDto, responseMessage, {
      excludeExtraneousValues: true,
    });
  }

  //* Find Account by email

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });
    return account;
  }
}
