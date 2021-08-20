import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Elves' },
    { id: 1, name: 'Brito' },
    { id: 2, name: 'Damasceno' },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }

    return this.users;
  }

  findById(userId: number): User {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new NotFoundException('User not found!!!');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }
}
