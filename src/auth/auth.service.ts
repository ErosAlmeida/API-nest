import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  Login(loginDto: LoginDto) {
    console.log(loginDto instanceof LoginDto, loginDto);
    return loginDto;
  }
}
