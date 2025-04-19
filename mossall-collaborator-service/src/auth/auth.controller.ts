import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Get('admin-token')
    // adminToken(): Promise<any> {
    //     return this.authService.getAdminToken();
    // }
}
