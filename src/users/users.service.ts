import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        include: {
          profile_pic: {
            select: {
              url: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    files: { files?: Express.Multer.File[] },
  ) {
    const data = {
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      profile_pic: {
        create: {
          name: '',
          url: '',
        },
      },
    };

    if (files.files) {
      data.profile_pic.create = {
        name: files.files[0].originalname,
        url: files.files[0].filename,
      };
    } else {
      delete data.profile_pic;
    }
    // return data;

    try {
      const res = await this.prisma.user.update({
        where: {
          id: id,
        },
        data,
      });
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
