import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  doLogin() {
    return 'Olá do AuthService';
  }
}
