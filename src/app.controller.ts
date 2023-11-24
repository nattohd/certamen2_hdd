import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FeriadosService } from './services/feriados.service';
import { Feriado } from './model/feriado';

@Controller()
export class AppController {
  constructor(private readonly feriadosService: FeriadosService) { }

  @Get("/feriados")
  getFeriados(): Promise<Feriado[]> {
    return this.feriadosService.getFeriados();
  }
  @Get("/feriados/irrenunciables")
  getFeriadosIrrenunciables(): Promise<Feriado[]> {
    return this.feriadosService.getFeriadosIrrenunciables();
  }
}
