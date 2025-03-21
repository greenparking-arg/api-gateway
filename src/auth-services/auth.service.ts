import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity'; // Asumimos que tienes esta entidad

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usuariosRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, contrasena: string): Promise<{ access_token: string }> {
    // Buscar el usuario por email en la base de datos
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    // Si no se encuentra el usuario, lanzar una excepción
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña usando bcrypt
    const esContrasenaValida = await bcrypt.compare(contrasena, usuario.password);

    // Si la contraseña no es válida, lanzar una excepción
    if (!esContrasenaValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear el payload para el token JWT
    const payload = { 
      sub: usuario.id, 
      username: usuario.nombre, 
      rol: usuario.rol 
    };

    // Generar el token JWT
    const access_token = this.jwtService.sign(payload);

    // Devolver el token de acceso
    return { access_token };
  }
}