import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { PublicController } from './public-services/public.controller'; // Importación del controlador
import { AuthController } from './auth-services/auth.controller'; // Importación del controlador

@Module({
  imports: [
    GoogleRecaptchaModule.forRoot({
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: (req) => req.body['g-recaptcha-response'],
    }),
    CacheModule.register({
      ttl: 60, // 60 segundos
      max: 100, // Máximo de 100 elementos
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3001 },
      },
      {
        name: 'PARKING_SERVICE',
        transport: Transport.TCP,
        options: { host: 'parking-service', port: 3002 },
      },
    ]),
  ],
  controllers: [
    PublicController,
    AuthController, 
  ], // Agregar el controlador aquí
  providers: [],
})
export class AppModule {}