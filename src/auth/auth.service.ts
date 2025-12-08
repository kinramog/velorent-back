import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private rolesService: RoleService,
    private jwt: JwtService,
  ) { }


  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    return user;
  }


  async signUp(data: CreateUserDto) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) throw new UnauthorizedException("Пользователь с таким email уже существует");

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser({
      fio: data.fio,
      phone: data.phone,
      email: data.email,
      password: hash,
    });

    return {
      id: user.id,
      email: user.email,
      fio: user.fio,
      phone: user.phone,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException("Пользователя с таким email не существует");

    const ok = await bcrypt.compare(loginDto.password, user.password);
    if (!ok) throw new UnauthorizedException("Неверный пароль");

    const access_token = await this.jwt.signAsync({
      id: user.id,
      role: user.role.name,
      tokenVersion: user.tokenVersion,
    });

    return { access_token };
  }

  async logout(userId: number) {
    await this.usersService.incrementTokenVersion(userId);
    return { message: 'Выход успешно совершён' };
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
