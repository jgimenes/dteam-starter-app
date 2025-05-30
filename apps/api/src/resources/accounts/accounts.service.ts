import { ConflictException, Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(request: AccountDto): Promise<AccountDto> {
    const { email, phone, tenantId, userId, role } = request;

    const existsByEmail = await this.existsAccountByEmail(email);
    const existsByPhone = await this.existsAccountByPhone(phone);

    if (existsByEmail || existsByPhone) {
      throw new ConflictException(
        'Account with this email or phone already exists.'
      );
    }

    const account = await this.prisma.account.create({
      data: {
        email,
        phone,
        tenantId,
        userId,
        role,
        // Add verifiedAt property with a default value
      },
    });

    return account;
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    return account;
  }

  //* Find Account by Phone

  async findAccountByPhone(phone: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { phone },
    });

    return account;
  }

  //* Find Account by ID

  async findAccountById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return account;
  }

  //* Exists Account by Email

  async existsAccountByEmail(email: string): Promise<boolean> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    return !!account;
  }

  //* Exists Account by Phone

  async existsAccountByPhone(phone: string): Promise<boolean> {
    const account = await this.prisma.account.findUnique({
      where: { phone },
    });

    return !!account;
  }

  //* Exists Account by ID

  async existsAccountById(id: string): Promise<boolean> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return !!account;
  }
}
