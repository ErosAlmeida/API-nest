import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create.user.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import * as authenticatedRequest from 'src/auth/types/authenticated-request';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Req() req: authenticatedRequest.AuthenticatedRequest,
    @Param('id', CustomParseIntPipe) id: number,
  ) {
    console.log(req.user.id);
    console.log(req.user.email);

    return `olá do controller do user #${id}`;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, dto);
    return new UserResponseDto(user);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return new UserResponseDto(user);
  }
}
