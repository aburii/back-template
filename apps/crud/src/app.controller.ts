import { Controller, Get } from '@nestjs/common';
import { CrudService } from './app.service';

@Controller()
export class CrudController {
  constructor(private readonly appService: CrudService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
