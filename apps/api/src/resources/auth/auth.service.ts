import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Account } from '../../prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SignInRequestDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignUpRequestDto } from './dto/sign-up.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService
    //    private readonly sendEmail: EmailService
  ) {}

  //* Create a new account

  async createAccount(request: SignUpRequestDto): Promise<void> {
    const { email } = request;

    // Check if the account already exists
    const existingAccount = await this.findAccountByEmail(email);

    if (existingAccount) {
      throw new ConflictException(`O e-mail ${email} já está registrado.`);
    }

    // Generate OTP (One Time Password).

    /*const stringOTP = OtpLib.generateOtp();
    //const hashedOTP = EncryptLib.getHash(stringOTP);
    //const otpExpiresAt = new Date(Date.now() + 300);

    // Create a new account
    const account = await this.prisma.account.create({
      data: {
        email,
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
    };

    return plainToInstance(SignUpResponseDto, responseMessage, {
      excludeExtraneousValues: true,
    });
    */
  }

  //* Sign in to an account

  async signIn(request: SignInRequestDto): Promise<SignInResponseDto> {
    const { id, email, otp } = request;

    console.log(id);
    console.log(otp);

    // Find the account by email
    const account = await this.findAccountByEmail(email);

    if (!account) {
      throw new BadRequestException(`Conta ${email} não cadastrada.`);
    }

    // Verify the OTP

    // Generate access and refresh tokens (not implemented here)
    const accessToken = 'generated-access-token'; // Placeholder
    const refreshToken = 'generated-refresh-token'; // Placeholder

    return plainToInstance(
      SignInResponseDto,
      {
        id: account.id,
        email: account.email,
        accessToken,
        refreshToken,
      },
      {
        excludeExtraneousValues: true,
      }
    );
  }

  //* Find Account by email

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });
    return account;
  }

  //* Get OTP from account
}
