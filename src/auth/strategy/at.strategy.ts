/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

/* eslint-disable prettier/prettier */
@Injectable()
export class AtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('AT_SECRET'),
    });
  }

  // async validate(payload: {
  //   sub: number;
  //   email: string;
  // }) {
  //   const user =
  //     await this.prisma.user.findUnique({
  //       where: { id: payload.sub },
  //     });
  //   return user;
  // }
   validate(payload: any) {
    return payload;
  }
}
