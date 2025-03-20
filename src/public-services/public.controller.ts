import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';

@Controller('public')
export class PublicController {
  // Instancia del logger con el nombre del controlador
  private readonly logger = new Logger(PublicController.name);

  @Post('consultar-deuda')
  @UseGuards(GoogleRecaptchaGuard)
  consultarDeuda(@Body() body: any) {
    // Log al recibir la solicitud
    this.logger.log('Recibida solicitud para consultar deuda');
    // Log con el cuerpo de la solicitud en nivel debug
    this.logger.debug(`Cuerpo de la solicitud: ${JSON.stringify(body)}`);

    try {
      // Aquí iría tu lógica de negocio, si la hubiera
      const resultado = body; // Simulación simple para este ejemplo

      // Log de éxito
      this.logger.log('Consulta de deuda procesada exitosamente');
      return { message: 'Consulta de deuda exitosa', data: resultado };
    } catch (error) {
      // Log de error con detalles
      this.logger.error(`Error al procesar la solicitud: ${error.message}`, error.stack);
      throw error; // Relanza el error para que sea manejado por NestJS
    }
  }
}