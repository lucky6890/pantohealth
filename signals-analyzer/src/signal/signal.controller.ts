import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignalService } from './signal.service';
import { NotFoundError } from 'rxjs';

@ApiTags('Signals')
@Controller('signal')
export class SignalController {
  constructor(private readonly service: SignalService) {}

  @Get()
  async getAllSignals(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const data = await this.service.getAll(page, limit);
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getOneSignal(@Param('id') id: string) {
    try {
      const data = await this.service.getOne(id);
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async removeOneSignal(@Param('id') id: string) {
    try {
      const data = await this.service.removeOne(id);
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // For other verbs of CRUD operations:
  // Creating the signals should be through the rabbitMQ process not manual REST method (i think) => but it can be implemented with @Post decorator
  // Updating the signals should not be happened through a manual REST method (i think) => but it can be implemented with @Put for updating entire doc and @Patch for updating some fields of doc
  // these choices because of i don't know the business side of an application exactly and maybe these choices are wrong...
}
