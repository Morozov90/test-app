export * from './auth.service';
export * from './user.service';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

export const Services = [AuthService, UserService];
