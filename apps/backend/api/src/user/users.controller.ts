import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { auth } from '../lib/auth';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private async getSession(req: Request) {
    const session = await auth.api.getSession({
      headers: new Headers({
        cookie: req.headers.cookie ?? '',
        authorization: req.headers.authorization ?? '',
      }),
    });
    if (!session?.user) throw new UnauthorizedException();
    return session.user;
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const user = await this.getSession(req);
    return this.usersService.findById(user.id);
  }

  @Patch('me')
  async updateProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const user = await this.getSession(req);
    return this.usersService.updateProfile(user.id, dto);
  }
}
