import { Injectable } from '@nestjs/common';
import { auth } from '../lib/auth';

@Injectable()
export class AuthService {
  getAuth() {
    return auth;
  }
}
