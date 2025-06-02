import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountDto } from './dto/account.dto';
import {
  CreateAdminAccountRequestDto,
  CreateAdminAccountResponseDto,
} from './dto/create-account.dto';
import {
  UpdateAdminAccountRequestDto,
  UpdateAdminAccountResponseDto,
} from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  //* Create a new Admin account

  async createAdminAccount(
    data: CreateAdminAccountRequestDto
  ): Promise<CreateAdminAccountResponseDto> {
    const { email, phone } = data;

    const existsByEmail = await this.existsAccountByEmail(email);
    const existsByPhone = await this.existsAccountByPhone(phone);

    if (existsByEmail || existsByPhone) {
      throw new ConflictException(
        'Account with this email or phone already exists.'
      );
    }

    const account = await this.prisma.account.create({
      data,
    });

    if (!account) {
      throw new InternalServerErrorException(
        'Failed to create admin account. Please try again later.'
      );
    }

    return plainToInstance(CreateAdminAccountResponseDto, account, {
      excludeExtraneousValues: true,
    });
  }

  //* Update Admin an existing account

  async updateAdminAccount(
    id: string,
    data: UpdateAdminAccountRequestDto
  ): Promise<UpdateAdminAccountResponseDto> {
    const existsById = await this.existsAccountById(id);

    if (!existsById) {
      throw new BadRequestException('Account with this ID does not exist.');
    }

    const account = await this.prisma.account.update({
      where: { id },
      data,
    });

    if (!account) {
      throw new InternalServerErrorException(
        'Failed to update account. Please try again later.'
      );
    }

    return plainToInstance(UpdateAdminAccountResponseDto, account, {
      excludeExtraneousValues: true,
    });
  }

  //* Delete Admin Account

  async deleteAccount(id: string): Promise<void> {
    const existsById = await this.existsAccountById(id);

    if (!existsById) {
      throw new BadRequestException('Account with this ID does not exist.');
    }

    await this.prisma.account.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
  }

  //* Remove Admin Account
  async removeAccount(id: string): Promise<void> {
    const existsById = await this.existsAccountById(id);

    if (!existsById) {
      throw new BadRequestException('Account with this ID does not exist.');
    }

    await this.prisma.account.delete({
      where: { id },
    });
  }

  //TODO: Find Accounts

  //* Find Account by Email

  async findAccountByEmail(email: string): Promise<AccountDto | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    return plainToInstance(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }

  //* Find Account by Phone

  async findAccountByPhone(phone: string): Promise<AccountDto> {
    const account = await this.prisma.account.findUnique({
      where: { phone },
    });

    return plainToInstance(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }

  //* Find Account by ID

  async findAccountById(id: string): Promise<AccountDto> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return plainToInstance(AccountDto, account, {
      excludeExtraneousValues: true,
    });
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
