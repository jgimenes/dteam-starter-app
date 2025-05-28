import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  //* Create a new account
}
