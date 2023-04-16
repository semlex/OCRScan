// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Request } from 'express';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UsersService } from '../../users/users.service';
//
// @Injectable()
// export class RefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'refresh',
// ) {
//   constructor(private userService: UsersService) {
//     super({
//       ignoreExpiration: true,
//       passReqToCallback: true,
//       secretOrKey: process.env.JWT_REFRESH_SECRET,
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: Request) => {
//           const data = request?.cookies['refreshToken'];
//           if (!data) {
//             return null;
//           }
//           return data.token;
//         },
//       ]),
//     });
//   }
//
//   // validate()
// }
