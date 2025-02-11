import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { MeAndAdminGuard } from 'src/auth/guards/me-and-admin.guard';
import { hash } from 'crypto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.gender;

    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    delete updateUserDto.role;
    delete updateUserDto.email;
    delete updateUserDto.gender;

    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
