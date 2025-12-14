import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private readonly storageService: StorageService,
  ) { }


  async createUser(data: CreateUserDto) {
    const roles = await this.roleRepository.find({
      where: {
        id: In([1])
      }
    });
    const role = roles[0];

    const user = this.userRepository.create({
      fio: data.fio,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: role
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      relations: {
        role: true
      },
      where: { email },
    });

    return user;
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: number) {
    const users = await this.userRepository.find({
      where: { id: In[id] },
      relations: { role: true }
    })
    return users[0];
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async removeUser(id: number) {
    await this.userRepository.delete(id);
  }

  async incrementTokenVersion(userId: number) {
    const user = await this.findById(userId);
    if (user) {
      user.tokenVersion++;
      return this.userRepository.save(user);
    }
  }

  // Добавление изображения
  async updateImage(id: number, file: Express.Multer.File) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // удаляем старый файл
    if (user.img_path) {
      this.storageService.deleteFile(user.img_path);
    }

    // сохраняем новый файл
    const newPath = this.storageService.saveFile(file);

    user.img_path = newPath;
    return this.userRepository.save(user);
  }
}
