import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { AccountDto } from './dto/account.dto';
import {
  CreateAdminAccountRequestDto,
  CreateAdminAccountResponseDto,
} from './dto/create-account.dto';
import { UpdateAdminAccountRequestDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  //* Create a Admin new account

  @Post()
  @ApiOperation({
    summary: 'Create a new account',
    description: 'This endpoint allows you to create a new account.',
    tags: ['Accounts', 'Authentication'],
    operationId: 'createAccount',
  })
  @ApiBody({
    type: CreateAdminAccountRequestDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Account created successfully.',
    type: CreateAdminAccountResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data.',
  })
  @ApiConflictResponse({
    description: 'Account with this email or phone already exists.',
  })
  async createAccount(
    @Body() request: CreateAdminAccountRequestDto
  ): Promise<CreateAdminAccountResponseDto> {
    return await this.accountsService.createAdminAccount(request);
  }

  //* Update an existing account

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an existing account',
    description: 'This endpoint allows you to update an existing account.',
    tags: ['Accounts', 'Authentication'],
    operationId: 'updateAccount',
  })
  @ApiBody({
    type: UpdateAdminAccountRequestDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the account to update',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Account updated successfully.',
    type: UpdateAdminAccountRequestDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data or account ID does not exist.',
  })
  async updateAccount(
    @Param('id') id: string,
    @Body() request: UpdateAdminAccountRequestDto
  ): Promise<UpdateAdminAccountRequestDto> {
    return await this.accountsService.updateAdminAccount(id, request);
  }

  //* Find an account by ID

  @Get(':id')
  @ApiOperation({
    summary: 'Find an account by ID',
    description: 'This endpoint allows you to find an account by its ID.',
    tags: ['Accounts'],
    operationId: 'findAccountById',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the account to find',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Account found successfully.',
    type: AccountDto,
  })
  async findAccountById(@Param('id') id: string): Promise<AccountDto> {
    return await this.accountsService.findAccountById(id);
  }

  //* Delete an account by ID
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an account by ID',
    description:
      'This endpoint allows you to soft delete an account by its ID.',
    tags: ['Accounts'],
    operationId: 'deleteAccountById',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the account to delete',
    required: true,
    type: String,
  })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: 'Invalid account ID or account does not exist.',
  })
  async deleteAccountById(@Param('id') id: string): Promise<void> {
    await this.accountsService.deleteAccount(id);
  }

  //* Remove an account by ID
  @Delete(':id/remove')
  @ApiOperation({
    summary: 'Remove an account by ID',
    description:
      'This endpoint allows you to permanently remove an account by its ID.',
    tags: ['Accounts'],
    operationId: 'removeAccountById',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the account to remove',
    required: true,
    type: String,
  })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: 'Invalid account ID or account does not exist.',
  })
  async removeAccountById(@Param('id') id: string): Promise<void> {
    await this.accountsService.removeAccount(id);
  }
}
