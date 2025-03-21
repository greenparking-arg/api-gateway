import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../src/auth-services/entities/user.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nombre: string; // Ejemplo: 'admin', 'operador'

  @OneToMany(() => User, (usuario) => usuario.rol)
  usuarios: User[];
}