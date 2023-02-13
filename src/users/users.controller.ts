import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/auth/decorator';
import { Response } from 'express';
import { of } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files' }], {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file?.originalname);
          const filename = `${file?.originalname.replace(
            '.png',
            '',
          )}${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    return this.usersService.update(id, updateUserDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Public()
  @Get('images/:imagename')
  findItemImage(@Param('imagename') image: string, @Res() res: Response) {
    return of(res.sendFile(join(process.cwd(), 'uploads/users/' + image)));
  }
}
