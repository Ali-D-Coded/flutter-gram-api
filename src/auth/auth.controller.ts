/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser, Public } from './decorator';
import { AdminLoginDto, UserSignupDto, LoginUserDto } from './dto';
import { RtGuard } from './guard';
import { ConfigService } from '@nestjs/config';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  // @Public()
  // @HttpCode(HttpStatus.CREATED)
  // @Post('local/customer/signup')
  // signUp(@Body() dto: AuthDto) {
  //   return this.authService.signUpCustomer(dto);
  // }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('local/customer/signin')
  // signIn(@Body() dto: LoginCustomerDto) {
  //   return this.authService.signInCustomer(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('customer/logout')
  // logout(@GetUser('sub') userId: number) {
  //   return this.authService.logoutCustomer(
  //     userId,
  //   );
  // }

  // @HttpCode(HttpStatus.OK)
  // @Public()
  // @Post('sendOtp')
  // async sendOtp(@Body() number: OTPDto) {
  //   return this.authService.sendOtp(number);
  // }

  // @Public()
  // @UseGuards(RtGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('customer/refresh')
  // refreshToken(
  //   @GetUser('sub') userId: number,
  //   @GetUser('refreshToken') rt: string,
  // ) {
  //   return this.authService.refreshCustomerToken(
  //     userId,
  //     rt,
  //   );
  // }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('local/admin/login')
  // adminLogin(@Body() dto: AdminLoginDto) {
  //   console.log(dto);

  //   return this.authService.adminLogin(dto);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/user/sign-up')
  UserSignup(@Body() dto: UserSignupDto) {
    console.log(dto);

    return this.authService.UserSignup(dto);
  }

  @Public()
  @Post('local/user/login')
  userLogin(@Body() dto: LoginUserDto) {
    return this.authService.userLogin(dto);
  }
}
