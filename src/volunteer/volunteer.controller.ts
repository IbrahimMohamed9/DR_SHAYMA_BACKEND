import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer } from './entities/volunteer.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @ApiOperation({ summary: 'Create new volunteer ' })
  @ApiResponse({ status: 201, type: Volunteer })
  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @ApiOperation({ summary: 'Get all volunteers' })
  @ApiResponse({ status: 200, type: Volunteer, isArray: true })
  @Get()
  findAll() {
    return this.volunteerService.findAll();
  }

  @ApiOperation({ summary: 'Get volunteer by id' })
  @ApiResponse({ status: 200, type: Volunteer })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(+id, updateVolunteerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerService.remove(+id);
  }
}
