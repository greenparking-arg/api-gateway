import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('config')
export class ConfigController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('reglas')
  async getReglas() {
    const cached = await this.cacheManager.get('reglas');
    if (cached) {
      return cached;
    }
    const reglas = { maxTime: 30, fee: 5 }; // Simulación de datos
    await this.cacheManager.set('reglas', reglas, 60);
    return reglas;
  }
}