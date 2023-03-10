import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../services';
import { AccessControlGuard } from '../common/auth';

@UseGuards(AccessControlGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/current')
  async getUser(@Req() req): Promise<any> {
    const data = await this.userService.getUserById(req.user.userId);
    return { data };
  }
}
