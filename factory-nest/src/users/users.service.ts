import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { validate } from 'class-validator';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = plainToClass(Users, createUserDto);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const existingUser = await this.usersRepository.findOne({where: {email: createUserDto.email}});
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const savedUser = await this.usersRepository.save(user);

    await this.elasticsearchService.index({
      index: 'users',
      body: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });

    return savedUser;
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = plainToClass(Users, updateUserDto);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });

    await this.elasticsearchService.update({
      index: 'users',
      id: updatedUser.id.toString(),
      body: {
        doc: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      },
    });

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);

    await this.elasticsearchService.delete({
      index: 'users',
      id: id.toString(),
    });
  }

  async search(query: string): Promise<Users[]> {
    const { body } = await this.elasticsearchService.search({
      index: 'search-users',
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['name', 'email', 'role'],
          },
        },
      },
    }) as any;

    const users = body.hits.hits.map((hit) => {
      const user = new Users();
      user.id = parseInt(hit._id);
      user.name = hit._source.name;
      user.email = hit._source.email;
      user.role = hit._source.role;
      return user;
    });

    return users;
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }
}

