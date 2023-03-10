import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthenticateRequest, RegisterRequest } from '../request-models';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async authenticate(@Body() data: AuthenticateRequest): Promise<any> {
    return await this.authService.authenticate(data);
  }

  @Post('/register')
  async register(@Body() data: RegisterRequest): Promise<any> {
    return await this.authService.register(data);
  }
}
