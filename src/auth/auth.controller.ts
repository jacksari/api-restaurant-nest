import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp( @Body() signUpDto: SignUpDto ): Promise<User> {
        return this.authService.signup(signUpDto);
    }

    @Post('/login')
    login( @Body() loginDto: LoginDto ): Promise<{token: string}> {
        const token = this.authService.login(loginDto);
        return token;
    }
}
