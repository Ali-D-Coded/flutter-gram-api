/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminLoginDto, LoginUserDto, UserSignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   *
   * Customer Authentication with OTP ------------------------------------
   */

  // async signUpCustomer(dto: AuthDto) {
  //   // generate the password hash
  //   // const pass = await argon.hash(dto.password);
  //   // save the new user in the db
  //   console.log(dto);

  //   try {
  //     const user =
  //       await this.prisma.customerAuth.create({
  //         data: {
  //           username: dto.name,
  //           phone: dto.mob_no,
  //           // password: pass,
  //           email: dto.email,
  //           customer: {
  //             create: {
  //               name: dto.name,
  //               phone: dto.mob_no,
  //               email: dto.email,
  //               dob: dto.dob,
  //               city: dto.city,
  //               additional_health_issues:
  //                 dto.additional_health_issues,
  //               gender: dto.gender,
  //             },
  //           },
  //         },
  //         select: {
  //           username: true,
  //           phone: true,
  //           email: true,
  //           blocked: true,
  //           role: true,
  //           verified: true,
  //           createdAt: true,
  //           updatedAt: true,
  //         },
  //       });

  //     return {
  //       user,
  //     };
  //   } catch (error) {
  //     if (
  //       error instanceof
  //       PrismaClientKnownRequestError
  //     ) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException(
  //           'Credentials taken',
  //         );
  //       }
  //     }
  //   }
  // }

  // async signInCustomer(dto: LoginCustomerDto) {
  //   const APIKEY = this.config.get('2FA_API_KEY');
  //   console.log({
  //     APIKEY,
  //     dto,
  //   });

  //   const user =
  //     await this.prisma.customerAuth.findUnique({
  //       where: {
  //         phone: dto.mob_no,
  //       },
  //     });
  //   console.log(user);

  //   if (!user) {
  //     throw new ForbiddenException(
  //       'Credentials incorrect',
  //     );
  //   }

  //   try {
  //     if (user.phone == '9638527410') {
  //       await this.prisma.customerAuth.update({
  //         where: {
  //           id: user.id,
  //         },
  //         data: {
  //           verified: true,
  //         },
  //       });
  //       const tokens = await this.signInWithJwt(
  //         user.id,
  //         user.phone,
  //         user.email,
  //       );
  //       await this.updateCustomerRT(
  //         user.id,
  //         tokens.refresh_token,
  //       );

  //       return {
  //         tokens,
  //       };
  //     } else {
  //       const verify = await axios.post(
  //         `https://2factor.in/API/V1/${APIKEY}/SMS/VERIFY/${dto.session_id}/${dto.otp}`,
  //       );

  //       if (verify.status == 200) {
  //         await this.prisma.customerAuth.update({
  //           where: {
  //             id: user.id,
  //           },
  //           data: {
  //             verified: true,
  //           },
  //         });

  //         const tokens = await this.signInWithJwt(
  //           user.id,
  //           user.phone,
  //           user.email,
  //         );
  //         await this.updateCustomerRT(
  //           user.id,
  //           tokens.refresh_token,
  //         );

  //         return {
  //           tokens,
  //         };
  //       }
  //     }
  //   } catch (error) {
  //     return error;
  //   }

  //   // const pwMatches = await argon.verify(
  //   //   user.password,
  //   //   dto.password,
  //   // );
  //   // if (!pwMatches) {
  //   //   throw new ForbiddenException(
  //   //     'Credentials incorrect',
  //   //   );
  //   // }
  // }

  // async logoutCustomer(userId: number) {
  //   await this.prisma.customerAuth.updateMany({
  //     where: {
  //       id: userId,
  //       refreshToken: {
  //         not: null,
  //       },
  //     },
  //     data: {
  //       refreshToken: null,
  //     },
  //   });
  // }

  // async refreshCustomerToken(
  //   userId: number,
  //   rt: string,
  // ) {
  //   const user =
  //     await this.prisma.customerAuth.findUnique({
  //       where: {
  //         id: userId,
  //       },
  //     });
  //   if (!user || !user.refreshToken)
  //     throw new ForbiddenException(
  //       'Access Denied',
  //     );

  //   const rtMatches = await argon.verify(
  //     user.refreshToken,
  //     rt,
  //   );

  //   if (!rtMatches)
  //     throw new ForbiddenException(
  //       'Access Denied',
  //     );

  //   const tokens = await this.signInWithJwt(
  //     user.id,
  //     user.phone,
  //     user.email,
  //   );
  //   await this.updateCustomerRT(
  //     user.id,
  //     tokens.refresh_token,
  //   );

  //   return tokens;
  // }

  // async sendOtp(data: any) {
  //   const APIKEY = this.config.get('2FA_API_KEY');
  //   console.log({
  //     data,
  //     APIKEY,
  //   });

  //   const user =
  //     await this.prisma.customerAuth.findUnique({
  //       where: {
  //         phone: data.number,
  //       },
  //     });
  //   console.log(user);

  //   if (!user) {
  //     throw new HttpException(
  //       'Number Not Registered',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   if (user) {
  //     const res = await axios.post(
  //       `https://2factor.in/API/V1/${APIKEY}/SMS/+91${data.number}/AUTOGEN`,
  //     );
  //     console.log(res.data);

  //     return res.data;
  //   }
  // }

  // async updateCustomerRT(
  //   userId: number,
  //   rt: string,
  // ) {
  //   const hash = await argon.hash(rt);
  //   await this.prisma.customerAuth.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       refreshToken: hash,
  //     },
  //   });
  // }

  //-----------------------------------------------------------

  //Admin Authentication ---------------------------------------

  // async adminLogin(dto: AdminLoginDto) {
  //   console.log(dto);

  //   // try {
  //   const user = await this.prisma.admin.findUnique({
  //     where: {
  //       username: dto.username,
  //     },
  //     select: {
  //       id: true,
  //       email: true,
  //       role: true,
  //       username: true,
  //       password: true,
  //     },
  //   });

  //   if (!user) {
  //     throw new HttpException('Credentials Incorrect', HttpStatus.NOT_FOUND);
  //   }

  //   const matchPass = await argon.verify(user.password, dto.password);
  //   if (!matchPass) {
  //     throw new HttpException('Credentials Incorrect', HttpStatus.NOT_FOUND);
  //   }

  //   const tokens = await this.signInWithJwt(user.id, '', user.email);

  //   return {
  //     tokens,
  //     user,
  //   };

  //   // } catch (error) {
  //   // return error
  //   // }
  // }

  async UserSignup(dto: UserSignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hash,
          firstName: dto.firstName || undefined,
          lastName: dto.lastName || undefined,
        },
      });
      delete user.password;
      const tokens = await this.signInWithJwt(
        user.id,
        user.username,
        user.email,
      );

      return { user, tokens };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async userLogin(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new HttpException('Credentials Incorrect', HttpStatus.NOT_FOUND);
    }

    if (user.blocked) {
      throw new ForbiddenException(
        'Seems like you are blocked at the moment 😕',
      );
    }

    const matchPass = await argon.verify(user.password, dto.password);
    if (!matchPass) {
      throw new HttpException('Credentials Incorrect', HttpStatus.NOT_FOUND);
    }

    const tokens = await this.signInWithJwt(user.id, user.username, user.email);

    delete user.password;
    return {
      tokens,
      user,
    };
  }

  //--------------------------------------------------------------

  /**
   *
   * @param userId
   * @param mob_no
   * @param email
   * @returns refresh and access tokens
   */
  async signInWithJwt(
    userId: string,
    username: string,
    email: string,
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      username: username,
      email: email,
    };
    const secretAt = this.config.get('AT_SECRET');
    const secretRt = this.config.get('RT_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: payload.email ? 60 * 60 * 24 : 60 * 60 * 24 * 180, // 1 day
        secret: secretAt, // this is the secret that we will use to sign the token
      }),
      this.jwt.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7, // 1 day
        secret: secretRt, // this is the secret that we will use to sign the token
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
