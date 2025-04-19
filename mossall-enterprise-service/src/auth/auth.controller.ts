import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { Session } from './dto/session.type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
}
