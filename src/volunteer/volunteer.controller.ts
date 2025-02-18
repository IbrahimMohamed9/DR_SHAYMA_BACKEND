import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer } from './entities/volunteer.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('volunteers')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @ApiOperation({ summary: 'Create new volunteer' })
  @ApiResponse({ status: 201, type: Volunteer })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return await this.volunteerService.create(createVolunteerDto);
  }

  @ApiOperation({ summary: 'Get all volunteers' })
  @ApiResponse({ status: 200, type: Volunteer, isArray: true })
  @Get()
  async findAll() {
    return await this.volunteerService.findAll();
  }

  @ApiOperation({ summary: 'Get volunteer by id' })
  @ApiResponse({ status: 200, type: Volunteer })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.volunteerService.findOne(+id);
  }

  @ApiResponse({ status: 200, type: Volunteer })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return await this.volunteerService.update(+id, updateVolunteerDto);
  }

  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.volunteerService.remove(+id);
  }
}
