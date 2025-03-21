import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  @Post('login')
  login(@Body() loginDto: any) {
    return this.authClient.send({ cmd: 'login' }, loginDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetDto: any) {
    return this.authClient.send({ cmd: 'resetPassword' }, resetDto);
  }
}