import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Account, PrismaClient } from '../../../generated/prisma';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto.ts';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  //* Create a new account

  async createAccount(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email } = request;

    // Check if the account already exists
    const existingAccount = await this.findAccountByEmail(email);

    if (existingAccount?.isVerified) {
      throw new BadRequestException(`O e-mail ${email} já está registrado.`);
    }

    // Create a new account
    const account = await this.prisma.account.create({
      data: {
        email,
        isVerified: '',
      },
    });

    return plainToInstance(SignUpResponseDto, account, {
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
